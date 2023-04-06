import { Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';

function Header({ email, handleLogout}) {
  return (
    <div className="Header">
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        <Routes>
          <Route path="/signin" element={
            <Link to='/signup' className='header__link'>
              Регистрация
            </Link>}
          />
          <Route path="/signup" element={
            <Link to='/signin' className='header__link'>
              Войти
            </Link>}
          />
          <Route path="/" element={
            <div className="header__auth">
              <p className="header__email">{email}</p>
              <Link to='/signin' className='header__link' onClick={handleLogout}>
                Выйти
              </Link> 
            </div>
            }/>
        </Routes>
      </header>
    </div>
  );
}

export default Header;
