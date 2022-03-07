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
import { personAddOutline, personAddSharp, logInOutline, logInSharp, restaurantOutline, restaurantSharp, personOutline, personSharp, logOutOutline, logOutSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { getAuth } from "firebase/auth";

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
    {
        title: 'Sign out',
        url: '/signin',
        iosIcon: logOutOutline,
        mdIcon: logOutSharp
    }
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
    const location = useLocation();
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Menu</IonListHeader>
                    {
                        !user ?
                            loggedOut.map((page, index) => {
                                return (
                                    <IonMenuToggle key={index} autoHide={false} onClick={() => { page.title == 'Sign out' && auth.signOut() }}>
                                        <IonItem className={location.pathname === page.url ? 'selected' : ''} routerLink={page.url} routerDirection="none" lines="none" detail={false}>
                                            <IonIcon slot="start" ios={page.iosIcon} md={page.mdIcon} />
                                            <IonLabel>{page.title}</IonLabel>
                                        </IonItem>
                                    </IonMenuToggle>
                                );
                            }) :
                            loggedIn.map((page, index) => {
                                return (
                                    <IonMenuToggle key={index} autoHide={false} onClick={() => { page.title == 'Sign out' && auth.signOut() }}>
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
