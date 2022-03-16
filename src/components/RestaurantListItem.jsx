import {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg
} from "@ionic/react";
import { locate } from "ionicons/icons"
import { useHistory } from "react-router-dom";

const RestaurantListItem = ({ restaurant }) => {
    const history = useHistory();

    function goToRestaurantDetailView() {
        history.replace(`restaurants/${restaurant.uid - 1}`);
    }

    return (
        <IonCard class="ion-margin" style={{ borderRadius: "7px" }} onClick={goToRestaurantDetailView}>
            <IonImg src={restaurant.images[0]} style={{ overflow: "hidden", maxHeight: "150px" }} />
            <IonCardContent>
                <IonCardTitle style={{ margin: "5px 0px", fontSize: '20px' }}>{restaurant.name}</IonCardTitle>
                <div style={{display: 'flex', alignContent: 'center'}}>
                    <IonIcon icon={locate} style={{ color: "var(--ion-color-primary)", marginRight: '5px' }} slot="start" />
                    <IonCardSubtitle style={{ fontSize: '12px' }}>{restaurant.address}</IonCardSubtitle>
                </div>
            </IonCardContent>
        </IonCard>
    );
}

export default RestaurantListItem;