import RestaurantListItem from './RestaurantListItem';
import { IonList } from "@ionic/react";

export default function RestaurantList({ restaurants }) {
  return (
    <IonList>
      {restaurants.map(restaurant => (
        <RestaurantListItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </IonList>
  )
}