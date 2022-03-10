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
import './ProfilePage.css';

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
          <IonCardHeader className='profile-style'>
            <IonAvatar>
              <IonImg src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
            </IonAvatar>
          </IonCardHeader>
          <IonCardContent>
            <IonCardTitle className='profile-style'>{user ? user.email : 'Your email'}</IonCardTitle>
              <IonButton onClick={handleSignOut} expand="block">Sign out</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
