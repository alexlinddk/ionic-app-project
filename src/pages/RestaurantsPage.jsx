import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonImg
} from '@ionic/react';
import RestaurantList from '../components/RestaurantList';
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MenuHeader from '../components/MenuHeader'

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  async function getRestaurants() {
    const response = await fetch("https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants.json");
    const data = await response.json();
    const restaurantsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    setRestaurants(restaurantsArray);
  }

  useIonViewWillEnter(() => {
    getRestaurants();
  });

  return (

    <IonPage>
      <MenuHeader title="Restaurants" />

      <IonContent fullscreen>
        <RestaurantList restaurants={restaurants} />
      </IonContent>
    </IonPage>
  );
};

export default RestaurantsPage;
