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
  IonIcon,
  IonRow,
  IonCol,
  IonGrid,
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
          <IonCardHeader className='profile-style' style={{padding: "50px 0px 15px 0px"}}>
            <IonAvatar>
              <IonImg src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" />
            </IonAvatar>
          </IonCardHeader>
          <IonCardTitle className='profile-style' style={{padding: "0px 0px 15px 0px"}}>{user ? user.email : 'Your email'}</IonCardTitle>
          <IonCardContent style={{ display: 'block' }}>
            <IonList>
              <IonItem>
                <IonGrid>
                  <IonRow style={{padding: "10px 0px"}}>
                    <IonCol style={{ "display": "flex", "justify-content": "flex-end" }}>
                      <IonIcon icon={createOutline} style={{"font-size": "20px"}} />
                    </IonCol>
                    <IonCol size="6" style={{ "display": "flex" }}>
                      <IonButton fill="clear" style={{ "margin": "0 auto" }}>Your reviews</IonButton>
                    </IonCol>
                    <IonCol />
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonRow style={{padding: "10px 0px"}}>
                    <IonCol style={{ "display": "flex", "justify-content": "flex-end", "align-items": "center"}}>
                      <IonIcon icon={brushOutline} style={{"font-size": "20px"}} />
                    </IonCol>
                    <IonCol size="6" style={{ "display": "flex", "align-items": "center"}}>
                      <IonButton fill="clear" style={{ "margin": "0 auto" }}>Edit Profile</IonButton>
                    </IonCol>
                    <IonCol />
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonGrid>
                  <IonRow style={{padding: "10px 0px"}}>
                    <IonCol style={{ "display": "flex", "justify-content": "flex-end", "align-items": "center"}}>
                      <IonIcon icon={logOutOutline} style={{"font-size": "20px"}} />
                    </IonCol>
                    <IonCol size="6" style={{ "display": "flex" }}>
                      <IonButton onClick={handleSignOut} fill="clear" color="danger" style={{ "margin": "0 auto" }}>Sign out</IonButton>
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
