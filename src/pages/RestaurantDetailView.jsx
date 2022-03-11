import {
    IonRouterLink,
    IonTitle,
    IonPage,
    IonImg,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonButton,
    IonSlides,
    IonSlide,
} from "@ionic/react";
import { pin, call, mail, time, book, openOutline, create } from 'ionicons/icons';
import { useState, useEffect, } from "react";
import { useParams } from "react-router";

const RestaurantDetailView = () => {
    const [restaurant, setRestaurant] = useState({});

    const params = useParams();
    const restaurantId = params.id;

    async function loadData() {
        //fetch restaurant data by restaurantId prop
        const res = await fetch(`https://restaurants-app-2402e-default-rtdb.firebaseio.com/restaurants/${restaurantId}.json`);
        const restaurantData = await res.json();
        setRestaurant(restaurantData);
    }

    useEffect(() => {
        loadData();
    }, []);

    const slideOpts = {
        autoplay: true
    };

    console.log(restaurant);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton menu="start" />
                    </IonButtons>
                    <IonTitle>{restaurant.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {restaurant.images &&
                    <IonSlides pager={true} options={slideOpts}>
                        {restaurant.images.map(imageUrl => {
                            return (
                                <IonSlide>
                                    <IonImg key={imageUrl.id} src={imageUrl} />
                                </IonSlide>
                            );
                        })}
                    </IonSlides>}
                <IonList>
                    <IonButton style={{ margin: '20px auto' }}>
                        <IonRouterLink href={restaurant.bookUrl} style={{ color: "white" }}>
                            Book Table
                        </IonRouterLink>
                    </IonButton>
                    <IonItem>
                        <IonIcon slot="start" icon={pin} />
                        <IonLabel>{restaurant.address}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={call} />
                        <IonLabel>
                            <IonRouterLink>{restaurant.phone}</IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={mail} />
                        <IonLabel>
                            <IonRouterLink>{restaurant.mail}</IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={time} />
                        <IonLabel>
                            <IonList>
                                {restaurant.openingHours &&
                                    restaurant.openingHours.map(item => {
                                        return <IonItem key={item.id}>{item}<br /></IonItem>
                                    })}
                            </IonList>
                        </IonLabel>
                    </IonItem>
                    <IonRouterLink href={restaurant.menuUrl}>
                        <IonItem>
                            <IonIcon slot="start" icon={book} />
                            <IonTitle>Go to menu</IonTitle>
                            <IonIcon slot="end" icon={openOutline} />
                        </IonItem>
                    </IonRouterLink>
                    <IonRouterLink>
                        <IonItem>
                            <IonIcon slot="start" icon={create} />
                            <IonTitle>Write review</IonTitle>
                        </IonItem>
                    </IonRouterLink>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default RestaurantDetailView;