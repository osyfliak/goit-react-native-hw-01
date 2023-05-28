import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';
import BG from '../../img/bg.jpg';
import LocationIcon from '../../img/mapi.svg';
import { selectAllPosts } from '../../redux/posts/postsSelectors';
import { useNavigation } from '@react-navigation/native';

export const PostsScreen = () => {
   const navigation = useNavigation();
   const { name, email, avatar } = useSelector(selectUser);
   const posts = useSelector(selectAllPosts);

   return (
      <>
         <View style={styles.container}>
            <Image source={BG} style={styles.avatar} />
            <View style={styles.containerText}>
               <Text style={styles.name}>{name}</Text>
               <Text style={styles.email}>{email}</Text>
            </View>
         </View>
         <ScrollView style={{ paddingHorizontal: 16, marginTop: 30 }}>
            {posts.map(item => (
               <>
                  <Image
                     source={{ uri: `${item.photo}` }}
                     style={{ width: 380, height: 280, borderRadius: 15 }}
                  />
                  <Text style={styles.namePost}>{item.namePost}</Text>
                  <Text style={styles.location}>
                     <LocationIcon /> {item.location}
                  </Text>
               </>
            ))}
         </ScrollView>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      flex: 1,
      alignItems: 'center',

      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 32,
   },
   containerText: {
      marginTop: 10,
   },
   avatar: {
      width: 60,
      height: 60,
      marginRight: 8,
      borderRadius: 16,
   },
   name: {
      fontFamily: 'Roboto-Medium',
      fontSize: 13,
   },
   email: {
      fontFamily: 'Roboto-Regular',
      fontSize: 11,
   },
   namePost: {
      fontFamily: 'Roboto-Medium',
      fontSize: 16,
      alignItems: 'flex-start',
   },
   location: {
      fontFamily: 'Roboto-Regular',
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
      fontSize: 16,
      marginBottom: 20,
   },
});
