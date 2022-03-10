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
    IonSlide
} from "@ionic/react";
import { pin, call, mail, time, book, openOutline } from 'ionicons/icons';
import { useState, useEffect, } from "react";
import { useParams } from "react-router";
import './RestaurantDetailView.css';

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
        initialSlide: 1,
        speed: 400,
        autoplay: true
    };

    // const menuItems = [
    //     {

    //         name: 'Burger',
    //         description: 'A delicious burger',
    //         price: 69.95
    //     },
    //     {
    //         name: 'Sandwich',
    //         description: 'A delicious burger',
    //         price: 59.95
    //     }, {
    //         name: 'Burger',
    //         description: 'A delicious burger',
    //         price: 79.95
    //     },
    // ]
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
                {
                    restaurant.images &&
                    <IonSlides pager={true} options={slideOpts}>
                        {restaurant.images.map(imageUrl => {
                            return (
                                <IonSlide>
                                    <IonImg key={imageUrl.id} src={imageUrl} />
                                </IonSlide>
                            );
                        })}
                    </IonSlides>
                }

                <IonList>
                    <IonItem>
                        <IonRouterLink style={{ margin: '0 auto' }} href="https://www.bord-booking.dk/online_booking.php?restaurantId=70530">
                            <IonButton>Book Table</IonButton>
                        </IonRouterLink>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={pin} />
                        <IonLabel><p>{restaurant.address}</p></IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={call} />
                        <IonLabel>
                            <IonRouterLink><p>{restaurant.phone}</p></IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={mail} />
                        <IonLabel>
                            <IonRouterLink><p>{restaurant.mail}</p></IonRouterLink>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon slot="start" icon={time} />
                        <IonLabel><p>Onsdag – lørdag: 17.00 – 22.00</p></IonLabel>
                    </IonItem>
                    <IonRouterLink href="https://restaurantseafood.dk/menu/">
                        <IonItem>
                            <IonIcon slot="start" icon={book} />
                            <IonTitle className="menuTitle"><p>Go to menu</p></IonTitle>
                            <IonIcon slot="end" icon={openOutline} />
                        </IonItem>
                    </IonRouterLink>
                    {/* <MenuList menuItems={menuItems} /> */}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default RestaurantDetailView;