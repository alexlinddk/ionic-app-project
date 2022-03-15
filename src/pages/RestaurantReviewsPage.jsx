import { useHistory, useParams } from "react-router";
import { useState } from "react";
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
import ReviewListItem from "../components/ReviewListItem";
import { Toast } from "@capacitor/toast";
import { reviewsRef } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { push, set } from "firebase/database";
import { add } from "ionicons/icons";

const RestaurantReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [restaurant, setRestaurant] = useState([]);
    const [showLoader, dismissLoader] = useIonLoading();

    const history = useHistory();
    const params = useParams();
    const restaurantId = params.id;
    const auth = getAuth();

    // async function getReviews() {
    //     const response = await fetch("https://restaurants-app-2402e-default-rtdb.firebaseio.com/reviews.json");
    //     const data = await response.json();
    //     const reviewsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    //     const restaurantReviews = reviewsArray.filter(review => review.restaurant.id === restaurant.id);
    //     console.log(restaurantReviews);
    //     setReviews(restaurantReviews);
    // }

    async function getRestaurant() {
        const response = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants/${restaurantId}.json`);
        const restaurantData = await response.json();
        setRestaurant(restaurantData);
    }

    async function handleSubmit(newReview) {
        showLoader();
        newReview.user = auth.currentUser.uid;
        newReview.restaurant = restaurant;
        const newReviewRef = push(reviewsRef);
        const newReviewKey = newReviewRef.key;
        set(newReviewRef, newReview)
            .then(() => {
                history.replace("/restaurants/reviews/:id");
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

    function addReview() {
        history.replace(`restaurants/reviews/add/${restaurantId}`);
    }

    useIonViewWillEnter(() => {
        // getReviews();
        getRestaurant();
    });

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/restaurants/:id"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{restaurant.name ? restaurant.name : "Unknown Restaurant"}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton text="Add" onClick={addReview}>New<IonIcon icon={add} /></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonListHeader>
                        <IonLabel>{reviews.length ? "Restaurant Reviews" : "No reviews yet"}</IonLabel>
                    </IonListHeader>
                    {reviews.filter(review => (
                        <ReviewListItem review={review} key={review.id} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default RestaurantReviewsPage;