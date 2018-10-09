import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Preview from '../screens/PreviewScreen';
import DrawScreen from '../screens/Drawer';
import LoginScreen from '../screens/LinksScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MapScreen from '../screens/MapScreen';


import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: { screen: MainTabNavigator,},
    Preview: { screen: Preview},
    Draw: { screen: DrawScreen},
    Login: {screen : LoginScreen},
    Signup: {screen: SignupScreen},
    ForgotPassword: {screen: ForgotPasswordScreen},
    Category: {screen: CategoryScreen},
    MapScreen: {screen: MapScreen}
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
        color: '#ececec'
      },
      headerStyle:{
        backgroundColor: '#000',
        borderBottomWidth:0,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
      }
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
