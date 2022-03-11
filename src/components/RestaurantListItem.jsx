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
import { pin } from "ionicons/icons"
import { useHistory } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
    const history = useHistory();

    function goToRestaurantDetailView() {
        history.push(`restaurants/${restaurant.uid - 1}`);
    }

    return (
        <IonCard class="ion-margin" style={{"border-radius": "7px"}}>
            <IonCardHeader onClick={goToRestaurantDetailView}>
                <IonImg src={restaurant.images[0]} style={{"border-radius": "7px", "overflow": "hidden", "max-height": "200px"}} />
                <IonCardTitle style={{"margin-top": "20px"}}e>{restaurant.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonCardSubtitle><IonIcon icon={pin} />{restaurant.address}</IonCardSubtitle>
            </IonCardContent>
        </IonCard>
    );
}

export default RestaurantListItem;