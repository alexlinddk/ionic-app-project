import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewListItem from "../components/ReviewListItem";
import { getUserRef, reviewsRef } from "../firebaseConfig";
import { onValue, query, orderByChild, equalTo, get } from "firebase/database";
import {
  IonBackButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonLabel, 
  IonList, 
  IonListHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar
} from "@ionic/react";
import { getAuth } from "firebase/auth";

const UserReviewsPage = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    async function getUserDataOnce() {
      const snapshot = await get(getUserRef(currentUser.uid));
      const userData = snapshot.val();

      setUser({
        id: userId,
        ...userData
      });
      return userData;
    }

    async function listenOnChange() {
      const reviewsByUserId = query(reviewsRef, orderByChild("user/email"), equalTo(currentUser.email));
      const userData = await getUserDataOnce();

      onValue(reviewsByUserId, async snapshot => {
        const reviewsArray = [];

        snapshot.forEach(reviewSnapshot => {
          const uid = reviewSnapshot.key;
          const data = reviewSnapshot.val();
          const review = {
            uid,
            ...data,
            user: userData
          };
          reviewsArray.push(review);
        });

        setReviews(reviewsArray.reverse());
      });
    }

    listenOnChange();
  }, [currentUser.uid]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/profile"></IonBackButton>
          </IonButtons>
          <IonTitle>{user?.name ? user.name : "Unknown User Name"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>{reviews.length ? "Users Reviews" : "No reviews yet"}</IonLabel>
          </IonListHeader>
          {reviews.map(review => (
            <ReviewListItem review={review} key={review.id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default UserReviewsPage