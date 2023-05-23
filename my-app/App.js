import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './Screens/Home/Home';


const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainStack.Navigator
            initialRouteName="Registration"
            screenOptions={{ headerShown: false }}
          >
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Registration" component={RegistrationScreen} />
            <MainStack.Screen name="Home" component={Home} />
          </MainStack.Navigator>
        </NavigationContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
