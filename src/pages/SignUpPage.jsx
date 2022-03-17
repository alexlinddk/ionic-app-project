import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function SignUpPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const auth = getAuth();

    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, mail, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
            }).catch(error => { console.log(error) })
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            history.push(`restaurants`);
            console.log('Logged in');
        } else {
            // User is signed out
            console.log('Logged out');
        }
    });
    
    return (
        <IonPage className="posts-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/restaurants"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Sign Up</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <IonItem style={{margin: '10px 0px', borderRadius: '7px'}}>
                        <IonLabel position="stacked">Mail</IonLabel>
                        <IonInput
                            value={mail}
                            type="email"
                            placeholder="Type your mail"
                            onIonChange={e => setMail(e.target.value)}
                        />
                    </IonItem>
                    <IonItem style={{margin: '10px 0px', borderRadius: '7px'}}>
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput
                            value={password}
                            type="password"
                            placeholder="Type your password"
                            onIonChange={e => setPassword(e.target.value)}
                        />
                    </IonItem>
                    <div className="ion-padding">
                        <IonButton type="submit" expand="block">
                            Sign up
                        </IonButton>
                    </div>
                    <div className="ion-text-center">
                        <IonButton size="small" fill="clear" onClick={() => history.replace("/signin")}>
                            Already have an account?
                        </IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
}
