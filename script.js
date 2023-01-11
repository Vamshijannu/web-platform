const steps = document.querySelectorAll('.step');
const containerEl = document.querySelector('body');

for (let i = 0; i < steps.length; i++) {
  steps[i].onclick = () => {
    let cls = `step${steps[i].dataset.number}`;
    containerEl.classList.add(cls);
  };
}
clickAndSelect();

function clickAndSelect() {
  let cards = Array.from(document.querySelectorAll('.card')),
    elements = [];

  cards.forEach((card) => {
    elements = elements.concat(Array.from(card.children));
  });

  elements.forEach((element) => {
    element.addEventListener('click', (e) => e.preventDefault());

    element.addEventListener('mousedown', (e) => {
      let card = e.target.closest('.card');
      card.setAttribute('data-md', Date.now());
    });

    element.addEventListener('mouseup', (e) => {
      e.stopPropagation();

      let card = e.target.classList.contains('card')
          ? e.target
          : e.target.closest('.card'),
        then = card.getAttribute('data-md'),
        now = Date.now();
      if (now - then < 200) {
        window.location = card.querySelector('a').href;
        card.classList.add('visited');
        console.log(card.querySelector('a').href);
      }
      card.removeAttribute('data-md');
    });
  });
}
