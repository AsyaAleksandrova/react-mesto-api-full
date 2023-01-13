import React from 'react';
import { useForm } from '../hooks/useForm';
import InputForm from './InputForm';

function Login(props) {
   
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [password, setPass, handleChangePass] = useForm('');

   const handleSubmit = (e) => {
      e.preventDefault();
      if (email && password) {
         props.logIn(password, email)
      }   
   }
  
   return (
      <InputForm
         onSubmit={handleSubmit}
         name='login'
         onChangeEmail={handleChangeEmail}
         onChangePass={handleChangePass}
         email={email}
         pass={password}
      />
   )
}

export default Login;