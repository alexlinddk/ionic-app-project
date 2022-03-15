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
    IonText,
    IonBackButton
} from "@ionic/react";
import { pin, call, mail, time, book, arrowForward, create } from 'ionicons/icons';
import { useState, useEffect, } from "react";
import { useHistory, useParams } from "react-router";
import { Browser } from '@capacitor/browser';
import './RestaurantDetailView.css';

const RestaurantDetailView = () => {
    const [restaurant, setRestaurant] = useState({});

    const history = useHistory();
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
        autoplay: true,
    };

    const goToReviews = () => {
        history.push(`/restaurants/reviews/${restaurantId}`);
    };

    const bookTable = () => {
        Browser.open({ url: restaurant.bookUrl});
    }

    const openMenu = () => {
        Browser.open({ url: restaurant.menuUrl});
    }
    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/restaurants"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{restaurant.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {restaurant.images &&
                    <IonSlides pager={true} options={slideOpts}>
                        {restaurant.images.map((imageUrl, index) => {
                            return (
                                <IonSlide key={index}>
                                    <IonImg src={imageUrl} style={{ maxHeight: "250px" }} />
                                </IonSlide>
                            );
                        })}
                    </IonSlides>}
                <IonList>
                    <IonButton style={{ margin: '20px auto', display: 'block', width: '50%' }} onClick={bookTable}>
                        Book Table
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
                            {restaurant.openingHours &&
                                restaurant.openingHours.map((item, index) => {
                                    return <IonText key={index} style={{ lineHeight: "30px" }}>{item}<br /></IonText>
                                })}
                        </IonLabel>
                    </IonItem>
                    <IonRouterLink id="goToReviews" onClick={openMenu} >
                        <IonItem>
                            <IonIcon slot="start" icon={book} />
                            <IonTitle>Menu</IonTitle>
                            <IonIcon slot="end" icon={arrowForward} />
                        </IonItem>
                    </IonRouterLink>
                    <IonRouterLink id="goToReviews" onClick={goToReviews}>
                        <IonItem>
                            <IonIcon slot="start" icon={create} />
                            <IonTitle>Reviews</IonTitle>
                            <IonIcon slot="end" icon={arrowForward} />
                        </IonItem>
                    </IonRouterLink>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default RestaurantDetailView;