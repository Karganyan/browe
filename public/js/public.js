const buttons = document.querySelectorAll('.btnforevent');

// for (let i = 0; i < buttons.length; i++) {
//   const { eventid, userevents } = buttons[i].dataset;
//   if (userevents.includes(eventid)) {
//     buttons[i].innerText = 'Вы записаны!';
//   }
// }

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btnforevent')) {
    const { eventid, userid } = e.target.dataset;
    // if (e.target.innerText === 'Вы записаны!') {
    //   await fetch('/events/signup', {
    //     method: 'DELETE',
    //     headers: { 'Content-type': 'application/json' },
    //     body: JSON.stringify({ userid, eventid }),
    //   });
    // }
    if (!e.target.classList.contains('press-event-button')) {
      await fetch('/events/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, eventid }),
      });
      e.target.classList.add('press-event-button');
      window.location.replace('/private');
    } else {
      e.target.classList.remove('press-event-button');
    }
  }
});

const container = document.getElementById('container');
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

private.addEventListener('click', async (e) => {
  e.preventDefault()
  if (e.target.dataset.editprofile) {
    e.preventDefault()
    const req = await fetch('/private/editProfile')
    const res = await req.text()
    container.innerHTML = res
  }
})




// (function() {
//   const burger = document.querySelector('.burger');
//   const menu = document.querySelector('#'+burger.dataset.target);
//   burger.addEventListener('click', function() {
//       burger.classList.toggle('is-active');
//       menu.classList.toggle('is-active');
//   });
// })();
