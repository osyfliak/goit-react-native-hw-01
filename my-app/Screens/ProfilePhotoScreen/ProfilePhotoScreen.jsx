import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { fetchUploadPhoto } from '../../redux/storage/storageOperations';

import { Camera } from 'expo-camera';

export const ProfilePhotoScreen = ({ navigation }) => {
   const dispatch = useDispatch();

   const [camera, setCamera] = useState(null);
   const [photoi, setPhoto] = useState(null);

   const takePhoto = async () => {
      const avatar = await camera.takePictureAsync();
      setPhoto(avatar.uri);
   };

   const hendleCreate = async () => {
      if (!photoi) {
         alert('Take avatar!!!');
         return;
      }
      const { payload } = await dispatch(fetchUploadPhoto(photoi));
      navigation.navigate('Registration', { defaultPhoto: null, avatar: payload });
   };

   return (
      <View style={styles.postContainer}>
         <Camera style={styles.postImg} ref={setCamera}>
            <Image source={{ uri: photoi }} style={{ height: 220, width: 220, marginTop: -80 }} />
         </Camera>

         <TouchableOpacity style={styles.postImgAdd} activeOpacity={0.5} onPress={takePhoto}>
            <FontAwesome name="camera" size={24} color="white" />
         </TouchableOpacity>

         <TouchableOpacity
            style={photoi ? styles.postButtonActive : styles.postButton}
            activeOpacity={0.5}
            onPress={hendleCreate}
         >
            <Text style={styles.postButtonText}>Publicate</Text>
         </TouchableOpacity>

         <Text style={styles.postImgText}>Add photo</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   postContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   postImg: {
      flex: 3,
      width: '100%',
      height: 600,
      color: '#F6F6F6',
      justifyContent: 'center',
      alignItems: 'center',
   },
   postImgAdd: {
      display: 'flex',
      marginTop: -80,
      width: 50,
      height: 50,
      borderRadius: 50,
      padding: 3,
      borderColor: '#ffffff',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
   },
   postImgText: {
      alignItems: 'flex-start',
      color: '#fff',
   },
   postForm: {
      flex: 3,
   },
   postButton: {
      backgroundColor: '#E8E8E8',
      height: 50,
      width: 343,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      marginTop: 44,
   },
   postButtonActive: {
      backgroundColor: '#FF6C00',
      height: 50,
      width: 343,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      marginTop: 44,
   },
   postButtonText: {
      color: '#fff',
      fontWeight: '400',
   },
   postName: {
      width: 343,
      height: 50,
      borderRadius: 8,
      marginTop: 33,
      padding: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 19,
      borderBottomColor: '#E8E8E8',
      borderBottomWidth: 2,
   },
});
