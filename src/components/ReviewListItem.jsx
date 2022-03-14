import { 
    IonAvatar, 
    IonCard, 
    IonCol, 
    IonImg, 
    IonRow, 
    IonText 
} from "@ionic/react";


const ReviewListitem = ({ user, review }) => {
  const defaultPic = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';

    return (
        <IonCard>
            <IonRow>
                <IonCol>
                    <IonAvatar>
                        <IonImg src={user ? review.user.image : defaultPic} />
                    </IonAvatar>
                </IonCol>
                <IonCol>
                    <IonText>{review.user.name ? review.user.name : 'Anonymous'}</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonText>{review.rating ? review.rating : '5'}</IonText>
                <IonText>{review.date ? review.date : '01/01/2001'}</IonText>
            </IonRow>
            <IonRow>{review.description ? review.description : 'Description'}</IonRow>
        </IonCard>
    );
}

export default ReviewListitem;