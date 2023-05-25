import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export const PostsScreen = () => {
   return (
      <View>
         <ScrollView>
            <Image />
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      flex: 1,
      alignItems: 'center',

      paddingTop: 92,
      backgroundColor: '#FFFFFF',
   },
   header: {
      flexDirection: 'row',
   },
});
