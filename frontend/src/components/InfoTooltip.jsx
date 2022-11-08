import success from '../images/success.svg'
import error from '../images/error.svg'

const InfoTooltip = ({isOpen, onClose, registered, positiveResultText, negativeResultText}) => {
  return(
    <div className={`popup popup__infoTooltip ${isOpen && "popup_isOpen"}`}>
      <div className="popup__content popup__content-infoTooltip">
        <button 
          onClick={onClose} 
          type="button" 
          className="popup__close"
        />
        <img className="popup__infoTooltip-image" src={ registered ? success : error } alt="результат" />
        <p className="popup__infoTooltip-message">
          { registered ? positiveResultText : negativeResultText }
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;