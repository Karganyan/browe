function failSignup(signupForm) {
  signupForm.login.setCustomValidity('Вероятно, что вы уже зарегистрированы.');
  signupForm.login.reportValidity();
}

document.forms.signupForm?.addEventListener('submit', async (event) => {
  const { method, action } = event.target;
  let response;
  try {
    event.preventDefault();
    console.log(event.target.name.value,
      event.target.login.value,
      event.target.phoneNumber.value,
      event.target.email.value,
      event.target.password.value,
    );
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        login: event.target.login.value,
        phoneNumber: event.target.phoneNumber.value,
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });
  } catch (err) {
    return failSignup(event.target);
  }
  if (response.status !== 200) {
    return failSignup(event.target);
  }
  return window.location.assign('/coffee');
});

// Очищаем кастомные сообщения об ошибках при новом вводе
// if (document.forms.signupForm) {
//   [
//     document.forms.signupForm.login,
//     document.forms.signupForm.name,
//     document.forms.signupForm.phoneNumber,
//     document.forms.signupForm.email,
//     document.forms.signupForm.password,
//   ].forEach((input) => input.addEventListener('input', (event) => {
//     event.target.setCustomValidity('');
//     event.target.checkValidity();
//   }));
// }
