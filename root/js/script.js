    const form = document.getElementById('travel-form');
    const fields = Array.from(form.elements).filter(el => el.tagName === 'INPUT');
    fields.forEach(field => {
      const saved = localStorage.getItem(field.id);
      if (saved) field.value = saved;
      field.addEventListener('input', () => {
        localStorage.setItem(field.id, field.value);
      });
    });
