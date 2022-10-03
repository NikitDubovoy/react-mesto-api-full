export const BASE_URL = "https://api.mesto-frontend.nomore.nomoredomains.icu";
//export const BASE_URL = "http://localhost:3001";

function getResponseData(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject("Error");
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.status === 200) {
      localStorage.setItem("user", response);
      return getResponseData(response);
    }
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })   
    .then((data) => {
    if (data) {
      return data;
    }
    })
    .then((response) => {
      return getResponseData(response);
    })
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return getResponseData(res);
    })
};
