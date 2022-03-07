import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonViewWillEnter
} from '@ionic/react';
import RestaurantList from '../components/RestaurantList';
import { useState } from "react";
import { getAuth } from "firebase/auth";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  const auth = getAuth();
  // const user = auth.currentUser;

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
      <IonHeader>
        <IonToolbar>
          
          {/* <IonTitle>{user.email}</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Restaurants</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RestaurantList restaurants={restaurants} />
      </IonContent>
    </IonPage>
  );
};

export default RestaurantsPage;