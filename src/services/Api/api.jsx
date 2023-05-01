export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: { "Content-Type": "application/json" },
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} - error`);
}

export const getIngredientsFromServer = () => request(`ingredients`);

export const sendOrderToServer = (newObj) =>
  request(`orders`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newObj),
  });

function request(endpoint, options) {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then(checkResponse);
}
