function failSignup(signupForm) {
  signupForm.name.setCustomValidity('Проверьте введенные данные');
  signupForm.name.reportValidity();
  setTimeout(() => {
    signupForm.name.setCustomValidity('');
  }, 3000);
}

function failSignupLogin(signupForm) {
  signupForm.login.setCustomValidity('Логин уже занят');
  signupForm.login.reportValidity();
  setTimeout(() => {
    signupForm.login.setCustomValidity('');
  }, 3000);
}

function failSignupEmail(signupForm) {
  signupForm.email.setCustomValidity('Email уже используется');
  signupForm.email.reportValidity();
  setTimeout(() => {
    signupForm.email.setCustomValidity('');
  }, 3000);
}

function failSignupPhone(signupForm) {
  signupForm.phoneNumber.setCustomValidity('Этот номер уже используется');
  signupForm.phoneNumber.reportValidity();
  setTimeout(() => {
    signupForm.phoneNumber.setCustomValidity('');
  }, 3000);
}

document.forms.signupForm?.addEventListener('submit', async (event) => {
  const { method, action } = event.target;
  let response;
  try {
    event.preventDefault();
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
  if (response.status === 401) {
    return failSignupLogin(event.target);
  }
  if (response.status === 403) {
    return failSignupPhone(event.target);
  }
  if (response.status === 402) {
    return failSignupEmail(event.target);
  }
  return window.location.assign('/coffee');
});
