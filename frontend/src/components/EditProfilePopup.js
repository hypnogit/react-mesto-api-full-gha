import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
        title="Редактировать профиль"
        name="profile-popup"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          required
          id="name"
          placeholder="Имя"
          name="profile-popup__input_name"
          type="text"
          className="profile-popup__input profile-popup__input_type_name form__input"
          minLength={2}
          maxLength={40}
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="profile-popup__input-error" id="name-error" />
        <input
          required
          id="about"
          placeholder="Профессия"
          name="profile-popup__input_job"
          type="text"
          className="profile-popup__input profile-popup__input_type_job form__input"
          minLength={2}
          maxLength={200}
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="profile-popup__input-error" id="about-error" />
      </PopupWithForm>
    );
  }
  
  export default EditProfilePopup;
  