import {
  IonAvatar,
  IonContent,
  IonPage,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  IonTitle,
  IonItem,
  IonList,
  IonIcon
} from '@ionic/react';
import MenuHeader from '../components/MenuHeader';
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { logOutOutline, brushOutline, createOutline } from 'ionicons/icons';
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
          <IonCardHeader>
            <IonAvatar style={{ margin: "0 auto" }}>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-b84hwJczLWg%2FT5PXRya3B5I%2FAAAAAAAAAww%2FK_9ofAytKhs%2Fs1600%2F11c-johansson292.jpg&f=1&nofb=1" />
            </IonAvatar>
          </IonCardHeader>
          <IonCardContent style={{ display: 'block' }}>
            <IonList>
              <IonItem>
                <IonCardTitle style={{ margin: "0 auto" }}>{user ? user.email : 'Your name'}</IonCardTitle>
              </IonItem>
              <IonItem>
                <IonIcon icon={createOutline} slot="start" />
                <IonButton fill="clear">Your reviews</IonButton>
              </IonItem>
              <IonItem>
                <IonIcon icon={brushOutline} slot="start" />
                <IonButton fill="clear">Edit Profile</IonButton>
              </IonItem>
              <IonItem>
                <IonIcon icon={logOutOutline} slot="start" />
                <IonButton onClick={handleSignOut} fill="clear" color="danger" >Sign out</IonButton>
              </IonItem>
            </IonList>
            <IonCardHeader className='profile-style'>
              <IonAvatar>
                <IonImg src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
              </IonAvatar>
            </IonCardHeader>
            <IonCardTitle className='profile-style'>{user ? user.email : 'Your email'}</IonCardTitle>
            <IonButton onClick={handleSignOut} expand="block">Sign out</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
