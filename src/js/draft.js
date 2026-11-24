// The in-progress order, kept in sessionStorage across the order steps.
const KEY = 'pf-draft';
export function getDraft() { try { return JSON.parse(sessionStorage.getItem(KEY)) ?? null; } catch { return null; } }
export function saveDraft(d) { sessionStorage.setItem(KEY, JSON.stringify(d)); return d; }
export function clearDraft() { sessionStorage.removeItem(KEY); }

// Remembers orders placed from this browser so "My orders" can list them (no customer accounts yet).
const MINE = 'pf-my-orders';
export function myOrderNumbers() { try { return JSON.parse(localStorage.getItem(MINE)) ?? []; } catch { return []; } }
export function rememberOrder(n) { const s = new Set(myOrderNumbers()); s.add(n); localStorage.setItem(MINE, JSON.stringify([...s])); }
