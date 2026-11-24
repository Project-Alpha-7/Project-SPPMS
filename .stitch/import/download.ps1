$ErrorActionPreference = 'Stop'
$projectId = '15747305669043123223'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$screensDir = Join-Path $root 'screens'
$shotsDir = Join-Path $root 'screenshots'
New-Item -ItemType Directory -Force -Path $screensDir, $shotsDir | Out-Null

$raw = (stitch status --token 2>$null | Out-String)
if ($raw -match '"accessToken"\s*:\s*"([^"]+)"') {
  $tok = $Matches[1]
} else {
  throw 'No access token'
}

$screens = @(
  @{ id = '234dd24710e744b9bec101c3b24c35d4'; title = 'Production Workflow & Digital Job Cards'; device = 'desktop' },
  @{ id = '3ede905bea8e490b928ca5c5aa7162a6'; title = 'Admin Dashboard Overview'; device = 'desktop' },
  @{ id = '85557f3c3a8047b4a8d7c10b411e3688'; title = 'Print Specification, Preflight & Order Tracking'; device = 'desktop' },
  @{ id = '5e37d6968c6e4e32b23f54867aafdbc7'; title = 'PrintFlow Mobile - Home'; device = 'mobile' },
  @{ id = 'b2004b8606d046a8bc77207cd11f1f31'; title = 'PrintFlow Mobile - Product Catalogue'; device = 'mobile' },
  @{ id = 'ea0182a6137c43b3862ac2610443ff2b'; title = 'PrintFlow Mobile - Product Configurator'; device = 'mobile' }
)

function Get-Bytes([string]$url) {
  $tmp = [System.IO.Path]::GetTempFileName()
  $code = curl.exe -sL -o $tmp -w '%{http_code}' -H "Authorization: Bearer $tok" $url
  $bytes = [System.IO.File]::ReadAllBytes($tmp)
  Remove-Item $tmp -Force
  return @{ code = $code; bytes = $bytes }
}

function Save-Unwrapped([string]$url, [string]$outPath, [bool]$binaryOk) {
  $r = Get-Bytes $url
  if ($r.code -ne '200') { Write-Warning "FAIL $($r.code) $url"; return $false }
  $text = [System.Text.Encoding]::UTF8.GetString($r.bytes)
  if ($text.StartsWith('{')) {
    try {
      $j = $text | ConvertFrom-Json
      if ($j.dataString) {
        [System.IO.File]::WriteAllText($outPath, $j.dataString, [System.Text.UTF8Encoding]::new($false))
        return $true
      }
      if ($j.data) {
        $b64 = ($j.data -replace '\s', '')
        [System.IO.File]::WriteAllBytes($outPath, [Convert]::FromBase64String($b64))
        return $true
      }
    } catch { }
  }
  if ($binaryOk) {
    [System.IO.File]::WriteAllBytes($outPath, $r.bytes)
    return $true
  }
  [System.IO.File]::WriteAllText($outPath, $text, [System.Text.UTF8Encoding]::new($false))
  return $true
}

$report = @()
foreach ($s in $screens) {
  $metaJson = stitch get screen $s.id --project $projectId --json 2>&1 | Out-String
  $start = $metaJson.IndexOf('{')
  if ($start -lt 0) { Write-Warning "No JSON for $($s.id)"; continue }
  $meta = ($metaJson.Substring($start) | ConvertFrom-Json).data
  $htmlOut = Join-Path $screensDir ($s.device + '-' + ($s.title -replace '[^A-Za-z0-9]+', '-').ToLower() + '.html')
  $shotOut = Join-Path $shotsDir ($s.device + '-' + ($s.title -replace '[^A-Za-z0-9]+', '-').ToLower() + '.png')

  $okH = Save-Unwrapped $meta.htmlCode.downloadUrl $htmlOut $false
  $okS = Save-Unwrapped $meta.screenshot.downloadUrl $shotOut $true

  $hLen = if (Test-Path $htmlOut) { (Get-Item $htmlOut).Length } else { 0 }
  $sLen = if (Test-Path $shotOut) { (Get-Item $shotOut).Length } else { 0 }
  $report += "$($s.id) | $($s.title) | html=$okH ($hLen B) | shot=$okS ($sLen B)"
}
$report | ForEach-Object { Write-Output $_ }
