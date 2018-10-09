import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
  Dimensions,
  Animated,
  Linking
} from 'react-native';
import { WebBrowser } from 'expo';
import HTML from 'react-native-render-html';
//import { MapView, Marker } from 'expo';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps'

//import Slideshow from 'react-native-slideshow';


import { MonoText } from '../components/StyledText';


const { width } = Dimensions.get('window');
const height = width * 0.8;



export default class PreviewScreen extends React.Component {
  constructor(props){
  super(props);
  this.state ={ isLoading: true}
}
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: null,
      headerStyle: {
        backgroundColor: '#000',
        borderBottomWidth: 0,
        shadowRadius: 0,
        shadowOffset: {height: 0}
      },
      headerLeft:<Button onPress={()=>navigation.goBack()}
      title='Back'
      />
    }

  }





  render() {
    const { params } = this.props.navigation.state;
    console.log('data', params['data']);
   // const itemTitle = params ? params['data'].title.rendered : null;
    //const imgUrl = params ? params['data']._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'].source_url : null;
    //const blurb = params ? params['data'].content.rendered : null;
    //const category = params ? params['data']._embedded['wp:term'][0][0].name : null;
    //const ticketLink = params ? params['data'].acf.ticketlink : null;
    //const sliderImage2 = params ? params['data'].acf.image_2: null;
   // const sliderImage3 = params ? params['data'].acf.image_3: null;
   // const address =  params ? params['data'].acf.address: null;
   // const dateTime =  params ? params['data'].acf.date_time: null;
    const longitude =  params ? parseFloat(params['data'].acf.longitude): null;
    const latitude =  params ? parseFloat(params['data'].acf.latitude): null;
    const uberLink =  params ? params['data'].acf.latitude: null;


    const markers = [
      {
        latitude: latitude,
        longitude: longitude,
        title: 'Foo Place',
        subtitle: address
      }
    ];


    const images = [
      {
        source: {
          uri: imgUrl,
        },
      },
      {
        source: {
          uri: sliderImage2,
        },
      }
    ];


    const tagsStyles ={ p: { color: 'grey', marginBottom:10 } };
    const DEFAULT_PROPS = {
      tagsStyles: tagsStyles
    };


    return (
      <View style={styles.container}>
        <View>

          </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {

  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  scrollContainer: {
    height,
  },
  image: {
    width,
    height,
  },
});
