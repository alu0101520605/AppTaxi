const driverToggle = document.getElementById('driverToggle');
const toggleLabel  = document.getElementById('toggle-label');

if (driverToggle && toggleLabel) {
  driverToggle.addEventListener('change', () => {
    const isActive = driverToggle.checked;
    toggleLabel.textContent  = isActive ? 'Activo' : 'Inactivo';
    toggleLabel.style.color  = isActive ? 'var(--nt-success)' : 'var(--nt-muted)';
  });
}
