import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ImageBackground
} from 'react-native';

import Weekdays from '../constants/Weekdays'


export default class LeftMenu extends React.Component {

  render(){
    const days = Weekdays.weekdays.map((day,index)=>{
      return <View style={{padding: 18, backgroundColor: '#000', borderWidth: 3, borderColor: '#fff', borderRadius:50, margin:10, marginLeft:17, marginRight:17}} ><Text style={{color:'#fff', textAlign: 'center'}}>{day}</Text></View>
    });

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {days}
      </View>
    )
  }


}