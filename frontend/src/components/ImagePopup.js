import React, { useEffect } from 'react';
import { useState } from 'react';

function ImagePopup(props) {
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (props.card.link === '') {
         setIsOpen(false);
      } else {
         setIsOpen(true)
      }
   }, [props.card]); 

   const className = `popup popup_type_${props.name} ${isOpen && 'popup_open'}`;
      return (
         <section className={className} >
            <div className="popup__preview">
               <button onClick={props.onClose} type="button" className="popup__close"></button>
               <img className="popup__picture" src={props.card.link} alt={props.card.description} />
               <h2 className="popup__description">{props.card.description}</h2>
            </div>
         </section>           
      )
    
}

export default ImagePopup;