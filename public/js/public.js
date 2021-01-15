const body = document.getElementsByTagName('body')[0];
console.log(body);
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

(function() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
  });
})();
