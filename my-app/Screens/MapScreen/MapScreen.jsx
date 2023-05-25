import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';

export const MapScreen = () => {
   const {
      params: { currentLocation },
   } = useRoute();

   return (
      <View style={styles.container}>
         <MapView
            style={styles.mapStyle}
            region={{
               ...currentLocation,
               latitudeDelta: 0.0922,
               longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
         >
            {currentLocation && (
               <Marker title="I am here" coordinate={currentLocation} description="Hello" />
            )}
         </MapView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
});
