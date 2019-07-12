import React from 'react';
import { View, TextInput, Dimensions,Alert } from 'react-native';
import MapComponent from './MapComponent';
import { markerArray } from './marker.json';
const {width,height} = Dimensions.get('window');

export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      markerArray : markerArray
    }
  }
  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <MapComponent markerArray={this.state.markerArray} />
        <TextInput
          placeholder={"Search Region"}
          ref = {inp => {this.textinput = inp}}
          onChangeText = { text => this.findPlaces(text)}
          style={{
            height:height*0.08,
            width:width*0.8,
            backgroundColor:'white',
            borderRadius:40,
            position:'absolute',
            top:45,
            left:45,
            padding:15,
            borderColor:(this.state.markerArray.length===0) ? 'red' : 'black',
            borderWidth:2
          }}
        />
      </View>
    );
  }

  findPlaces(text){
    let array = [];
    for(item of markerArray){
      if(item.location.toUpperCase().includes(text.toUpperCase())){
        array.push({...item,
          latitudeDelta: 1,
          longitudeDelta: 1,
        });
      }
    };
     this.setState({
       markerArray:array
     });
  }
}