import React from "react";

function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup-picture ${card && "popup_isOpen"}`}>
          <div className="popup__content-picture">
              <figure className="popup__figure">
                  <img src={card?.link} alt={card?.name} className="popup__image" />
                  <figcaption className="popup__caption">{card?.name}</figcaption>
              </figure>
              <button onClick={onClose} type="button" className="popup__close popup__close-pic"></button>
          </div>
      </div>
  )
}

export default ImagePopup;