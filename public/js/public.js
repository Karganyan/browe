const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btnforevent')) {
    if (e.target.classList.contains('press-event-button')) {
      const { userid } = e.target.dataset;
      const { eventid } = e.target.dataset;
      await fetch('/events/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ userid, eventid }),

      });
      e.target.classList.remove('press-event-button');
      e.target.classList.add('unpress-event-button');
    } else {
      e.target.classList.remove('unpress-event-button');
      e.target.classList.add('press-event-button');
      console.log('ghbdtn');
      window.location.replace('/private');
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
