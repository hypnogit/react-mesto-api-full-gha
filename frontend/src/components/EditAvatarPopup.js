import { createRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarLink = createRef()

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar(avatarLink.current.value);
    }

    useEffect(() => {
        avatarLink.current.value=''
    }, [props.isOpen, avatarLink]);
    

    return (
        <PopupWithForm
        title="Обновить аватар"
        name="update-avatar-popup"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          required
          id="avatar"
          placeholder="Ссылка на аватар"
          name="update-avatar-popup__input"
          type="url"
          className="update-avatar-popup__input form__input"
          ref={avatarLink}
        />
        <span
          className="update-avatar-popup__input-error"
          id="avatar-error"
        />
      </PopupWithForm>
    );
  }
  
  export default EditAvatarPopup;
  