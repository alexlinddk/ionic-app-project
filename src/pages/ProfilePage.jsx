import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';
import MenuHeader from '../components/MenuHeader';
import { getAuth } from "firebase/auth";

const ProfilePage = () => {

  const auth = getAuth();
  const user = auth.currentUser;

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
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
