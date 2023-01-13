import React, { useState, useEffect }  from 'react';
import crossPath from '../images/cross.png';
import okPath from '../images/ok.png';

function InfoTooltip({ isOpen, onClose, success }) {
   const className = `popup ${isOpen && 'popup_open'}`;
   const [message, setMessage] = useState('Вы успешно зарегистрировались!');
   const [image, setImage] = useState(okPath);

   useEffect(() => {
      if (success) {
         setMessage('Вы успешно зарегистрировались!');
         setImage(okPath);
      } else {
         setMessage('Что-то пошло не так! Попробуйте еще раз.');
         setImage(crossPath);
      }
   }, [isOpen, success]);
  
  
   return (
      <section className={className}>
         <div className="popup__content popup__content_type_submit">
            <button onClick={onClose} type="button" className="popup__close"></button>
            <img className='popup__emoji' alt='Успешность регистрации' src={image}></img>
            <h2 className="popup__message">{ message }</h2>
         </div>
      </section>
   )
}

export default InfoTooltip;