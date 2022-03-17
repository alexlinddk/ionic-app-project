import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonIcon,
    useIonLoading
} from "@ionic/react";
import ReviewList from "../components/ReviewList";
import { Toast } from "@capacitor/toast";
import { getRestaurantRef, reviewsRef } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { equalTo, onValue, orderByChild, push, query, set, get } from "firebase/database";
import { add } from "ionicons/icons";

const RestaurantReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [showLoader, dismissLoader] = useIonLoading();

    const history = useHistory();
    const params = useParams();
    const restaurantId = params.id;
    const auth = getAuth();

    function addReview() {
        history.push(`/restaurants/reviews/add/${restaurantId}`);
    }

    useEffect(() => {
        async function getRestaurantDataOnce() {
            const snapshot = await get(getRestaurantRef(restaurantId));
            const restaurantData = snapshot.val();
            setRestaurant({
                id: restaurantId,
                ...restaurantData
            });
            return restaurantData;
        }

        async function listenOnChange() {
            showLoader();

            const reviewsByRestaurantId = query(reviewsRef, orderByChild("restaurantId"), equalTo(restaurantId));
            const restaurantData = await getRestaurantDataOnce();
            console.log(restaurantData);

            onValue(reviewsByRestaurantId, async snapshot => {
                const reviewsArray = [];
                snapshot.forEach(reviewSnapshot => {
                    const uid = reviewSnapshot.key;
                    const data = reviewSnapshot.val();
                    const review = {
                        uid,
                        ...data,
                        restaurantId: restaurantId
                    };
                    reviewsArray.push(review);
                    console.log(review);

                    console.log(reviewSnapshot);
                });
                console.log(reviewsArray);
                setReviews(reviewsArray.reverse());
                console.log(reviewsArray);
            });
            dismissLoader();
        }

        listenOnChange();

    }, [restaurantId]);

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref={`/restaurants/${restaurantId}`}></IonBackButton>
                    </IonButtons>
                    <IonTitle>Reviews</IonTitle>
                    <IonButtons slot="end">
                        <IonButton text="Add" onClick={addReview}>New<IonIcon icon={add} /></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonListHeader>
                    <IonLabel>{reviews.length ? "Restaurant Reviews" : "No reviews yet"}</IonLabel>
                </IonListHeader>
                <ReviewList reviews={reviews} />
            </IonContent>
        </IonPage>
    );
}

export default RestaurantReviewsPage;