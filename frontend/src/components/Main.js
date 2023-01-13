import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);
    
  return (
    <main className="content">
        <section className="profile">
              <img onClick={onEditAvatar} src={currentUser.avatar} alt="Фото" className="profile__foto" />
              <div>
                  <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
                  </div>
                  <p className="profile__description">{currentUser.about}</p>      
              </div>
              <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
        </section>
        <section>
        <ul className="foto">
          {cards.map((card) => (  
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id} />
            ))}
          </ul>
        </section>
      </main>       
    )
}

export default Main;