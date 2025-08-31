const form = document.getElementById('travel-form');

function attachPersistence(input) {
  const saved = localStorage.getItem(input.id);
  if (saved) input.value = saved;
  input.addEventListener('input', () => {
    localStorage.setItem(input.id, input.value);
  });
}

function addModule(type) {
  const container = document.getElementById(`${type}-container`);
  const template = document.getElementById(`${type}-template`);
  const index = container.childElementCount + 1;
  const clone = template.content.cloneNode(true);
  clone.querySelectorAll('input').forEach(input => {
    const baseId = input.id;
    const newId = `${baseId}-${index}`;
    const label = clone.querySelector(`label[for="${baseId}"]`);
    if (label) label.setAttribute('for', newId);
    input.id = newId;
    attachPersistence(input);
  });
  container.appendChild(clone);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#travel-form input').forEach(attachPersistence);
  ['taxi', 'walk', 'train', 'subway', 'plane'].forEach(addModule);
});
