import React, { useState, useEffect } from 'react';
import logoPath from '../images/logo.svg';
import { useHistory } from 'react-router-dom'; 

function Header({ loggedIn, currentLogin, logOut }) {
   const history = useHistory();
   const [path, setPath] = useState(history.location.pathname);
   const [isOpen, setIsOpen] = useState(false);
   const classNameBox = `header__box ${isOpen && 'header__box_open'} `;
   const classNameButton = `header__burger ${isOpen && 'header__burger_open'} `;
   const classNameHeader = `header ${isOpen && 'header_open'} `;

   useEffect(() => {
      setPath(history.location.pathname);
   }, [history.location])

   useEffect(() => {
      if (!loggedIn) {
         setIsOpen(false)
      }
   }, [loggedIn])
   
   const handleClickMenu = () => {
      setIsOpen(!isOpen);
   }

   return ( 
      <header className={classNameHeader}>    
         <img src={logoPath} alt="Логотип" className="header__logo" />
            {loggedIn && <button onClick={handleClickMenu} className={classNameButton}></button>}
            {loggedIn && 
               <div className={classNameBox}>
                  <p className="header__user">{currentLogin.email}</p>
                  <button className='header__logout' onClick={logOut}>Выйти</button>
               </div>           
            }             
            {!loggedIn &&
            <a className='header__link'
               href={path == "/sign-up" ? '/sign-in' : '/sign-up'}>
               {path == "/sign-up" ? "Войти" : "Регистрация"}
            </a>}  
      </header>      
   )
}

export default Header;