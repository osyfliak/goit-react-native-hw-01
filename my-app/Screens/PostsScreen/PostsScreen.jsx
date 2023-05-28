import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSelectors';
import BG from '../../img/bg.jpg';
import { selectAllPosts } from '../../redux/posts/postsSelectors';

export const PostsScreen = () => {
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

      
            <FlatList
               data={posts}
               keyExtractor={(item, indx) => indx.toString()}
               renderItem={({ item }) => (
                  <View
                     style={{
                        marginTop: 50,
                        marginBottom: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <Image
                        source={{ uri: `${item.photo}` }}
                        style={{ width: 380, height: 280, borderRadius: 15 }}
                     />
                     <Text>Назва:{item.namePost}</Text>
                     <Text>Локація:{item.location}</Text>
                  </View>
               )}
            ></FlatList>
      
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      flex: 1,
      // alignItems: 'center',

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
});
