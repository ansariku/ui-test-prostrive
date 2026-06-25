// This is the cursor glow effect
const glow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// This is the custom dropdown
const selects = document.querySelectorAll('.custom-select');

function closeAll(except) {
  selects.forEach(s => {
    if (s !== except) {
      s.classList.remove('open');
      s.querySelector('.custom-select-trigger').setAttribute('aria-expanded', 'false');
    }
  });
}

selects.forEach(select => {
  const trigger = select.querySelector('.custom-select-trigger');
  const options = select.querySelectorAll('.custom-select-option');
  const label = select.querySelector('.select-label');
  const placeholder = select.dataset.placeholder;

  // Open & close toggle
  trigger.addEventListener('click', () => {
    const isOpen = select.classList.contains('open');
    closeAll(select);
    select.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Option Selection
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      label.textContent = opt.textContent;
      trigger.classList.add('has-value');
      select.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.custom-select')) closeAll(null);
});