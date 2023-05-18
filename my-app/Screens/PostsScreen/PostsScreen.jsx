import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upContainer}>
        <Text>Публікації</Text>
        <Text>логаут</Text>
      </View>

      <ScrollView>
        <Image />
        <Text>Natali Romanova</Text>
        <Text>email@example.com</Text>
      </ScrollView>
      <View>
        <Pressable></Pressable>
        <Pressable></Pressable>
        <Pressable></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
   
    paddingTop: 92,
    backgroundColor: "#FFFFFF",
  },
  upContainer: {
    
  },
});
