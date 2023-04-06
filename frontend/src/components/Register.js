import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //registration
    handleRegister(formValue.email, formValue.password)
  };

  return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__content form" onSubmit={handleSubmit}>
                <input required id="email" placeholder="Email" name="email" type="email" className="register__input form__input" minLength="5" maxLength="100" onChange={handleChange} value={formValue.email || ''}/>
                <input required id="password" placeholder="Пароль" name="password" type="password" className="register__input form__input" minLength="5" maxLength="100" onChange={handleChange} value={formValue.password || ''}/>
                <button type="submit" className="register__submit submit">Зарегистрироваться</button>
            </form>
            <div className='register__loginfield'>
                <p className='register__login'>Уже зарегистрированы?&nbsp;</p>
                <Link to='/signin' className='register__link'>
                    Войти
                </Link>
            </div>
        </div>
  )
}

export default Register;
