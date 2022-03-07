import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import MenuHeader from "../components/MenuHeader";

export default function SignInPage() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const auth = getAuth();

    function handleSubmit(event) {
        event.preventDefault();
        signInWithEmailAndPassword(auth, mail, password).then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
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
        }).catch(error => { console.log(error) })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign In</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <form onSubmit={handleSubmit}>
                    <IonItem>
                        <IonLabel position="stacked">Mail</IonLabel>
                        <IonInput
                            value={mail}
                            type="email"
                            placeholder="Type your mail"
                            onIonChange={e => setMail(e.target.value)}
                        />
                    </IonItem>
                    <IonItem>
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
                            Sign in
                        </IonButton>
                    </div>
                    <div className="ion-text-center">
                        <IonButton size="small" fill="clear" onClick={() => history.replace("/signup")}>
                            Sign Up
                        </IonButton>
                    </div>
                    <div className="ion-text-center">
                        <IonButton size="small" fill="clear" onClick={() => history.replace("/restaurants")}>
                            Continue as guest
                        </IonButton>
                    </div>
                </form>
            </IonContent>
        </IonPage>
    );
}
