import { useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.isOpen]);

  function handlePlaceNameChange(evt) {
    setPlaceName(evt.target.value);
  }

  function handlePlaceLinkChange(evt) {
    setPlaceLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace(placeName, placeLink);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-mesto-popup"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        id="mesto"
        placeholder="Название"
        name="add-mesto-popup__input_mesto"
        type="text"
        className="add-mesto-popup__input add-mesto-popup__input_type_mesto form__input"
        minLength={2}
        maxLength={30}
        value={placeName}
        onChange={handlePlaceNameChange}
      />
      <span className="add-mesto-popup__input-error" id="mesto-error" />
      <input
        required
        id="link"
        placeholder="Ссылка на картинку"
        name="add-mesto-popup__input_image"
        type="url"
        className="add-mesto-popup__input add-mesto-popup__input_type_image form__input"
        value={placeLink}
        onChange={handlePlaceLinkChange}
      />
      <span className="add-mesto-popup__input-error" id="link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
