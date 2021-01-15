const buttons = document.querySelectorAll('.btnforevent');

for (let i = 0; i < buttons.length; i++) {
  const { eventid, userevents } = buttons[i].dataset;
  if (userevents.includes(eventid)) {
    buttons[i].innerText = 'Вы записаны!';
  }
}

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btnforevent')) {
    const { eventid, userid } = e.target.dataset;
    if (e.target.innerText === 'Вы записаны!') {
      e.target.innerText = 'Вы записаны!';
      await fetch('/events/singout', {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, eventid }),
      });
    } else {
      await fetch('/events/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, eventid }),
      });
    }
  }
});

const container = document.querySelector('.container');
container.addEventListener('click', async (e) => {
  if (e.target.dataset.deletecoffee) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.status === 200) {
      e.target.closest('div.coffeecard').remove();
    }
  }
  if (e.target.dataset.deletebake) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.status === 200) {
      e.target.closest('div.bakerycard').remove();
    }
  }
  if (e.target.dataset.deleteevent) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, { method: 'DELETE' });
    if (response.status === 200) {
      e.target.closest('div.eventcard').remove();
    }
  }
});
const private = document.querySelector('.privateEvent')

// private.addEventListener('click', (e) => {
//   if ()
// })
(function() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
  });
})();
