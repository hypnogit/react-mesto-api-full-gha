const baseUrl = "https://api.hypnogit.nomoredomains.monster";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const checkTokenValidity = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then(checkResponse);
};
