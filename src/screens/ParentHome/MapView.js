// // Integration of Google map in React Native using react-native-maps
// // https://aboutreact.com/react-native-map-example/

// // Import React
// import React, { useState,useEffect } from 'react';
// // Import required components
// import {SafeAreaView, StyleSheet, View , Text,RefreshControl,} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// // Import Map and Marker
// import MapView, {Marker} from 'react-native-maps';
// import database from '@react-native-firebase/database';
// const wait = (timeout) => {
//   return new Promise(resolve => setTimeout(resolve, timeout));
// }
// const MapCommponent = () => {
//     const [latitude,setlatituden] = useState(0.00);
//     const [longitude,setlongitude] = useState(0.00);
//     const [ID,setID] = useState('SChsXVVaK3ZXSxUs5DE8ANPi8NG2');
//     const [refreshing, setRefreshing] = React.useState(false);
//     useEffect(() => {
//       console.log("useEffect")
//         database()
//             .ref('Location')
//       .orderByChild('UserId')
//       .equalTo(ID)    
//       .once('value')
//       .then(snapshot => {
//         // console.log('User data: ', snapshot.val());
//         let array = snapshot.val()
//         let val=Object.values(array)
//         console.log("Map Array Object",val.map(ls=>ls.longitude))
//         var Lon=val.map(ls=>ls.longitude)
//         var Long=Lon.toString().replace(/^\s+|\s+$/g,'')
//         console.log("After Convert",Long)
//         var Lat=val.map(ls=>ls.latitude)
//         var Lati=Lat.toString().replace(/^\s+|\s+$/g,'')
//         console.log("After Convert",Lati)
//         setlatituden(Lati)
//         setlongitude(Long)
//       });
//     },[refreshing]);
//     const onRefresh = React.useCallback(() => {
//       setRefreshing(true);
//       wait(2000).then(() => setRefreshing(false));
//     }, []);
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       {console.log('latitude in render',latitude)}
//       {console.log('longitude in render',longitude)}
//       <View style={styles.container}>
//         <MapView
//           style={styles.mapStyle}
//           initialRegion={{
//             latitude: latitude,
//             longitude: longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           customMapStyle={mapStyle}>
//           <Marker
//             draggable
//             coordinate={{
//               latitude: 37.78825,
//               longitude: -122.4324,
//             }}
//             onDragEnd={
//               (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
//             }
//             title={'Test Marker'}
//             description={'This is a description of the marker'}
//           />
//         </MapView>
//       </View>
//       <TouchableOpacity
//         onRefresh={onRefresh}
//         style={{
//           width: '90%',
//           marginLeft: '5%',
//           alignItems: 'center',
//           paddingVertical: 10,
//           borderWidth: 1,
//           borderRadius: 10,
//           borderColor: 'green',
//           marginTop: 20,
//         }}>
//           <Text
//             style={{
//               fontSize: 16,
//               color: 'white',
//             }}>
//             See Location on Map
//           </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default MapCommponent;

// const mapStyle = [
//   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [{color: '#263c3f'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#6b9a76'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{color: '#38414e'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#212a37'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#9ca5b3'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [{color: '#746855'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#1f2835'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#f3d19c'}],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'geometry',
//     stylers: [{color: '#2f3948'}],
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [{color: '#17263c'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#515c6d'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.stroke',
//     stylers: [{color: '#17263c'}],
//   },
// ];

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
//   mapStyle: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
import React, { Component } from 'react';
// // Import required components
import {SafeAreaView, StyleSheet, View , Text,RefreshControl,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import MapView, {Marker} from 'react-native-maps';
import database from '@react-native-firebase/database';
class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      latitude:0.00,
      longitude:0.00,
      ID:'SChsXVVaK3ZXSxUs5DE8ANPi8NG2'
     }
  }
  componentDidMount () {
          console.log("componentDidMount")
        database()
            .ref('Location')
      .orderByChild('UserId')
      .equalTo(this.state.ID)    
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());
        let array = snapshot.val()
        let val=Object.values(array)
        console.log("Map Array Object",val.map(ls=>ls.longitude))
        var Lon=val.map(ls=>ls.longitude)
        var Long=Lon.toString().replace(/^\s+|\s+$/g,'')
        console.log("After Convert",Long)
        var Lat=val.map(ls=>ls.latitude)
        var Lati=Lat.toString().replace(/^\s+|\s+$/g,'')
        console.log("After Convert",Lati)
        // setlatituden(Lati)
        //setlongitude(Long)
        this.setState({latitude:Lati})
        this.setState({longitude:Long})
  })
}
  render() { 
    return ( 
    <SafeAreaView style={{flex: 1}}>
      {console.log('latitude in render of map',this.state.latitude)}
      {console.log('longitude in render of map',this.state.longitude)}
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
      </View>
      {/* <TouchableOpacity
        //onRefresh={onRefresh}
        style={{
          width: '90%',
          marginLeft: '5%',
          alignItems: 'center',
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'green',
          marginTop: 20,
        }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
            }}>
            See Location on Map
          </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
}

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default MapLocation;