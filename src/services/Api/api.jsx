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

export function getIngredientsFromServer() {
  return fetch(`${config.baseUrl}/ingredients`).then((res) =>
    checkResponse(res)
  );
}

export function sendOrderToServer(newObj) {
  return fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newObj),
  }).then((res) => checkResponse(res));
}
