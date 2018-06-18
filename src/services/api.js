const URL = '/api';
const ADVICE_URL = `${URL}/advice`;

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

