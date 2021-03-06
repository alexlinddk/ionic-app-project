import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonSplitPane,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ProfilePage from './pages/ProfilePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDetailView from './pages/RestaurantDetailView';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Menu from './components/Menu';
import RestaurantReviewsPage from './pages/RestaurantReviewsPage'
import UserReviewsPage from './pages/UserReviewsPage';
import { app } from './firebaseConfig'

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
import EditProfilePage from './pages/EditProfilePage';
import AddReview from './pages/AddReview';
import EditReviewPage from './pages/EditReviewPage';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
            <Redirect to="/restaurants" />
          </Route>
          <Route path="/restaurants" exact={true}>
            <RestaurantsPage />
          </Route>
          <Route path="/restaurants/:id" exact={true}>
            <RestaurantDetailView />
          </Route>
          <Route path="/restaurants/reviews/:id" exact={true}>
            <RestaurantReviewsPage />
          </Route>
          <Route path="/restaurants/reviews/add/:id" exact={true}>
            <AddReview />
          </Route>
          <Route path="/profile/reviews" exact={true}>
            <UserReviewsPage />
          </Route>
          <Route path="/profile/reviews/:id" exact={true}>
            <EditReviewPage />
          </Route>
          <Route path="/profile/editing" exact={true}>
            <EditProfilePage />
          </Route>
          <Route exact path="/signin">
            <SignInPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
