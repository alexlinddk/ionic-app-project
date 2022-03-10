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

const RestaurantListItem = ({ restaurant }) => {
    const history = useHistory();

    function goToRestaurantDetailView() {
        history.push(`restaurants/${restaurant.uid - 1}`);
    }

    return (
        <IonCard class="ion-margin">
            <IonCardHeader onClick={goToRestaurantDetailView}>
                <IonImg src={restaurant.images[0]} />
                <IonCardTitle>{restaurant.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonCardSubtitle><IonIcon icon={pin} />{restaurant.address}</IonCardSubtitle>
            </IonCardContent>
        </IonCard>
    );
}

export default RestaurantListItem;