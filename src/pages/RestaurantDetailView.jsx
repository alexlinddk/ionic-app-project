import { IonRouterLink, IonTitle, IonPage, IonImg, IonHeader, IonToolbar, IonContent, IonText } from "@ionic/react";
import { useState, useEffect, } from "react";
import { useParams } from "react-router";

const RestaurantDetailView = () => {
    const [restaurant, setRestaurant] = useState({});

    const params = useParams();
    const restaurantId = params.id;

    async function loadData() {
        console.log(restaurantId);
        //fetch restaurant data by restaurantId prop
        const res = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants/${restaurantId}.json`);
        console.log(res);
        const restaurantData = await res.json();
        setRestaurant(restaurantData);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{restaurant.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonImg src={restaurant.image} />
                <IonText>{restaurant.address}</IonText><br />
                <IonRouterLink>{restaurant.phone}</IonRouterLink><br />
                <IonRouterLink>{restaurant.mail}</IonRouterLink>
            </IonContent>
        </IonPage>
    );
}

export default RestaurantDetailView;