import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete }) {
   const currentUser = React.useContext(CurrentUserContext);
   const [countLikes, setCountLikes] = useState(card.likes.length);
   const [isLiked, setIsLiked] = useState(card.likes.some(i => i._id === currentUser._id));
   const classNameDeleteButton = `foto__delete-button ${card.owner._id===currentUser._id && 'foto__delete-button_active'}`;
   const classNameLikeButton = `foto__like-button ${isLiked && 'foto__like-button_active'}`;

   React.useEffect(() => {
      setCountLikes(card.likes.length);
      setIsLiked(card.likes.some(i => i._id === currentUser._id))
   }, [card]); 

   function handleClick(ev) {
      onCardClick(ev.target.src, ev.target.alt);
   } 
   function handleCardLike() {
      onCardLike(card);     
   }  
   
   function handleCardDelete() {
      onCardDelete(card);
   }

   return (
      <li className="foto__item">
         <div className="foto__container">
            <img onClick={handleClick} className="foto__picture" src={card.link} alt={card.name} />
         </div>
         <button onClick={handleCardDelete} type="button" className={classNameDeleteButton}></button>
         <div className="foto__description">
            <h2 className="foto__name">{card.name}</h2>
            <div>
               <button onClick={handleCardLike} type="button" className={classNameLikeButton}></button>
               <p className="foto__like-counter">{countLikes}</p>
            </div>
         </div>
      </li>
   )
}

export default Card;