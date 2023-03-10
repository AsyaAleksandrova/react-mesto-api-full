

export const BASE_URL = 'https://api.asya.nomoredomains.rocks';

export const register = (password, email) => {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json" 
      },
      body: JSON.stringify({password, email})
   })
      .then((response) => {
         return response.json();
      })
};


export const authorize = (password, email) => {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
   })
      .then((response => response.json()))
      .then((data) => {
         if (data.token){
            return data;
         } 
      })
};

export const checkToken = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         "Content-Type": "application/json",
         "Authorization" : `Bearer ${token}`
      }
   })
      .then((response => response.json()))
      .then((data) => {
         if (data.email) {
            return data;
      }
   })
};