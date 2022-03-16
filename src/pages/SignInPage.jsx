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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Toast } from "@capacitor/toast";

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
        })
            .catch(error => { console.log(error) })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            history.replace(`restaurants`);
            console.log('Logged in!');
            Toast.show({ text: "Signed in!" })
        } else {
            // User is signed out
            console.log('Logged out!');
            Toast.show({ text: "Signed out!" })
        }
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/restaurants"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Sign In</IonTitle>
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
                            Sign in
                        </IonButton>
                    </div>
                    <div className="ion-text-center">
                        <IonButton size="small" fill="clear" onClick={() => history.replace("/signup")}>
                            Don't have a account?
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
