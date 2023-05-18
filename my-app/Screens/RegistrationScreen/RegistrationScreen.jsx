// import SvgUri from 'react-native-svg-uri';
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Add from "../../img/AddPhoto.svg";
import Del from "../../img/del.svg";

export const RegistrationScreen = () => {
  const [passwordView, setPasswordView] = useState(true);
  const [avatarSource, setAvatarSource] = useState(null);
  const [inputFocus, setInputFocus] = useState({});

  const handlePress = () => {
    setPasswordView(!passwordView);
  };

  const addImg = () => {};
  const delImg = () => {
    setAvatarSource(null);
  };

  const handleFocus = (inputName) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [inputName]: false }));
  };

  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarSource }} style={styles.avatar} />
        {avatarSource ? (
          <Pressable onPress={delImg} style={styles.imgIcon}>
            <Del />
          </Pressable>
        ) : (
          <Pressable onPress={addImg} style={styles.imgIcon}>
            <Add />
          </Pressable>
        )}
      </View>

      <Text style={styles.title}>Реєстрація</Text>

        <TextInput
          placeholderTextColor="#BDBDBD"
          placeholder="Логін"
          style={[styles.input, inputFocus["input1"] && styles.inputFocused]}
          onFocus={() => handleFocus("input1")}
          onBlur={() => handleBlur("input1")}
        />
        <TextInput
          placeholderTextColor="#BDBDBD"
          placeholder="Електронна адреса"
          style={[styles.input, inputFocus["input2"] && styles.inputFocused]}
          onFocus={() => handleFocus("input2")}
          onBlur={() => handleBlur("input2")}
        />

        <View style={{ position: "relative" }}>
          <TextInput
            autoComplete="password"
            secureTextEntry={passwordView}
            placeholder="Пароль"
            style={[styles.input, inputFocus["input3"] && styles.inputFocused]}
            onFocus={() => handleFocus("input3")}
            onBlur={() => handleBlur("input3")}
          />

          <Text
            style={styles.passwordView}
            dataDetectorType="link"
            onPress={handlePress}
            onPre
          >
            Показати
          </Text>
        </View>

      <Pressable style={styles.button}>
        <Text style={styles.textButton}>Зареєструватися</Text>
      </Pressable>
      <Text style={styles.link} dataDetectorType="link">
        Вже є акаунт?Увійти
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 0.6,
    alignItems: "center",
    // gap: 16,

    paddingTop: 92,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,

    backgroundColor: "#FFFFFF",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    position: "absolute",
    top: -160,
    left: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // display:'none'
  },
  imgIcon: {
    position: "absolute",

    top: -80,
    left: 45,
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 32,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 15,
    paddingHorizontal: 16,
    height: 50,
    width: 343,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  passwordView: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    position: "absolute",
    top: 13,
    left: 270,

    fontSize: 16,
    color: "#1B4371",
  },
  button: {
    backgroundColor: "#FF6C00",
    width: 343,
    marginTop: 27,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  textButton: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,

    color: "#1B4371",
  },
});
