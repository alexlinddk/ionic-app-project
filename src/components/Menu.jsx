import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { personAddOutline, personAddSharp, logInOutline, logInSharp, restaurantOutline, restaurantSharp, personOutline, personSharp } from 'ionicons/icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';

const loggedIn = [
    {
        title: 'Restaurants',
        url: '/restaurants',
        iosIcon: restaurantOutline,
        mdIcon: restaurantSharp
    },
    {
        title: 'Profile',
        url: '/profile',
        iosIcon: personOutline,
        mdIcon: personSharp
    },
];

const loggedOut = [
    {
        title: 'Restaurants',
        url: '/restaurants',
        iosIcon: restaurantOutline,
        mdIcon: restaurantSharp
    },
    {
        title: 'Sign in',
        url: '/signin',
        iosIcon: logInOutline,
        mdIcon: logInSharp
    },
    {
        title: 'Sign Up',
        url: '/signup',
        iosIcon: personAddOutline,
        mdIcon: personAddSharp
    }
];

const Menu = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();
    const location = useLocation();

    onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          console.log('Logged in');
        } else {
          // User is signed out
          console.log('Logged out');
        }
    })

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Menu</IonListHeader>
                    {
                        !user ?
                            loggedOut.map((page, index) => {
                                return (
                                    <IonMenuToggle key={index} autoHide={false}>
                                        <IonItem className={location.pathname === page.url ? 'selected' : ''} routerLink={page.url} routerDirection="none" lines="none" detail={false}>
                                            <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                                            <IonLabel>{page.title}</IonLabel>
                                        </IonItem>
                                    </IonMenuToggle>
                                );
                            }) :
                            loggedIn.map((page, index) => {
                                return (
                                    <IonMenuToggle key={index} autoHide={false}>
                                        <IonItem className={location.pathname === page.url ? 'selected' : ''} routerLink={page.url} routerDirection="none" lines="none" detail={false}>
                                            <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                                            <IonLabel>{page.title}</IonLabel>
                                        </IonItem>
                                    </IonMenuToggle>
                                );
                            })
                    }
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
