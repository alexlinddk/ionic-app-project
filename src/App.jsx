import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { restaurant, person } from 'ionicons/icons';
import ProfilePage from './pages/ProfilePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailView from './pages/RestaurantDetailView';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>

        <IonRouterOutlet>
          <Route exact path="/restaurants">
            <RestaurantsPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/restaurants/:id">
            <RestaurantDetailView />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/restaurants" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="RestaurantsPage" href="/restaurants">
            <IonIcon icon={restaurant}></IonIcon>
            <IonLabel>Restaurants</IonLabel>
          </IonTabButton>
          <IonTabButton tab="ProfilePage" href="/profile">
            <IonIcon icon={person}></IonIcon>
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>

      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
