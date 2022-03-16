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
import { locate, call, mail, time, book, arrowForward, create } from 'ionicons/icons';
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
        history.replace(`/restaurants/reviews/${restaurantId}`);
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
                                    <IonImg src={imageUrl} style={{ maxHeight: "170px" }} />
                                </IonSlide>
                            );
                        })}
                    </IonSlides>}
                <IonList style={{paddingRight: '25px'}}>
                    <IonButton style={{ margin: '20px auto', display: 'block', width: '50%', backgroundColor: 'var(--ion-color-primary)', borderRadius: '5px' }} onClick={bookTable}>
                        Book Table
                    </IonButton>
                    <IonItem>
                        <IonIcon icon={locate} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
                        <IonLabel>{restaurant.address}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={call} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
                        <IonLabel>
                            <IonRouterLink style={{ "color": "var(--ion-color-secondary)" }}>{restaurant.phone}</IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={mail} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
                        <IonLabel>
                            <IonRouterLink style={{ "color": "var(--ion-color-secondary)" }}>{restaurant.mail}</IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={time} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
                        <IonLabel>
                            {restaurant.openingHours &&
                                restaurant.openingHours.map((item, index) => {
                                    return <IonText key={index} style={{ lineHeight: "30px" }}>{item}<br /></IonText>
                                })}
                        </IonLabel>
                    </IonItem>
                    <IonRouterLink id="goToReviews" onClick={openMenu} >
                        <IonItem>
                            <IonIcon icon={book} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
                            <IonTitle>Menu</IonTitle>
                            <IonIcon slot="end" icon={arrowForward} />
                        </IonItem>
                    </IonRouterLink>
                    <IonRouterLink id="goToReviews" onClick={goToReviews}>
                        <IonItem>
                            <IonIcon icon={create} style={{ "color": "var(--ion-color-primary)", marginRight: '10px' }} />
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