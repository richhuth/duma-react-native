import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';

import LeftMenu from '../components/LeftMenu';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/auth/LoginScreen';

import SettingsScreen from '../screens/SettingsScreen';
import Drawer from '../screens/Drawer';






const MyTabNavigator =TabNavigator(
  {
    Home: {
      screen:LinksScreen ,
    },
    Links: {
      screen: HomeScreen ,
    },
    Settings: {
      screen: LoginScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        backgroundColor: '#000',
        paddingTop:3
      }
    }
  }

);

const MondayScreen = ({ navigation }) => (
  <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
);
MondayScreen.navigationOptions = {
  drawerLabel: 'Mon',
  screen:  LinksScreen
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

navigateToScreen = (item) => {
  this.props.navigation.navigate('Category',{data:item})
}

const MyDrawerNavigator = DrawerNavigator({
  Main: { screen: MyTabNavigator},
    Monday: {path: '/', screen: LinksScreen, drawerLabel: 'Mon'},
    Tuesday: {
      path: '/sent',
      screen:MondayScreen,
    },
    Wednesday: {
      path: '/sent',
      screen: LinksScreen,
    },
    Thursday: {
      path: '/sent',
      screen: LinksScreen,
    },
    Friday: {
      path: '/sent',
      screen: LinksScreen,
    },
    Saturday: {
      path: '/sent',
      screen: LinksScreen,
    },
    Sunday: {
      path: '/sent',
      screen: LinksScreen,
    },
  },
  {
    initialRouteName: 'Main',
    contentOptions: {
      activeTintColor :'#fff',
      inactiveTintColor :'#000',

      activeBackgroundColor :'#000',
      inactiveBackgroundColor :'#ffffff',


    },
    drawerWidth: 110,
    contentComponent: LeftMenu,
    drawerBackgroundColor: "black",
  },
);




export default MyDrawerNavigator;





