// import SvgUri from 'react-native-svg-uri';
import React, { useState, useEffect } from 'react';
import {
   Image,
   ImageBackground,
   KeyboardAvoidingView,
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   View,
   Keyboard,
} from 'react-native';
import Add from '../../img/AddPhoto.svg';
import Del from '../../img/del.svg';
import BG from '../../img/bg.jpg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchRegisterUser } from '../../redux/auth/authOperations';

export const RegistrationScreen = () => {
   const [passwordView, setPasswordView] = useState(true);
   const [avatar, setAvatar] = useState(null);
   const [inputFocus, setInputFocus] = useState({});

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isKeyboardOpen, setKeyboardOpen] = useState(false);

   const navigation = useNavigation();

   const dispatch = useDispatch();

   // const {
   //    params: { photo },
   // } = useRoute();
   // console.log(photo);



   const handlePress = () => {
      setPasswordView(!passwordView);
   };


   const handleFocus = inputName => {
      setInputFocus(prevFocus => ({ ...prevFocus, [inputName]: true }));
   };

   const handleBlur = inputName => {
      setInputFocus(prevFocus => ({ ...prevFocus, [inputName]: false }));
   };

   const onLogin = () => {
      if (!name || !email || !password) {
         alert('Будь ласка введіть дані');
         return;
      }
      dispatch(
         fetchRegisterUser({
            name,
            email,
            password,
            avatar,
         })
      ).then(result => {
         result.type === 'auth/fetchRegisterUser/fulfilled' && navigation.navigate('Home');
         result.type !== 'auth/fetchRegisterUser/fulfilled' && alert('Помилка реєстрації');
      });
   };
   useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',
         handleKeyboardDidShow
      );
      const keyboardDidHideListener = Keyboard.addListener(
         'keyboardDidHide',
         handleKeyboardDidHide
      );

      return () => {
         keyboardDidShowListener.remove();
         keyboardDidHideListener.remove();
      };
   }, []);

   const handleKeyboardDidShow = () => {
      setKeyboardOpen(true);
   };

   const handleKeyboardDidHide = () => {
      setKeyboardOpen(false);
   };

   const takePhoto = () => {
      navigation.navigate('ProfilePhotoScreen', {
         onSelect: (selectedPhoto) => setPhoto(selectedPhoto),
      });
   };
   return (
      <View style={styles.mycontainer}>
         <ImageBackground style={styles.image} source={BG}>
            <KeyboardAvoidingView
               behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
               style={{ justifyContent: 'flex-end' }}
            >
               <View style={styles.container}>
                  <View style={styles.avatarContainer}>
                      <Image source={avatar || BG} style={styles.avatar}/>
                     { avatar ? (
                        <Pressable  style={styles.imgIcon}>
                           <Del />
                        </Pressable>
                     ) : (
                        <Pressable onPress={takePhoto} style={styles.imgIcon}>
                           <Add />
                        </Pressable>
                     )}
                  </View>
                  <Text style={styles.title}>Реєстрація</Text>
                  <TextInput
                     placeholderTextColor="#BDBDBD"
                     placeholder="Логін"
                     value={name}
                     onChangeText={setName}
                     style={[styles.input, inputFocus['input1'] && styles.inputFocused]}
                     onFocus={() => handleFocus('input1')}
                     onBlur={() => handleBlur('input1')}
                  />
                  <TextInput
                     placeholderTextColor="#BDBDBD"
                     placeholder="Електронна адреса"
                     value={email}
                     onChangeText={setEmail}
                     style={[styles.input, inputFocus['input2'] && styles.inputFocused]}
                     onFocus={() => handleFocus('input2')}
                     onBlur={() => handleBlur('input2')}
                  />
                  <View style={{ position: 'relative' }}>
                     <TextInput
                        autoComplete="password"
                        secureTextEntry={passwordView}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Пароль"
                        style={[styles.input, inputFocus['input3'] && styles.inputFocused]}
                        onFocus={() => handleFocus('input3')}
                        onBlur={() => handleBlur('input3')}
                     />
                     <Text
                        style={styles.passwordView}
                        dataDetectorType="link"
                        onPress={handlePress}
                     >
                        Показати
                     </Text>
                  </View>
                  {isKeyboardOpen ? null : (
                     <>
                        <Pressable style={styles.button} onPress={onLogin}>
                           <Text style={styles.textButton}>Зареєструватися</Text>
                        </Pressable>
                        <Text
                           style={styles.link}
                           dataDetectorType="link"
                           onPress={() => navigation.navigate('Login')}
                        >
                           Вже є акаунт?Увійти
                        </Text>
                     </>
                  )}
               </View>
            </KeyboardAvoidingView>
         </ImageBackground>
      </View>
   );
};

const styles = StyleSheet.create({
   mycontainer: {
      flex: 1,
      alignItems: 'center',
   },
   container: {
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      width: '100%',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
   },
   image: {
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%',
   },
   avatarContainer: {
      position: 'relative',
   },
   avatar: {
      position: 'absolute',
      top: -50,
      left: -45,
      width: 120,
      height: 120,
      borderRadius: 16,
      backgroundColor: '#F6F6F6',
   },
   imgIcon: {
      // position: 'absolute',

      top: 15,
      left: 62,
      width: 25,
      height: 25,
   },
   title: {
      fontFamily: 'Roboto-Medium',
      fontSize: 30,
      color: '#212121',
      marginBottom: 32,
      marginTop: 67,
   },
   input: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      backgroundColor: '#F6F6F6',
      color: '#212121',
      marginHorizontal: 16,
      marginBottom: 16,
      paddingTop: 16,
      paddingBottom: 15,
      paddingHorizontal: 16,
      height: 50,
      width: 343,
      borderColor: '#E8E8E8',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 8,
   },
   inputFocused: {
      borderColor: '#FF6C00',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
   },
   passwordView: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,

      position: 'absolute',
      top: 13,
      left: 270,

      fontSize: 16,
      color: '#1B4371',
   },
   button: {
      backgroundColor: '#FF6C00',
      width: 343,
      marginTop: 27,
      marginBottom: 16,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 100,
   },
   textButton: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,

      textAlign: 'center',
      color: '#FFFFFF',
   },
   link: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,

      color: '#1B4371',
      marginBottom: 78,
   },
});
