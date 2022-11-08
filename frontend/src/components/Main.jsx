import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
    const currentUser = useContext(CurrentUserContext);

    return(
        <main className="content">
            <section className="profile">
                <button 
                    onClick={onEditAvatar} 
                    className="profile__button-change-avatar"
                />
                <div 
                    style={{ backgroundImage: `url(${currentUser.avatar})` }} 
                    className="profile__avatar" 
                />
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button 
                            onClick={onEditProfile} 
                            type="button" 
                            className="profile__edit-button"
                            />
                    </div>
                    <h2 className="profile__description">{currentUser.about}</h2>
                </div>
                <button 
                    onClick={onAddPlace} 
                    type="button" 
                    className="profile__add-button"
                />
            </section>
            
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((data) => {
                        return(
                            <Card 
                            key={data._id}
                            card={data}
                            onClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main;