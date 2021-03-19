import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from '../components/Inputs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    function buttonAble() {
      const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minOfCaracteres = 6;
      if (validEmail.test(email) && password.length > minOfCaracteres) {
        setDisabled(false);
      }
    }
    buttonAble();
  }, [email, password]);

  return (
    <fieldset>
      <Input
        type="text"
        datatestid="email-input"
        label="Email"
        name={ email }
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <Input
        type="password"
        label="Senha"
        name={ password }
        onChange={ (e) => setPassword(e.target.value) }
        datatestid="password-input"
      />
      <Button
        label="Entrar"
        datatestid="login-submit-btn"
        disabled={ disabled }
        // onClick={ () => ) }
      />
    </fieldset>

  );
};

export default Login;
