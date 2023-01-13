import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
   const [btnName, setBtnName] = useState('Создать');
   const [name, setName, handleChangeName] = useForm('');
   const [link, setLink, handleChangeLink] = useForm('');

   useEffect(() => {
      setName('');
      setLink('');
   }, [isOpen]); 

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохранение...')
      onAddPlace({
         link,
         name
      })
         .finally(() => {
            setBtnName('Создать');
         });
   }

   return (
      <PopupWithForm
         onClose={onClose}
         isOpen={isOpen}
         name="foto"
         title="Новое место"
         buttonName={btnName}
         onSubmit={handleSubmit}
         
      >
            <input onChange={handleChangeName} value={name} type="text" name="fotoname" required minLength="2" maxLength="30" className="popup__input popup__input_foto_name" placeholder="Название" />
            <span className="popup__error fotoname-error"></span>
            <input onChange={handleChangeLink} value={link} type="url" name="fotolink" required className="popup__input popup__input_foto_src"
                placeholder="Ссылка на картинку" />
            <span className="popup__error fotolink-error"></span>
      </PopupWithForm>      

   )
}

export default AddPlacePopup;