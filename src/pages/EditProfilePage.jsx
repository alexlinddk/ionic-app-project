import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Toast } from "@capacitor/toast";
import { camera } from "ionicons/icons";
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonLoading
} from "@ionic/react";
import MenuHeader from "../components/MenuHeader";
import { getAuth } from "firebase/auth";
import { storage, usersRef } from "../firebaseConfig";
import { push, ref, set } from "firebase/database";
import { getDownloadURL, uploadString } from "firebase/storage";
import { useHistory } from "react-router";

const EditProfilePage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState({});
    const [showLoader, dismissLoader] = useIonLoading();

    const defaultPic = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';

    const auth = getAuth();
    const user = auth.currentUser;
    const history = useHistory();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setImage(user.image);
        }
    }, [user]);

    function submitEvent(event) {
        event.preventDefault();
        const formData = { name: name, email: email, password: password, image: imageFile };
        handleSubmit(formData);
    }

    async function uploadImage(imageFile, userKey) {
        const newImageRef = ref(storage, `${userKey}.${imageFile.format}`);
        await uploadString(newImageRef, imageFile.dataUrl, "data_url");
        const url = await getDownloadURL(newImageRef);
        return url;
    }

    async function takePicture() {
        const imageOptions = {
            quality: 80,
            width: 500,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        };
        const image = await Camera.getPhoto(imageOptions);
        setImageFile(image);
        setImage(image.dataUrl);
    }

    async function handleSubmit(editedUser) {
        showLoader();
        editedUser.uid = auth.currentUser.uid;
        const newUserRef = push(usersRef);
        const newUserkey = newUserRef.key; // key from reference
        const imageUrl = await uploadImage(editedUser.image, newUserkey);
        editedUser.image = imageUrl;
        set(newUserRef, editedUser)
            .then(() => {
                history.replace("/profile");
                Toast.show({
                    text: "Profile updated!"
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dismissLoader();
            });
    }

    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton text="Back" defaultHref="/profile"></IonBackButton>
                </IonButtons>
                <IonTitle>Edit profile</IonTitle>
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
                        <form onSubmit={submitEvent}>
                            <IonList>
                                <IonItem>
                                    <IonLabel position="stacked">Name</IonLabel>
                                    <IonInput
                                        value={name}
                                        placeholder="Enter your name"
                                        onIonChange={e => setName(e.target.value)}
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Email</IonLabel>
                                    <IonInput
                                        value={email}
                                        placeholder="Change your email"
                                        onIonChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Password</IonLabel>
                                    <IonInput
                                        type="password"
                                        value={password}
                                        placeholder="Change your password"
                                        onIonChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </IonItem>
                                <IonItem onClick={takePicture} lines="none">
                                    <IonLabel>Choose Image</IonLabel>
                                    <IonButton>
                                        <IonIcon slot="icon-only" icon={camera} />
                                    </IonButton>
                                </IonItem>
                                {image && <IonImg className="ion-padding" src={image} onClick={takePicture} />}

                                <div className="ion-padding">
                                    {image && name && email && password ? (
                                        <IonButton expand="block">Save</IonButton>
                                    ) : (
                                        <IonButton type="submit" expand="block" disabled>
                                            Save
                                        </IonButton>
                                    )}
                                </div>
                            </IonList>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default EditProfilePage