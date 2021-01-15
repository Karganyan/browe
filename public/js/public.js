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
