import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
   const [btnName, setBtnName] = useState('Сохранить');
   const currentUser = React.useContext(CurrentUserContext);
   const [name, setName, handleChangeName] = useForm(currentUser.name);
   const [description, setDescription, handleChangeDescription] = useForm(currentUser.about);
   
   React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, isOpen]); 

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохранение...');
      onUpdateUser({
         name,
         about: description,
      })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }

   return (
      <PopupWithForm
         onClose={onClose}
         isOpen={isOpen}
         name="profile"
         title="Редактировать профиль"
         buttonName={btnName}
         onSubmit={handleSubmit}
      >
            <input onChange={handleChangeName} value={name || ''} type="text" name="profilename" required minLength="2" maxLength="40" className="popup__input popup__input_value_name" />
            <span className="popup__error profilename-error"></span>
            <input onChange={handleChangeDescription} value={description || ''} type="text" name="profiledescription" minLength="2" maxLength="200" required className="popup__input popup__input_value_desc" />
            <span className="popup__error profiledescription-error"></span>        
      </PopupWithForm>      
   )
}

export default EditProfilePopup;