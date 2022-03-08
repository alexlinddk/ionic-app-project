import {
  IonAvatar,
  IonContent,
  IonPage,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton
} from '@ionic/react';
import MenuHeader from '../components/MenuHeader';
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

const ProfilePage = () => {

  const auth = getAuth();
  const user = auth.currentUser;
  const history = useHistory();

  function handleSignOut() {
    auth.signOut();
    history.replace('/restaurants')
  }

  return (
    <IonPage>
      <MenuHeader title="Profile" />
      <IonContent fullscreen style={{ display: 'flex' }}>
        <IonCard>
          <IonCardHeader>
            <IonAvatar>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-b84hwJczLWg%2FT5PXRya3B5I%2FAAAAAAAAAww%2FK_9ofAytKhs%2Fs1600%2F11c-johansson292.jpg&f=1&nofb=1" />
            </IonAvatar>
          </IonCardHeader>
          <IonCardContent>
            <IonCardTitle>{user ? user.email : 'Your name'}</IonCardTitle>
              <IonButton onClick={handleSignOut} expand="block">Sign out</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
