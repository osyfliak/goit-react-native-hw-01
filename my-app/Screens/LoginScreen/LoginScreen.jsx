import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import BG from '../../img/bg.jpg';

export const LoginScreen = () => {
  const [passwordView, setPasswordView] = useState(true);
  const [inputFocus, setInputFocus] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const navigation = useNavigation();

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
    navigation.navigate('Home');
    console.log('Email:', email, 'Password:', password);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

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

  return (
    <View style={styles.mycontainer}>
      <ImageBackground style={styles.image} source={BG}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ justifyContent: 'flex-end' }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>

            <TextInput
              style={[styles.input, inputFocus['input1'] && styles.inputFocused]}
              onFocus={() => handleFocus('input1')}
              onBlur={() => handleBlur('input1')}
              placeholderTextColor="#BDBDBD"
              placeholder="Електронна адреса"
              value={email}
              onChangeText={setEmail}
            />
            <View style={{ position: 'relative' }}>
              <TextInput
                style={[styles.input, inputFocus['input2'] && styles.inputFocused]}
                onFocus={() => handleFocus('input2')}
                onBlur={() => handleBlur('input2')}
                autoComplete="password"
                secureTextEntry={passwordView}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.passwordView} dataDetectorType="link" onPress={handlePress}>
                Показати
              </Text>
            </View>
            {isKeyboardOpen ? null : (
              <>
                <Pressable style={styles.button} onPress={onLogin}>
                  <Text style={styles.textButton}>Увійти</Text>
                </Pressable>

                <Text
                  style={styles.link}
                  dataDetectorType="link"
                  onPress={() => navigation.navigate('Registration')}
                >
                  Немає акаунта?Зареєструватися
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
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    marginVertical: 32,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#212121',

    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    marginHorizontal: 16,
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
    borderWidth: 1,
  },
  passwordView: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#1B4371',

    position: 'absolute',

    top: 13,
    left: 270,
  },
  button: {
    backgroundColor: '#FF6C00',
    width: 343,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginBottom: 27,
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
    marginTop: 16,
    marginBottom: 144,
  },
});
