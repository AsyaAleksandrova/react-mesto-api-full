import React from 'react';
import { useHistory } from 'react-router-dom'; 

function InputForm(props) {
   const history = useHistory();
   const path = history.location.pathname;
   
  
   return (
      <main className="content">
         <form onSubmit={props.onSubmit} name={props.name} className="auth">
            <div>
               <h1 className='auth__title'>{path === "/sign-in" ? "Вход" : "Регистрация"}</h1>
               <input className='auth__input' onChange={props.onChangeEmail} value={props.email || ''}
                  type="email" name="mail" required minLength="2" maxLength="40" placeholder='Email'></input>
               <input className='auth__input' onChange={props.onChangePass} value={props.pass || ''}
                  type="password" name="pass" required minLength="7" maxLength="40" placeholder='Пароль'></input>
            </div>
            <div>
               <button type="submit" className="auth__button">{path === "/sign-in" ? "Войти" : "Зарегистрироваться"}</button>
               <a className='auth__link' href={path === "/sign-up" ? '/sign-in' : ''}>{ path === "/sign-up" ? 'Уже зарегистрированы? Войти' : ''}</a>
            </div>
         </form>
      </main>
   )
}

export default InputForm;