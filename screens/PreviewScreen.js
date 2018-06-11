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

class Carousel extends React.Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView

  render() {
    const { images } = this.props;
    let position = Animated.divide(this.scrollX, width);

    if (images && images.length) {
      return (
        <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            // the onScroll prop will pass a nativeEvent object to a function
            onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
              [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
            )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
            scrollEventThrottle={16} // this will ensure that this ScrollView's onScroll prop is called no faster than 16ms between each function call

          >
            {images.map((image,i) => (
              <Image key={i} style={styles.image} source={image.source} />
            ))}
          </ScrollView>
          <View
            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }} // this will layout our dots horizontally (row) instead of vertically (column)
          >
            {images.map((_, i) => { // the _ just means we won't use that parameter
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
              });
              return (
                <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                  key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                  style={{ opacity, height: 8, width: 8, backgroundColor: '#1f87e7', margin: 5, borderRadius: 5, marginTop:20 }}
                />
              );
            })}
          </View>
        </View>
      );
    }
    console.log('Please provide images');
    return null;
  }
}



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

  openUberApp(lat,lng){
    Linking.openURL(`https://m.uber.com/ul/?client_id=YFpM6-d9PMnEThO_GR_gCDSBRe3dA1wK&action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}pickup=my_location`);

  }






  renderImagesSlider(){
    return(
      <Slideshow
        dataSource={[
          { url:'https://urbansan.co.za/wp-content/uploads/2018/04/12885759_566989676801613_755505300045212006_o.jpg' },
          { url:'https://urbansan.co.za/wp-content/uploads/2018/04/12885759_566989676801613_755505300045212006_o.jpg' }
        ]}/>
    )
  }

  render() {
    const { params } = this.props.navigation.state;
    console.log('data', params['data']);
    const itemTitle = params ? params['data'].title.rendered : null;
    const imgUrl = params ? params['data']._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full'].source_url : null;
    const blurb = params ? params['data'].content.rendered : null;
    const category = params ? params['data']._embedded['wp:term'][0][0].name : null;
    const ticketLink = params ? params['data'].acf.ticketlink : null;
    const sliderImage2 = params ? params['data'].acf.image_2: null;
    const sliderImage3 = params ? params['data'].acf.image_3: null;
    const address =  params ? params['data'].acf.address: null;
    const dateTime =  params ? params['data'].acf.date_time: null;
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{backgroundColor: '#000', marginBottom: 2}}>
            <Carousel images={images} />
            {/*<ImageBackground*/}
              {/*style={{flex: 1, height: 250}}*/}
              {/*source={{uri: imgUrl}}*/}
              {/*resizeMode='cover'*/}
            {/*>*/}

            {/*</ImageBackground>*/}
          </View>
          <View style={{backgroundColor: '#000', padding: 20, paddingBottom: 20, paddingTop:5}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>{itemTitle}</Text>
            <Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>{category}</Text>
            {/*{this.renderImagesSlider()}*/}
          </View>
          <View style={{backgroundColor: '#fff', padding:20}}>
            <HTML html={blurb} {...DEFAULT_PROPS} />
            <Text style={{marginBottom:10}}>{dateTime}</Text>
            <Text style={{marginBottom:10}}>{address}</Text>

            <TouchableOpacity style={{marginBottom:10}} onPress={() => this.openWebBrowser(ticketLink)}>
              <Text style={styles.helpLinkText}>Get Tickets</Text>
            </TouchableOpacity>


          </View>
          <View>

            <TouchableOpacity style={{marginBottom:10}} onPress={() => this.openUberApp(latitude,longitude)}>
              <Text style={styles.helpLinkText}>UBER</Text>
            </TouchableOpacity>


          </View>
          <View>
            <MapView
              style={{ flex: 1, height:200, borderBottomWidth:20, borderBottomColor: '#fff' }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.00822,
                longitudeDelta: 0.00621,
              }}
            >

              <MapView.Marker
                coordinate={{latitude:latitude,longitude:longitude}}

              />


            </MapView>

          </View>
        </ScrollView>

      </View>
    );
  }

  openWebBrowser(link){
    WebBrowser.openBrowserAsync(link);
  }




  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'http://google.com'
    );
  };
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
