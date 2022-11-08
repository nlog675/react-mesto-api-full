import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, onLoad}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, setValues, handleChange} = useForm(currentUser);

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues(currentUser);
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about
    });
  };

  return(
    <PopupWithForm 
      name={"edit"} 
      title={"Редактировать профиль"} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <label 
        htmlFor="" 
        className="popup__form-label"
      >
        <input 
          value={values.name || ""} 
          onChange={handleChange} 
          id="name" 
          name="name" 
          type="text" 
          className="popup__input popup__input-name" 
          placeholder="Имя" 
          minLength="2" 
          maxLength="40" 
          required 
        />
        <span 
          id="error-name" 
          className="popup__error name-error"
        />
      </label>
      <label 
        htmlFor="" 
        className="popup__form-label"
      >
        <input 
          value={values.about || ""} 
          onChange={handleChange} 
          id="bio" 
          name="about" 
          type="text" 
          className="popup__input popup__input-about" 
          placeholder="О себе" 
          minLength="2" 
          maxLength="200" 
          required 
        />
        <span 
          id="error-bio" 
          className="popup__error bio-error"
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

export default EditProfilePopup;