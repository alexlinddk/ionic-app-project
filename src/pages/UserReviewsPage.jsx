import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter,
    IonIcon,
    useIonLoading
} from "@ionic/react";
import ReviewList from "../components/ReviewList";
import { Toast } from "@capacitor/toast";
import { getUserRef, reviewsRef } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { equalTo, onValue, orderByChild, push, query, set, get } from "firebase/database";
import { add } from "ionicons/icons";

const UserReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState([]);
    const [showLoader, dismissLoader] = useIonLoading();

    // const history = useHistory();
    // const params = useParams();
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    useEffect(() => {
        async function getUserDataOnce() {
            const snapshot = await get(getUserRef(userId));
            console.log(userId);
            const userData = snapshot.val();
            console.log(userData);
            setUser({
                uid: userId,
                ...userData
            });
            return userData;
        }

        async function listenOnChange() {
            showLoader();

            const reviewsByUserId = query(reviewsRef, orderByChild("userId"), equalTo(userId));
            const userData = await getUserDataOnce();
            console.log(userData);
            console.log(userId);

            onValue(reviewsByUserId, async snapshot => {
                const reviewsArray = [];
                snapshot.forEach(reviewSnapshot => {
                    const uid = reviewSnapshot.key;
                    const data = reviewSnapshot.val();
                    const review = {
                        uid,
                        ...data,
                        userId: userId
                    };
                    reviewsArray.push(review);
                    console.log(reviewsArray);
                });
                setReviews(reviewsArray.reverse());
            });
            dismissLoader();
        }
        listenOnChange();

    }, [userId]);

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Back" defaultHref="/profile"></IonBackButton>
                    </IonButtons>
                    <IonTitle>Reviews</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonListHeader>
                    <IonLabel>{reviews.length ? "User Reviews" : "No reviews yet"}</IonLabel>
                </IonListHeader>
                <ReviewList reviews={reviews} />
            </IonContent>
        </IonPage>
    );
}

export default UserReviewsPage;