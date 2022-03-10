import { IonImg, IonList, IonText, IonItem, IonTitle } from "@ionic/react";
import MenuItem from "./MenuListItem"

const MenuList = ({ menuItems }) => {
    return (
        <IonList>
            {menuItems.map(item => (
                <MenuItem item={item} />
            ))}
        </IonList>
    );
}

export default MenuList;