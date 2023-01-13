import React from 'react';


function PopupWithForm({isOpen, onSubmit, onClose, name, title, buttonName, children }) {
   const className = `popup popup_type_${name} ${isOpen && 'popup_open'}`;

   return (
         <section className={className}>
            <div className="popup__content">
               <form onSubmit={onSubmit} name={name} className="popup__form">
                  <button onClick={onClose} type="button" className="popup__close"></button>
                  <h2 className="popup__title">{title}</h2>
                  {children}
                  <button type="submit" className="popup__button">{buttonName}</button>
               </form>
            </div>
         </section>
   )
}

export default PopupWithForm;