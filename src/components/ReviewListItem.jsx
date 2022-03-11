import { IonAvatar, IonCard, IonCol, IonImg, IonRow, IonText } from "@ionic/react";


const ReviewListitem = ({ user, review }) => {
    return (
        <IonCard>
            <IonRow>
                <IonCol>
                    <IonAvatar>
                        <IonImg src={review.user.image} />
                    </IonAvatar>
                </IonCol>
                <IonCol>
                    <IonText>{review.user.name ? review.user.name : 'Anonymous'}</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonText>{review.rating}</IonText>
                <IonText>{review.date}</IonText>
            </IonRow>
            <IonRow>{review.description}</IonRow>
        </IonCard>
    );
}

export default ReviewListitem;