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
import { remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getReviewRef } from "../firebaseConfig";

const EditReviewPage = () => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [date, setDate] = useState();

    const params = useParams()
    const reviewId = params.id;
    const history = useHistory();

    function submitEvent(reviewId, title, body) {
        update(getReviewRef(reviewId), {
            title: title,
            body: body,
            date: new Date()
        });
        history.replace('/profile/reviews')
    };

    function deleteReview() {
        remove(getReviewRef(reviewId));
        history.replace('/profile/reviews')
    }

    useEffect(() => {
        const currentDate = new Date();
        setDate(currentDate.toDateString());
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
                <form onSubmit={submitEvent} style={{ padding: '20px' }}>
                    <IonItem style={{ margin: '10px 0px', borderRadius: '7px' }}>
                        <IonLabel position="stacked">Title</IonLabel>
                        <IonInput
                            value={title}
                            placeholder="Change title"
                            onIonChange={e => setTitle(e.target.value)}
                        />
                    </IonItem>
                    <IonItem style={{ margin: '10px 0px', borderRadius: '7px' }}>
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
                </form>
                <IonButton color="danger" onClick={deleteReview} style={{ display: 'block', width: '50%', margin: '0 auto' }}>Delete</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default EditReviewPage