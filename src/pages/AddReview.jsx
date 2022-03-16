import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea,
    useIonLoading
} from "@ionic/react"
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { database } from '../firebaseConfig';

const AddReview = () => {
    const [restaurant, setRestaurant] = useState({});
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [date, setDate] = useState("");
    const [showLoader, dismissLoader] = useIonLoading();

    const auth = getAuth();
    const params = useParams();
    const restaurantId = params.id;
    const currentDate = Date.now();
    setDate(currentDate);

    async function loadData() {
        //fetch restaurant data by restaurantId prop
        const res = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants/${restaurantId}.json`);
        const restaurantData = await res.json();
        setRestaurant(restaurantData);
    }

    function submitEvent(event) {
        showLoader();
        loadData()
        event.preventDefault();
        database.ref("reviews").set({
            user: auth.currentUser,
            restaurant: restaurant,
            title: title,
            body: body,
            date: date
        }).catch(alert);
        dismissLoader();
    }

    useEffect(() => {
    }, [])
    return (
        <form onSubmit={() => submitEvent}>
            <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                    value={title}
                    placeholder="Type the title of your review"
                    onIonChange={e => setTitle(e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
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
    )
}

export default AddReview