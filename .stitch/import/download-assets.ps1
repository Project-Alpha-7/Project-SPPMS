$ErrorActionPreference = 'Stop'
$root = (Get-Location).Path
$imgDir = Join-Path $root 'public\images'
New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

$files = Get-ChildItem (Join-Path $root 'public\screens') -Recurse -Filter *.html
$urlSet = [System.Collections.Generic.HashSet[string]]::new()
foreach ($f in $files) {
  $c = [System.IO.File]::ReadAllText($f.FullName)
  foreach ($m in [regex]::Matches($c, '<img[^>]+src="(https?://[^"]+)"')) { [void]$urlSet.Add($m.Groups[1].Value) }
  foreach ($m in [regex]::Matches($c, 'url\((https?://[^)''"]+)\)')) { [void]$urlSet.Add($m.Groups[1].Value) }
}
$urls = @($urlSet)
Write-Output "UNIQUE_URLS=$($urls.Count)"

$tok = $null
$raw = (stitch status --token 2>$null | Out-String)
if ($raw -match '"accessToken"\s*:\s*"([^"]+)"') { $tok = $Matches[1] }

$extMap = @{ 'image/png' = 'png'; 'image/jpeg' = 'jpg'; 'image/webp' = 'webp'; 'image/gif' = 'gif'; 'image/svg+xml' = 'svg' }
$manifest = [ordered]@{}
$i = 0
foreach ($url in $urls) {
  $i++
  $name = 'stitch-asset-{0:D2}' -f $i
  $tmp = [System.IO.Path]::GetTempFileName()
  $headers = @()
  if ($tok) { $headers = @('-H', "Authorization: Bearer $tok") }
  $ctype = $null
  foreach ($attempt in 1..4) {
    $out = curl.exe -sL -o $tmp -w "%{http_code}|%{content_type}" @headers $url
    $parts = $out -split '\|', 2
    $code = $parts[0]; $ctype = $parts[1]
    if ($code -eq '200') { break }
    Start-Sleep -Seconds 2
  }
  if ($code -ne '200') {
    Write-Warning "DOWNLOAD_FAILED $code $url"
    Remove-Item $tmp -Force
    continue
  }
  $ext = 'bin'
  foreach ($k in $extMap.Keys) { if ($ctype -like "$k*") { $ext = $extMap[$k]; break } }
  if ($ext -eq 'bin') {
    $bytes = [System.IO.File]::ReadAllBytes($tmp)
    if ($bytes.Length -ge 8 -and $bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50) { $ext = 'png' }
    elseif ($bytes.Length -ge 3 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { $ext = 'jpg' }
    elseif ($bytes.Length -ge 12 -and [System.Text.Encoding]::ASCII.GetString($bytes, 0, 4) -eq 'RIFF') { $ext = 'webp' }
  }
  $final = "$name.$ext"
  Move-Item -Force $tmp (Join-Path $imgDir $final)
  $manifest[$url] = "/images/$final"
  Write-Output "SAVED $final ($((Get-Item (Join-Path $imgDir $final)).Length) B) <= $url"
}

foreach ($f in $files) {
  $c = [System.IO.File]::ReadAllText($f.FullName)
  $orig = $c
  foreach ($url in $manifest.Keys) {
    $c = $c.Replace($url, $manifest[$url])
  }
  if ($c -ne $orig) {
    [System.IO.File]::WriteAllText($f.FullName, $c, [System.Text.UTF8Encoding]::new($false))
    Write-Output "REWRITTEN $($f.Name)"
  }
}
$json = $manifest | ConvertTo-Json
[System.IO.File]::WriteAllText((Join-Path $imgDir 'manifest.json'), $json, [System.Text.UTF8Encoding]::new($false))
Write-Output "MANIFEST=$($manifest.Count) entries"
