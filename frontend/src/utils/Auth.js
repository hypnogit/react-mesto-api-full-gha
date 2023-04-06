const baseUrl = "https://api.hypnogit.nomoredomains.monster";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    credentials: 'include',
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    credentials: 'include',
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const checkTokenValidity = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    credentials: 'include',
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
