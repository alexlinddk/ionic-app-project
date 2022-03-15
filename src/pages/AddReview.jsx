import {
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTextarea
} from "@ionic/react"
import { useState } from "react";

const AddReview = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [showLoader, dismissLoader] = useIonLoading();

    function submitEvent(event) {
        event.preventDefault();
        const formData = { title: title, body: body };
        handleSubmit(formData);
    }
    return (
        <form onSubmit={submitEvent}>
            <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                    value={title}
                    placeholder="Type the title of your review"
                    onIonChange={e => setTitle(e.target.value)}
                    required
                />
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonTextarea
                    value={body}
                    placeholder="Tell us about your experience"
                    onIonChange={e => setBody(e.target.value)}
                    required
                />
            </IonItem>

            <div className="ion-padding">
                {title && body ? (
                    <IonButton expand="block">Save</IonButton>
                ) : (
                    <IonButton type="submit" expand="block" disabled>
                        Save
                    </IonButton>
                )}
            </div>
        </form>
    )
}

export default AddReview