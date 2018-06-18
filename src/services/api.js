const URL = '/api';
const ADVICE_URL = `${URL}/advice`;
const RESOURCES_URL = `${URL}/resources`;
const WORKSPACES_URL = `${URL}/workspaces`;
const HUMOR_URL = `${URL}/humor`;

function responseHandler(response) {
  if(response.ok) return response.json();
  return response.json().then(err => {
    throw err.message;
  });
}

export function getAdvice() {
  return fetch(ADVICE_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function getResources() {
  return fetch(RESOURCES_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function getWorkspaces() {
  return fetch(WORKSPACES_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

export function getHumor() {
  return fetch(HUMOR_URL, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(responseHandler);
}

