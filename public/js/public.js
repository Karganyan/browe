const knopka = document.querySelectorAll('.btnforevent');

for (let i = 0; i < knopka.length; i++) {
  const { eventid, userevents } = knopka[i].dataset;
  if (userevents) {
    if (userevents.includes(eventid)) {
      knopka[i].innerText = 'Вы записаны!';
    }
  }
}

const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', async (e) => {
  const { eventid, userid } = e.target.dataset;
  if (userid) {
    if (e.target.classList.contains('btnforevent')) {
      if (e.target.innerText === 'Вы записаны!') {
        const deleteEventFetch = await fetch('/events/singout', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            userid,
            eventid,
          }),
        });
        const res = await deleteEventFetch.text();
        if (res === 'deleted') {
          e.target.innerText = 'Записаться на мероприятие';
        }
      } else {
        e.target.innerText = 'Вы записаны!';
        const postEventFetch = await fetch('/events/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            userid,
            eventid,
          }),
        });
        const res = await postEventFetch.text();
        if (res === 'OK') {
          e.target.innerText = 'Вы записаны!';
        }
      }
    }
  } else {
    window.location.replace('/auth/signin');
  }
});

const container = document.getElementById('container');
container.addEventListener('click', async (e) => {
  if (e.target.dataset.deletecoffee) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      e.target.closest('div.coffeecard').remove();
    }
  }
  if (e.target.dataset.deletebake) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      e.target.closest('div.bakerycard').remove();
    }
  }
  if (e.target.dataset.deleteevent) {
    e.preventDefault();
    const url = e.target.href;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      e.target.closest('div.eventcard').remove();
    }
  }
});
const privateEvent = document.querySelector('.privateEvent');

if (privateEvent) {
  privateEvent.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.dataset.editprofile) {
      e.preventDefault();
      const req = await fetch('/private/editProfile');
      const res = await req.text();
      container.innerHTML = res;
    }
  });
}

function burger() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
}
burger();
