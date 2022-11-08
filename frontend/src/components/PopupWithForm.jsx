import React from "react";

function PopupWithForm({name, title, children, buttonDefaultText, isOpen, onClose, onSubmit}) {
  return(
    <div className={`popup popup-${name} ${isOpen && "popup_isOpen"}`}>
          <div className="popup__content">
              <button 
                onClick={onClose} 
                type="button" 
                className="popup__close"
                />
              <h2 className="popup__title">
                  {title}
              </h2>
              <form  
                onSubmit={onSubmit} 
                name={`${name}`} 
                className="popup__form" 
                >
                  {children}
              </form>
          </div>
      </div>
  )
}

export default PopupWithForm;