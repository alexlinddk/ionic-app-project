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
  
  const appPages = [
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
    },
    {
      title: 'Sign out',
      url: '/signin',
      iosIcon: logOutOutline,
      mdIcon: logOutSharp
    }
  ];
  
  const Menu = () => {
    const location = useLocation();
  
    return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Menu</IonListHeader>
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default Menu;
  