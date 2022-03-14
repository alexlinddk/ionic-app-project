import {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg
} from "@ionic/react";
import { pin } from "ionicons/icons"
import { useHistory } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
    const history = useHistory();

    function goToRestaurantDetailView() {
        history.replace(`restaurants/${restaurant.uid - 1}`);
    }

    return (
        <IonCard class="ion-margin" style={{"borderRadius": "7px"}} onClick={goToRestaurantDetailView}>
                <IonImg src={restaurant.images[0]} style={{"overflow": "hidden", "maxHeight": "200px"}} />
                <IonCardTitle style={{"marginTop": "20px"}}e>{restaurant.name}</IonCardTitle>
            <IonCardContent>
                <IonCardSubtitle><IonIcon icon={pin} />{restaurant.address}</IonCardSubtitle>
            </IonCardContent>
        </IonCard>
    );
}

export default RestaurantListItem;