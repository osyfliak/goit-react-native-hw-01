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
import { MapScreen } from './Screens/MapScreen/MapScreen';
import { Provider } from 'react-redux';
import  store from './redux/store';
import { ProfilePhotoScreen } from './Screens/ProfilePhotoScreen/ProfilePhotoScreen';

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
      <Provider store={store}>
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
                     <MainStack.Screen name="MapScreen" component={MapScreen} />
                     <MainStack.Screen name='ProfilePhotoScreen' component = { ProfilePhotoScreen } />
                  </MainStack.Navigator>
               </NavigationContainer>
            </View>
         </TouchableWithoutFeedback>
      </Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      position: 'relative',
   },
});
