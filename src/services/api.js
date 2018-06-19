const URL = '/api';
const ADVICE_URL = `${URL}/advice`;
const RESOURCES_URL = `${URL}/resources`;
const WORKSPACES_URL = `${URL}/workspaces`;
const HUMOR_URL = `${URL}/humor`;
const AUTH_URL = `${URL}/auth`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => {
    throw err.message;
  });
}

function getHeaders(hasBody) {
  const headers = {};
  if(hasBody) {
    headers['Content-Type'] = 'application/json';
  }

  const user = localStorage.user;
  if(user) {
    try {
      headers['Authorization'] = JSON.parse(user).id;
    }
    catch (err) {
      localStorage.removeItem('user');
    }
  }

  return headers;
}

export function getAdvice() {
  return fetch(ADVICE_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

export function getResources() {
  return fetch(RESOURCES_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

export function getWorkspaces() {
  return fetch(WORKSPACES_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

export function getHumor() {
  return fetch(HUMOR_URL, {
    headers: getHeaders(true)
  })
    .then(responseHandler);
}

export function signUp(credentials) {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}

export function signIn(credentials) {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: getHeaders(true),
    body: JSON.stringify(credentials)
  })
    .then(responseHandler);
}

