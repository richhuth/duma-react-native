/**
 * @flow
 */

import React from 'react';
import { Button, Platform, ScrollView, StyleSheet } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MainTabNavigator from '../navigation/MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinksScreen from '../screens/LinksScreen';

const MyNavScreen = ({ navigation, banner }) => (



  <ScrollView style={styles.container}>
    <Button
      onPress={() => navigation.navigate('DrawerOpen')}
      title="Open drawer"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MondayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
);
MondayScreen.navigationOptions = {
  drawerLabel: 'Mon',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons
  //     name="move-to-inbox"
  //     size={24}
  //     style={{ color: tintColor }}
  //   />
  // ),
};

const TuesdayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
TuesdayScreen.navigationOptions = {
  drawerLabel: 'Tue',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const WednesdayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
WednesdayScreen.navigationOptions = {
  drawerLabel: 'Wed',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const ThursdayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
ThursdayScreen.navigationOptions = {
  drawerLabel: 'Thu',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const FridayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
FridayScreen.navigationOptions = {
  drawerLabel: 'Fri',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const SaturdayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
SaturdayScreen.navigationOptions = {
  drawerLabel: 'Sat',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const SundayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
SundayScreen.navigationOptions = {
  drawerLabel: 'Sun',
  // drawerIcon: ({ tintColor }) => (
  //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  // ),
};

const DrawerExample = DrawerNavigator(


  {
    Monday: {
      path: '/',
      screen: MondayScreen,
    },
    Tuesday: {
      path: '/sent',
      screen: TuesdayScreen,
    },
    Wednesday: {
      path: '/sent',
      screen: WednesdayScreen,
    },
    Thursday: {
      path: '/sent',
      screen: ThursdayScreen,
    },
    Friday: {
      path: '/sent',
      screen: FridayScreen,
    },
    Saturday: {
      path: '/sent',
      screen: SaturdayScreen,
    },
    Sunday: {
      path: '/sent',
      screen: SundayScreen,
    },
  },
  {
    initialRouteName: 'Monday',
    contentOptions: {
      activeTintColor :'#fff',
      inactiveTintColor :'#000',

      activeBackgroundColor :'#000',
      inactiveBackgroundColor :'#ffffff'

    },
    drawerWidth: 80
  },
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default DrawerExample;
