import { IonList } from "@ionic/react";
import ReviewListitem from "./ReviewListItem";

const ReviewList = ({ reviews }) => {
    console.log('Hej fra reviewlist');
    console.log(reviews);
    return (
        <IonList>
            {reviews.map(review => {
                return <ReviewListitem key={review.id} review={review} />
            })}
        </IonList>
    );
}

export default ReviewList;