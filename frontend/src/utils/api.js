class Api {
  constructor(options) {
     this._url = options.baseUrl;
     this._pass = localStorage.getItem('jwt');
     this._headers = {
         authorization: this._pass,
     }
     this._headersJson = {
        authorization: this._pass,
         'Content-Type': 'application/json'
     }
  }

   _checkResponse(res) {
      if (res.ok) {    
         return res.json();
      }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   catchError(err) {
      console.log(err);
   }

   getUserInfo() {
      const setUrl = this._url + '/users/me'
      return fetch(setUrl, {
         method: 'GET',
         headers: this._headers
      })
      .then(this._checkResponse)
   }
   
   setUserInfo(name, description) {
      const setUrl = this._url + '/users/me'
      return fetch(setUrl, {
         method: 'PATCH',
         headers: this._headersJson,
         body: JSON.stringify({
            name: name,
            about: description
         })         
      })
      .then(this._checkResponse)
   }

   setAvatar(link) {
      const setUrl = this._url + '/users/me/avatar'
      return fetch(setUrl, {
         method: 'PATCH',
         headers: this._headersJson,
         body: JSON.stringify({
            avatar: link
         })
      })
      .then(this._checkResponse)
   }

  getInitialCards() {
      const setUrl = this._url + '/cards'
      return fetch(setUrl, {
         method: 'GET',
         headers: this._headers
      })
     .then(this._checkResponse)
  }
   
   addCard(name, link) {
      const setUrl = this._url + '/cards'
      return fetch(setUrl, {
         method: 'POST',
         headers: this._headersJson,
         body: JSON.stringify({
            name: name,
            link: link
         })
      })
      .then(this._checkResponse)
   }

   deleteCard(id) {
      const setUrl = this._url + `/cards/${id}`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   putLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'PUT',
         headers: this._headers
      })
      .then(this._checkResponse)
   }
   deleteLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: this._headers
      })
      .then(this._checkResponse)
   }   
   changeLikeCardStatus(id, isLiked) {
      const changeLike = isLiked ? 'deleteLike' : 'putLike'
      return api[changeLike](id);   
   }
}

export const api = new Api({
   baseUrl: 'https://api.asya.nomoredomains.rocks'
});