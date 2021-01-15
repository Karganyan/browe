function failSignin(signinForm) {
  signinForm.login.setCustomValidity('Неверные имя пользователя и/или пароль.');
  signinForm.login.reportValidity();
  setTimeout(() => {
    signinForm.login.setCustomValidity('');
  }, 3000);
}

document.forms.signinForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('This is signinForm');
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: event.target.login.value,
        password: event.target.password.value,
      }),
    });
  } catch (err) {
    return failSignin(event.target);
  }
  if (response.status !== 200) {
    console.log('Response from server 200');
    return failSignin(event.target);
  }
  return window.location.assign('/coffee');
});
