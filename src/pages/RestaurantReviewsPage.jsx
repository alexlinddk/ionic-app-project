import ReviewList from "../components/ReviewList";
import { useParams } from "react-router";
import { useState } from "react";
import { useIonViewWillEnter } from "@ionic/react";

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
        <>
                    { reviews.map(restaurant =><h1>{restaurantId}</h1>)}
                    <ReviewList reviews={reviews} />
        </>
    );
}

export default RestaurantReviewsPage;