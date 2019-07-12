import React from 'react';
import MapView from 'react-native-maps';

export default class MapComponent extends React.Component {
    constructor(){
        super();
        this.state={
            latitude:25.5937,
            longitude:77.9629,
            latitudeDelta: 20,
            longitudeDelta: 20,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.markerArray.length>0){ //for search value matches more than one region
                console.log("coming here @positive")
                if(nextProps.markerArray.length==1){ // for exactly one region to zoom in
                let {latitude,longitude,latitudeDelta,longitudeDelta} = nextProps.markerArray[0];
                this.setState({
                        latitude:latitude,
                        longitude:longitude,
                        latitudeDelta:latitudeDelta,
                        longitudeDelta:longitudeDelta
                    })
                }
                else{ // for many region
                    this.setState({
                        latitude:25.5937,
                        longitude:77.9629,
                        latitudeDelta: 20,
                        longitudeDelta: 20,
                    })
                }
            }
            else{ // for  no region 
                this.setState({
                    latitude:25.5937,
                    longitude:77.9629,
                    latitudeDelta: 20,
                    longitudeDelta: 20,
                })
            }
        }
        
    
    render() {
        return (
            <MapView style={{ flex: 1 }}
                provider={"google"}
                region={
                    {
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta
                    }
                }
            >
                {
                    this.props.markerArray.map((item, key) => {
                        return <MapView.Marker
                            ref={(ref) => { this.mapRef = ref }}
                            key={key}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                        }}
                            title={item.location}
                        />
                    })
                }
            </MapView>
        )
    }
}