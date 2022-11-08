import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, onLoad}) {
  const inputValues = {name: '', link: ''};
  const {values, setValues, handleChange} = useForm(inputValues);

  useEffect(() => {
    if (isOpen) {
      setValues(inputValues);
    }
  }, [isOpen]);
  
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  };

  return(
    <PopupWithForm 
      name={"add"} 
      title={"Новое место"} 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
    >
      <label 
        htmlFor="" 
        className="popup__form-label"
      >
        <input 
          value={values.name || ''}
          onChange={handleChange}
          id="place-name" 
          name="name" 
          type="text" 
          className="popup__input popup__input-place-name" 
          placeholder="Название" 
          minLength="2" 
          maxLength="30" 
          required 
        />
        <span 
          id="error-place-name" 
          className="popup__error place-name-error"
        />
      </label>
      <label 
        htmlFor="" 
        className="popup__form-label"
        >
        <input 
          value={values.link || ''}
          onChange={handleChange}
          id="place-link" 
          name="link" 
          type="url" 
          className="popup__input popup__input-place-link" 
          placeholder="Ссылка на картинку" 
          required 
        />
        <span 
          id="error-place-link" 
          className="popup__error place-link-error"
          />
      </label>
      <button 
        type="submit" 
        className="popup__button">
          { onLoad ? "Создание..." : "Создать" }
        </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;