import React from 'react';
import { useHistory } from 'react-router-dom'; 
import { useForm } from '../hooks/useForm';
import * as auth from '../utils/auth';
import InputForm from './InputForm';

function Register(props) {
   
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [password, setPass, handleChangePass] = useForm('');

   const history = useHistory();

   const resetForm = () => {
      setEmail('');
      setPass('');
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      auth.register(password, email)
         .then((res) => {
            if (res.error) {
               props.handleMessage(false);
            } else {
               props.handleMessage(true);
               resetForm();
               history.push('/sign-in');
            }
         })
   }
  
   return (
      <InputForm
         onSubmit={handleSubmit}
         name='register'
         onChangeEmail={handleChangeEmail}
         onChangePass={handleChangePass}
         email={email}
         pass={password}
      />    
   )
}

export default Register;