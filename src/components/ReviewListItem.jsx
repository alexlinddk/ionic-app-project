import {
    IonAvatar,
    IonCard,
    IonCol,
    IonImg,
    IonRow,
    IonText,
    IonTitle
} from "@ionic/react";
import { getAuth } from "firebase/auth";
import { get } from "firebase/database";
import { useEffect, useState } from "react";
import { getUserRef } from "../firebaseConfig";


const ReviewListitem = ({ review }) => {
    const [user, setUser] = useState({});

    const auth = getAuth();

    async function getUserDataOnce() {
        const snapshot = await get(getUserRef(auth.currentUser.uid));
        const userData = snapshot.val();

        setUser({
            uid: auth.currentUser.uid,
            ...userData
        });
        return userData;

    }

    useEffect(() => {
        getUserDataOnce();
    }, [])

    return (
        <IonCard>
            <IonRow>
                <IonCol>
                    <IonTitle>{review.title ? review.title : 'Title'}</IonTitle>
                </IonCol>
                <IonCol>
                    <IonText style={{color: 'var(--ion-color-primary)'}}>{review.date ? review.date : '01/01/2001'}</IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                    <IonText style={{margin: '25px', }}>{review.body ? review.body : 'Description'}</IonText>
            </IonRow>
        </IonCard>
    );
}

export default ReviewListitem;