const body = document.getElementsByTagName('body')[0];
console.log(locals.user);
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
      console.log(locals);
      window.location.replace('/private');
    }
  }
});
