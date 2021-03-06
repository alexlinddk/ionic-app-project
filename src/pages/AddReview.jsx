import { Toast } from "@capacitor/toast";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonLoading
} from "@ionic/react"
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { database, reviewsRef } from '../firebaseConfig';

const AddReview = () => {
    const [restaurant, setRestaurant] = useState({});
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [date, setDate] = useState("");
    const [showLoader, dismissLoader] = useIonLoading();

    const auth = getAuth();
    const params = useParams();
    const restaurantId = params.id;
    const history = useHistory();

    async function loadData() {
        //fetch restaurant data by restaurantId prop
        const res = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants/${restaurantId}.json`);
        const restaurantData = await res.json();
        setRestaurant(restaurantData);
    }

    function submitEvent(event) {
        event.preventDefault();
        const newReview = { title: title, body: body, date: date, restaurantId: restaurantId, userId: auth.currentUser.uid };
        writeReviewData(newReview);
    }

    function writeReviewData(newReview) {
        showLoader();
        const newReviewRef = push(reviewsRef);
        set(newReviewRef, {
            title: newReview.title,
            body: newReview.body,
            date: newReview.date,
            restaurantId: newReview.restaurantId,
            user: auth.currentUser.uid
        })
            .then(() => {
                history.replace(`/restaurants/reviews/${restaurantId}`);
                Toast.show({
                    text: "New review created!"
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dismissLoader();
            });
    }

    useEffect(() => {
        const currentDate = new Date();
        setDate(currentDate.toDateString());
        loadData();
    }, [])
    return (
        <>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="Back" defaultHref={`/restaurants/reviews/${restaurantId}`}></IonBackButton>
                </IonButtons>
                <IonTitle>Reviews</IonTitle>
            </IonToolbar>
            <form onSubmit={submitEvent} style={{ padding: '20px' }}>
                <IonItem style={{margin: '10px 0px', borderRadius: '7px'}}>
                    <IonLabel position="stacked">Title</IonLabel>
                    <IonInput
                        value={title}
                        placeholder="Type the title of your review"
                        onIonChange={e => setTitle(e.target.value)}
                        required
                    />
                </IonItem>
                <IonItem style={{margin: '10px 0px', borderRadius: '7px'}}>
                    <IonLabel position="stacked">Description</IonLabel>
                    <IonTextarea
                        value={body}
                        placeholder="Tell us about your experience"
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
        </>
    )
}

export default AddReview