import PopupWithForm from "./PopupWithForm"


function ConfirmationPopup({onClose, onConfirm, card, onLoad}) {
  
  function handleSubmit(e) {
    e.preventDefault();

    onConfirm(card);
  };

    return(
      <PopupWithForm
      name={"delete"}
      title={"Вы уверены?"}
      isOpen={card}
      onClose={onClose} 
      onSubmit={handleSubmit}
      >
        <button 
          type="submit" 
          className="popup__button">
            { onLoad ? "Удаление..." : "Да"}
          </button>
      </PopupWithForm>
    )
}

export default ConfirmationPopup