const body = document.getElementsByTagName('body')[0];
body.addEventListener('click', async (e) => {
  if (e.target.classList.contains('btnforevent')) {
    if (!e.target.classList.contains('press-event-button')) {
      const { userid } = e.target.dataset;
      const { eventid } = e.target.dataset;
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
