import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react"
import { remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReviewRef } from "../firebaseConfig";

const EditReviewPage = () => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [date, setDate] = useState();

    const params = useParams()
    const reviewId = params.id;

    function submitEvent(reviewId, title, body) {
        set(getReviewRef(reviewId), {
            title: title,
            body: body,
            date: new Date()
          });
        
    };

    function deleteReview() {
        remove(getReviewRef(reviewId));
    }

    useEffect(() => {
        setDate(Date.now("HH:ii:ss"));
    }, [])

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="Back" defaultHref="/profile/reviews"></IonBackButton>
                </IonButtons>
                <IonTitle>Edit Review</IonTitle>
            </IonToolbar>

            <IonContent fullscreen style={{ display: 'flex' }}>
                <form onSubmit={submitEvent}>
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">Title</IonLabel>
                            <IonInput
                                value={title}
                                placeholder="Change title"
                                onIonChange={e => setTitle(e.target.value)}
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">Description</IonLabel>
                            <IonInput
                                value={body}
                                placeholder="Change description"
                                onIonChange={e => setBody(e.target.value)}
                                required
                            />
                        </IonItem>
                        <div className="ion-padding">
                            {title && body ? (
                                <IonButton expand="block">Save</IonButton>
                            ) : (
                                <IonButton type="submit" expand="block" disabled>
                                    Save
                                </IonButton>
                            )}
                        </div>
                    </IonList>
                </form>
                <IonButton color="danger" onClick={deleteReview}>Delete</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default EditReviewPage