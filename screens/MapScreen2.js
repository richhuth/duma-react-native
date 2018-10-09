import React from 'react';
import { ScrollView, StyleSheet, FlatList, ActivityIndicator, Text, View, Image, ImageBackground, TouchableHighlight,RefreshControl, Button  } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HTML from 'react-native-render-html';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Marker from 'react-native-maps'

import mapStyle from '../constants/map.json';


import testImg from '../assets/images/categoryPics/exhibitions.jpg'




export default class CategoryScreen extends React.Component {


  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      refreshing: false,
      previewTitle:'',
      previewText:'',
      previewImage:''
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetch('https://urbansan.co.za/wp-json/wp/v2/posts?_embed')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          dataSource: responseJson,
        });
      }).catch((error) =>{
      console.error(error);
    });
  }




  componentDidMount(){

    //const categoryID = this.props.navigation.state.params[0];
    return fetch(`https://urbansan.co.za/wp-json/wp/v2/posts?_embed`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

  }

  static navigationOptions = {
    title: 'MAP',
  };

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20, backgroundColor:'#000', justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator/>
        </View>
      )
    }

    const listArray = this.state.dataSource;

    const tagsStyles ={ p: { color: 'grey' } };
    const containerStyle = {backgroundColor: 'black',position: 'absolute', right:6, padding:8, paddingRight: 16, paddingLeft:16};
    const baseFontStyle = {color:'white', fontFamily: 'cornerstone'};
    const DEFAULT_PROPS = {
      tagsStyles: tagsStyles,
      containerStyle: containerStyle,
      baseFontStyle: baseFontStyle

    };

    return(

      <View style={{flex:1}}>

          <MapView

            customMapStyle={mapStyle}
            style={{ borderBottomWidth:20, borderBottomColor: '#fff', flex:1 }}
            initialRegion={{
              latitude: parseFloat(-33.918861),
              longitude: parseFloat(18.423300),
              latitudeDelta: 0.0252,
              longitudeDelta: 0.01921,
            }}


          >
            {listArray.map((item,index) => {
              const longitude =  item ? parseFloat(item.acf.longitude): null;
              const latitude =  item ? parseFloat(item.acf.latitude): null;
              if (latitude) {
                return (
                  <MapView.Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                    pinColor = '#000'
                    flat
                    title="sdasd"
                    description="dasd"
                  >

                  </MapView.Marker>
                )
              }


            })}

        </MapView>

        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#000',
          margin:15,
          borderRadius:5,
          padding:12,
          flexDirection: 'row'
        }}

        >
          <View>
          <Image style={{height:60, width:80, marginRight:12}} source={testImg} />
          </View>
          <View>
          <Text style={{color:'#fff', flex: 1, flexWrap: 'wrap',width: '65%',}}>
            Warmblooded – A solo exhibition by
            Katrin Coetzerr

          </Text>
          <Text style={{color:'#000', padding:2, backgroundColor: '#fff',  alignSelf: 'flex-start', fontSize:11,fontFamily: 'cornerstone'}}>
            Exhibitions
          </Text>
          </View>

        </View>
      </View>

    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });

