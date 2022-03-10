import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonRouterLink
} from "@ionic/react";
import { at, pin, call } from "ionicons/icons"
import { useHistory } from "react-router-dom";
import './RestaurantListItem.css';

const RestaurantListItem = ({ restaurant }) => {
    const history = useHistory();

    function goToRestaurantDetailView() {
        history.push(`restaurants/${restaurant.uid - 1}`);
    }

    return (
        <IonCard class="ion-margin">
            <IonCardHeader onClick={goToRestaurantDetailView}>
                <IonImg src={restaurant.images[0]} />
                <IonCardTitle><p>{restaurant.name}</p></IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonCardSubtitle><p><IonIcon icon={pin} />{restaurant.address}</p></IonCardSubtitle>
            </IonCardContent>
        </IonCard>
    );
}

export default RestaurantListItem;