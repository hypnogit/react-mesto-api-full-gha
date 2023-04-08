export const buttonEditProfile = document.querySelector('.profile__edit-info');
export const profilePopupName = document.querySelector('.profile-popup__input_type_name');
export const profilePopupJob = document.querySelector('.profile-popup__input_type_job');
export const cardAddButton = document.querySelector('.profile__add-element');
export const cardAddForm = document.querySelector('.add-mesto-popup__content');
export const updateAvatarForm = document.querySelector('.update-avatar-popup__content');
export const updateAvatarButton = document.querySelector('.profile__avatar-overlay');
export const apiConfig = {
  baseUrl: 'https://api.hypnogit.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  }
};
