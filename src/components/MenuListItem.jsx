import { IonItem, IonImg, IonText, IonRow, IonCol } from "@ionic/react"

const MenuListItem = ({ item }) => {
    return (
        <IonItem>
            <IonRow style={{width: '100%'}}>
                <IonCol>
                    <IonText>{item.name}</IonText><br />
                    <IonText><i>{item.description}</i></IonText>
                </IonCol>
                <IonCol size="auto">
                    <IonText>{item.price}</IonText>
                </IonCol>
            </IonRow>
        </IonItem>
    );
}

export default MenuListItem;