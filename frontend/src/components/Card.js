import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id || props.card.owner  === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
      />
      {isOwn && <button
        aria-label="Кнопка удаления карточки"
        type="button"
        className="element__remove"
        onClick={handleDeleteClick}
      />}
      <div className="element__details">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__like-section">
          <button
            aria-label="Кнопка лайка карточки"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <div className="element__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
