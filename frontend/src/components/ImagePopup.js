function ImagePopup(props) {
  return (
    <div className="ImagePopup">
      <div className={`view-mesto-popup popup ${props.card && "popup_opened"}`}>
        <div className="view-mesto-popup__container">
          <button
            aria-label="Кнопка закрытия просмотра"
            type="button"
            className="view-mesto-popup__close popup__close"
            onClick={props.onClose}
          />
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="view-mesto-popup__image"
          />
          <div className="view-mesto-popup__name">
            {props.card ? props.card.name : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
