import React from 'react';
import { ScrollView, StyleSheet, FlatList, ActivityIndicator, Text, View, Image, ImageBackground, TouchableHighlight,RefreshControl, Button, Vibration  } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import HTML from 'react-native-render-html';

export default class LinksScreen extends React.Component {


  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      refreshing: false,
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


  getPostImageFromID(url){
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.guid.rendered;
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  componentDidMount(){
    return fetch('https://urbansan.co.za/wp-json/wp/v2/posts?_embed')
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

  navigateToScreen = (item) => {
    this.props.navigation.navigate('Preview',{data:item})
    Vibration.vibrate(300);
  }

  goTopMap(){
    this.props.navigation.navigate('MapScreen')
  }



  static navigationOptions = {
    title: 'THIS WEEK',
    headerRight: (
      <Button
        onPress={{}}
        title="Map"
        color="#fff"
      />
    ),
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
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <ScrollView style={{backgroundColor:'#000'}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }

        >

          {listArray.map((item,index) => {


              let imgUrl = (item._embedded['wp:featuredmedia'][0]['media_details']['sizes']['full']).source_url;
            let category = `${item._embedded['wp:term'][0][0]['name']}`;
            let title = item.title.rendered;
            const giffy = item['acf']['giffy'] ? item['acf']['giffy'] : null;


            if (giffy != null){
              imgUrl = giffy;
              title = '';

            }


            return (
              <TouchableHighlight key={index} onPress={() => this.navigateToScreen(item)}>
                <View key={index} style={{backgroundColor: '#000', marginBottom: 6}}>
                <ImageBackground
                  style={{flex: 1, height: 210, opacity:0.9}}
                  source={{uri: imgUrl}}
                  resizeMode='cover'
                >
                  <View style={{position: 'absolute', top: 0, left:0, right: 0, bottom:0, backgroundColor:'#000', opacity:0.2}} ></View>
                  <HTML html={category} {...DEFAULT_PROPS}  />
                  <Text style={{color: '#fff', position: 'absolute', bottom:5, textAlign: 'center', flex: 1, fontSize: 21, left:5}}>{title}</Text>
                </ImageBackground>
                </View>
              </TouchableHighlight>
            )
          })}

          <View style={{backgroundColor: '#000'}} >

          </View>

          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <HTML html={item.title.rendered} />}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
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

