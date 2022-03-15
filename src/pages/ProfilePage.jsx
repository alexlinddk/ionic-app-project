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
  IonItem,
  IonList,
  IonIcon,
  IonRow,
  IonCol,
  IonGrid,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/react';
import MenuHeader from '../components/MenuHeader';
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { logOutOutline, brushOutline, createOutline } from 'ionicons/icons';
import { Toast } from "@capacitor/toast";
import './ProfilePage.css';

const ProfilePage = () => {
  const defaultPic = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';
  const auth = getAuth();
  const user = auth.currentUser;
  const history = useHistory();

  function handleSignOut() {
    auth.signOut();
    history.replace('/restaurants')
    Toast.show({
      text: "Signed in!"
    });
  }

  function goToReviews() {
    history.replace('/profile/reviews')
  }

  function editProfile() {
    history.replace('/profile/editing')
  }

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="Back" defaultHref="/restaurants"></IonBackButton>
        </IonButtons>
        <IonTitle>Profile</IonTitle>
      </IonToolbar>
      <IonContent fullscreen style={{ display: 'flex' }}>
        <IonCard>
          <IonCardHeader className='profile-style' style={{ padding: "50px 0px 15px 0px" }}>
            <IonAvatar>
              <IonImg src={defaultPic} />
            </IonAvatar>
          </IonCardHeader>
          <IonCardTitle className='profile-style' style={{ padding: "0px 0px 15px 0px" }}>{user ? user.email : 'Your email'}</IonCardTitle>
          <IonCardContent style={{ display: 'block' }}>
            <IonList>
              <IonItem>
                <IonGrid>
                  <IonRow style={{ padding: "10px 0px" }}>
                    <IonCol style={{ display: "flex", justifyContent: "flex-end" }}>
                      <IonIcon icon={createOutline} style={{ fontSize: "20px" }} />
                    </IonCol>
                    <IonCol size="6" style={{ display: "flex" }}>
                      <IonButton fill="clear" style={{ margin: "0 auto" }} onClick={goToReviews}>Your reviews</IonButton>
                    </IonCol>
                    <IonCol />
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonRow style={{ padding: "10px 0px" }}>
                    <IonCol style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                      <IonIcon icon={brushOutline} style={{ fontSize: "20px" }} />
                    </IonCol>
                    <IonCol size="6" style={{ display: "flex", alignItems: "center" }}>
                      <IonButton fill="clear" style={{ margin: "0 auto" }} onClick={editProfile}>Edit Profile</IonButton>
                    </IonCol>
                    <IonCol />
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonRow style={{ padding: "10px 0px" }}>
                    <IonCol style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                      <IonIcon icon={logOutOutline} style={{ fontSize: "20px" }} />
                    </IonCol>
                    <IonCol size="6" style={{ display: "flex" }}>
                      <IonButton onClick={handleSignOut} fill="clear" color="danger" style={{ margin: "0 auto" }}>Sign out</IonButton>
                    </IonCol>
                    <IonCol />
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
