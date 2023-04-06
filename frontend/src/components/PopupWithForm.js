function PopupWithForm(props) {
  return (
    <div className="PopupWithForm">
      <div className={`${props.name} popup ${props.isOpen && "popup_opened"}`}>
        <div className={`${props.name}__container`}>
          <button
            aria-label="Кнопка закрытия попапа"
            type="button"
            className={`${props.name}__close popup__close`}
            onClick={props.onClose}
          />
          <form
            name={`${props.name}__content`}
            className={`${props.name}__content form`}
            noValidate
            onSubmit={props.onSubmit}
          >
            <h2 className={`${props.name}__title`}>{props.title}</h2>
            {props.children}
            <button type="submit" className={`${props.name}__submit submit`}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
