import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonAvatar, IonImg } from "@ionic/react";

const MenuHeader = ({ title }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton menu="start" />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
}

export default MenuHeader;