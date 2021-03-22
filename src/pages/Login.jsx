import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  setMealsToken,
  setCocktailsToken,
  setUser,
} from '../services/setLocalStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const checkEmailAndPassword = () => {
    const minimumPasswordSize = 6;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidPassword = password.length > minimumPasswordSize;
    if (isValidPassword && isValidEmail) {
      return false;
    }
    return true;
  };

  const emailChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const passwordChange = ({ target: { value } }) => {
    setPassword(value);
  };

  const onClick = () => {
    setMealsToken();
    setCocktailsToken();
    setUser(email);
    setShouldRedirect(true);
  };

  return (
    <div>
      {shouldRedirect ? (
        <Redirect to="/comidas" />
      ) : (
        <form>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ emailChange }
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            onChange={ passwordChange }
          />
          <Button
            name="Entrar"
            data-testid="login-submit-btn"
            disabled={ checkEmailAndPassword() }
            onClick={ onClick }
          />
        </form>
      )}
    </div>
  );
};

export default Login;
