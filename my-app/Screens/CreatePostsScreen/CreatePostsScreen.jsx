import React, { useState, useEffect, useRef } from 'react';
import {
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   StyleSheet,
   TextInput,
   Pressable,
   Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Cameraicon from '../../img/camera.svg';
import Geo from '../../img/mapi.svg';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAddPost} from '../../redux/posts/postsOperations';
import { selectUserId } from '../../redux/auth/authSelectors';
import {fetchUploadPhoto} from '../../redux/storage/storageOperations'

export function CreatePostsScreen() {
   const [hasPermission, setHasPermission] = useState(null);
   const [cameraRef, setCameraRef] = useState(null);
   const [namePost, setNamePost] = useState('');
   const [location, setLocation] = useState(null);
   const [photo, setPhoto] = useState('');
   const type = CameraType.back;
   const [currentLocation, setCurrentLocation] = useState(null);

   const navigation = useNavigation();

   dispatch = useDispatch();

   const uid = useSelector(selectUserId);

   useEffect(() => {
      (async () => {
         const { status } = await Camera.requestCameraPermissionsAsync();
         await MediaLibrary.requestPermissionsAsync();
         setHasPermission(status === 'granted');

         let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
         if (locationStatus !== 'granted') {
            console.log('Дозвіл на доступ до місцезнаходження відхилено');
            return;
         }

         let location = await Location.getCurrentPositionAsync({});
         const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
         };
         setCurrentLocation(coords);
      })();
   }, []);

   useEffect(() => {
      (async () => {
         const { status } = await Camera.requestCameraPermissionsAsync();
         await MediaLibrary.requestPermissionsAsync();
         setHasPermission(status === 'granted');
      })();
   }, []);

   if (hasPermission === null) {
      return <View />;
   }
   if (hasPermission === false) {
      return <Text>No access to camera</Text>;
   }

   const takePhoto = async() => {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
     
   }

   const onSubmit = async() => {
      if (!photo || !namePost || !location) {
         alert('Будь ласка введіть дані');
         return;
      }
      const { payload } = await dispatch(fetchUploadPhoto(photo));
      await dispatch(
         fetchAddPost({
            photo: payload,
            namePost,
            location,
            uid
         })
      );
      navigation.navigate('PostsScreen', {location });
      setPhoto('');
      setNamePost('');
      setLocation('');
   };
   return (
      <View style={styles.container}>
         <ScrollView>
            {photo ? (
               <>
                  <Image source={{ uri: photo }} style={styles.camera} />
                  <Text
                     dataDetectorType="link"
                     style={{
                        fontSize: 14,
                        color: '#BDBDBD',
                     }}
                     onPress={() => setPhoto('')}
                  >
                     Змінити фото
                  </Text>
               </>
            ) : (
               <Camera style={styles.camera} type={type} ref={setCameraRef}>
                  <View style={styles.photoView}>
                     <TouchableOpacity
                        style={styles.button}
                        onPress={takePhoto}
                     >
                        <View style={styles.takePhoto}>
                           <Cameraicon />
                        </View>
                     </TouchableOpacity>
                  </View>
               </Camera>
            )}

            <TextInput
               value={namePost}
               onChangeText={setNamePost}
               style={styles.inputName}
               placeholder="Назва..."
            />
            <TextInput
               value={
                  location ||
                  (currentLocation
                     ? `${currentLocation.latitude}, ${currentLocation.longitude}`
                     : '')
               }
               onChangeText={setLocation}
               placeholderTextColor="#BDBDBD"
               style={styles.input}
               placeholder="Геолокація"
            />

            <Text
               dataDetectorType="link"
               style={styles.inputIcon}
               onPress={() => navigation.navigate('MapScreen', { currentLocation })}
            >
               <Geo />
            </Text>
            {namePost && location && photo ? (
               <Pressable style={styles.onSubmit} onPress={onSubmit}>
                  <Text style={styles.textButtonFocus}>Oпублікувати</Text>
               </Pressable>
            ) : (
               <Text style={styles.textButton}>Oпублікувати</Text>
            )}
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',

      paddingVertical: 32,
   },
   camera: {
      width: 343,
      height: 240,

      borderRadius: 8,
   },
   photoView: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
   },
   inputName: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      backgroundColor: 'transparent',
      color: '#212121',
      marginTop: 32,
      marginBottom: 16,
      paddingTop: 16,
      paddingBottom: 15,
      paddingHorizontal: 16,
      height: 50,
      width: 343,
      borderBottomWidth: 1,
      borderColor: '#E8E8E8',

      borderWidth: 0,
   },
   input: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      backgroundColor: 'transparent',
      color: '#212121',

      marginBottom: 32,
      paddingTop: 16,
      paddingBottom: 15,
      paddingHorizontal: 16,
      height: 50,
      width: 343,
      borderBottomWidth: 1,
      borderColor: '#E8E8E8',

      borderWidth: 0,
   },
   inputIcon: {
      zIndex: 99,
      top: -70,
      left: -4,
      width: 25,
      height: 25,
   },

   takePhoto: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
   },
   onSubmit: {
      backgroundColor: '#FF6C00',
      width: 343,

      marginBottom: 16,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 100,
   },
   textButtonFocus: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,

      textAlign: 'center',
      color: '#FFFFFF',
   },
   textButton: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,

      textAlign: 'center',
      color: '#BDBDBD',
   },
});
