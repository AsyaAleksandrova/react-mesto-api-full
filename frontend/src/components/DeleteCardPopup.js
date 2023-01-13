import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ onClose, card, onAccept }) {
   const [isOpen, setIsOpen] = useState(false);
   const [btnName, setBtnName] = useState('Да');

   useEffect(() => {
      if (card.id == '') {
         setIsOpen(false);
      } else {
         setIsOpen(true)
      }
   }, [card]);

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Удаление...')
      onAccept()
      .finally(() => {
            setBtnName('Да')
         });
   }

   return (
      <PopupWithForm
         onClose={onClose}
         isOpen={isOpen}
         name="accept"
         title="Вы уверены?"
         buttonName={btnName}
         onSubmit={handleSubmit}
      >
        </PopupWithForm>      
   )
   
}

export default DeleteCardPopup;