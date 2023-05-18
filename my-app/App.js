import { useFonts } from "expo-font";
import { ImageBackground, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { RegistrationScreen } from "./Screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen/PostsScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require("./img/bg.jpg")}>
        {/* <RegistrationScreen /> */}
        <LoginScreen />
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
  position:'absolute',
    width: "100%",
    height: "100%",
    left:0,
    top:0,
    bottom:0,
    right:0,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    position:'absolute',
    flex: 1,
    position: "relative",
  },
});
