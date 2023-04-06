import React, { useState } from 'react';


function Login({ handleLogin }) {
    const [formValue, setFormValue] = useState({
      email: '',
      password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
          ...formValue,
          [name]: value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //authorization
        handleLogin(formValue.email, formValue.password)
    }

    return (
        <div className="register">
            <h2 className="register__title">Вход</h2>
            <form className="register__content form" onSubmit={handleSubmit}>
                <input required id="email" placeholder="Имя" name="email" type="email" className="register__input form__input" minLength="5" maxLength="100" onChange={handleChange} value={formValue.email || ''}/>
                <input required id="password" placeholder="Пароль" name="password" type="password" className="register__input form__input" minLength="5" maxLength="100" onChange={handleChange} value={formValue.password || ''}/>
                <button type="submit" className="register__submit submit">Войти</button>
            </form>
        </div>
    );
  }
  
  export default Login;
  