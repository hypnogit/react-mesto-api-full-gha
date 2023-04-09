import Card from "./Card";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, handleCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-section" onClick={onEditAvatar}>
            <div className="profile__avatar-overlay" />
            <button
              aria-label="Кнопка редактирования аватара"
              type="button"
              className="profile__edit-avatar-button"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="Кнопка редактирования информации профиля"
              type="button"
              className="profile__edit-info"
              onClick={onEditProfile}
            />
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            aria-label="Кнопка добавления новой карточки"
            type="button"
            className="profile__add-element"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
