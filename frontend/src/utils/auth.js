export const BASE_URL = 'https://api.mesto.yuwarika.nomoredomains.xyz';

const getResponseData = function(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
  .then(response => {
    return getResponseData(response);
  })      
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
  .then(response => {
    return getResponseData(response);
  })
}

export const getLoggedUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  }) 
  .then(response => {
    return getResponseData(response);
  })
}