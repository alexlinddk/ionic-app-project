import ReviewList from "../components/ReviewList";
import { useParams } from "react-router";
import { useState } from "react";
import { 
    IonBackButton, 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    useIonViewWillEnter 
} from "@ionic/react";
import ReviewListItem from "../components/ReviewListItem";

const RestaurantReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [restaurant, setRestaurant] = useState([]);

    const params = useParams();
    const restaurantId = params.id;

    async function getReviews() {
        const response = await fetch("https://restaurants-app-2402e-default-rtdb.firebaseio.com/reviews.json");
        const data = await response.json();
        const reviewsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        const restaurantReviews = reviewsArray.filter(review => review.restaurant.id === restaurant.id);
        console.log(restaurantReviews);
        setReviews(restaurantReviews);
    }

    async function getRestaurant() {
        const response = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/reviews/restaurant/${restaurantId}.json`);
        const restaurantData = await response.json();
        setRestaurant(restaurantData);
    }



    useIonViewWillEnter(() => {
        getReviews();
        getRestaurant();
    });
    return (
        <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="Back" defaultHref="/restaurants/:id"></IonBackButton>
            </IonButtons>
            <IonTitle>{restaurant?.name ? restaurant.name : "Unknown Restaurant"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonList>
            <IonListHeader>
              <IonLabel>{reviews.length ? "Restaurant Reviews" : "No reviews yet"}</IonLabel>
            </IonListHeader>
            {reviews.map(review => (
              <ReviewListItem review={review} key={review.id} />
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
}



export default RestaurantReviewsPage;