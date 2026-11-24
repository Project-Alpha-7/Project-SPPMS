import { initLayout, $, param, ADMIN_SESSION } from '../layout.js';

initLayout();

// DEMO ONLY: replaced by Supabase Auth with role checks in development Stage 4.
const DEMO = { email: 'admin@printflow.example', password: 'demo1234' };

const next = param('next');
const safeNext = next && next.startsWith('/admin/') ? next : '/admin/dashboard.html';
if (sessionStorage.getItem(ADMIN_SESSION)) location.replace(safeNext);

$('#show').addEventListener('click', () => {
  const pw = $('#password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
  $('#show .material-symbols-outlined').textContent = pw.type === 'password' ? 'visibility' : 'visibility_off';
});
$('#fill').addEventListener('click', () => { $('#email').value = DEMO.email; $('#password').value = DEMO.password; });
$('#login').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#email').value.trim().toLowerCase();
  if (email !== DEMO.email || $('#password').value !== DEMO.password) {
    $('#err').textContent = 'Incorrect email or password.';
    $('#err').classList.remove('hidden');
    $('#password').setAttribute('aria-invalid', 'true');
    return;
  }
  sessionStorage.setItem(ADMIN_SESSION, 'Admin');
  location.replace(safeNext);
});
