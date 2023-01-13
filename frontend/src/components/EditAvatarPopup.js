import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
   const [btnName, setBtnName] = useState('Сохранить');
   const avatarRef = React.useRef();

   useEffect(() => {
      avatarRef.current.value = '';
   }, [isOpen]); 

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохранение...');
      onUpdateAvatar({
         avatar: avatarRef.current.value
      })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }    

   return (
      <PopupWithForm
         onClose={onClose}
         isOpen={isOpen}
         name="avatar"
         title="Обновить аватар"
         buttonName={btnName}
         onSubmit={handleSubmit}
      >
            <input ref={avatarRef} type="url" name="avatar" required className="popup__input popup__input_avatar" placeholder="Ссылка на картинку" />
            <span className="popup__error avatar-error"></span>
      </PopupWithForm>      
   )
}

export default EditAvatarPopup;