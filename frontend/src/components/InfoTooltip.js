import React from "react";
import successImg from '../images/yes.png'
import failImg from '../images/no.png'

function InfoTooltip({ isOpen, onClose, isFail }) {
    const tooltipText = isFail ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!';
    const tooltipImg = { backgroundImage: `url(${isFail ? failImg : successImg})`};

    return (
        <div className={`profile-popup popup ${isOpen && ' popup_opened'}`}>
            <div className="profile-popup__container">
                <button aria-label="Кнопка закрытия попапа" type="button" className="profile-popup__close popup__close" onClick={onClose}></button>
                <div className="popup__tooltip-img" style={tooltipImg} />
                <p className="popup__tooltip-text">
                    {tooltipText}
                </p>
            </div>
        </div>
    );
  }
  
  export default InfoTooltip;
  