import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onLoad}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);

    avatarRef.current.value = '';
  };

  return(
    <PopupWithForm 
      name={"avatar"} 
      title={"Обновить аватар"} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <label htmlFor="" className="popup__form-label">
        <input 
          ref={avatarRef} 
          id="avatar-url" 
          name="link" 
          type="url" 
          className="popup__input popup__input-avatar" 
          placeholder="Ссылка на аватар" 
          required 
        />
        <span 
          id="error-avatar" 
          className="popup__error avatar-url-error" 
        />
      </label>
      <button 
        type="submit" 
        className="popup__button">
          { onLoad ? "Сохранение..." : "Сохранить" }
        </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;