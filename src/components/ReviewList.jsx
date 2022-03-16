import { IonList } from "@ionic/react";
import ReviewListitem from "./ReviewListItem";

const ReviewList = ({ reviews }) => {
    return (
        <IonList>
            {reviews.map(review => {
                <ReviewListitem key={review.id} review={review} />
            })}
        </IonList>
    );
}

export default ReviewList;