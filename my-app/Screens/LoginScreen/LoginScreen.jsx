import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export const LoginScreen = () => {
  const [passwordView, setPasswordView] = useState(true);
  const [inputFocus, setInputFocus] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    setPasswordView(!passwordView);
  };

  const handleFocus = (inputName) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [inputName]: true }));
  };

  const handleBlur = (inputName) => {
    setInputFocus((prevFocus) => ({ ...prevFocus, [inputName]: false }));
  };

  const onLogin = () => {
    console.log("Email:", email, "Password:", password);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Увійти</Text>

      <View>
        <TextInput
          style={[styles.input, inputFocus["input1"] && styles.inputFocused]}
          onFocus={() => handleFocus("input1")}
          onBlur={() => handleBlur("input1")}
          placeholderTextColor="#BDBDBD"
          placeholder="Електронна адреса"
          value={email}
          onChangeText={setEmail}
        />
        <View style={{ position: "relative" }}>
          <TextInput
            style={[styles.input, inputFocus["input2"] && styles.inputFocused]}
            onFocus={() => handleFocus("input2")}
            onBlur={() => handleBlur("input2")}
            autoComplete="password"
            secureTextEntry={passwordView}
            placeholder="Пароль"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPassword}
          />
          <Text
            style={styles.passwordView}
            dataDetectorType="link"
            onPress={handlePress}
          >
            Показати
          </Text>
        </View>

        <Pressable style={styles.button} onPress={onLogin}>
          <Text style={styles.textButton}>Увійти</Text>
        </Pressable>
      </View>

      <Text style={styles.link} dataDetectorType="link">
        Немає акаунта?Зареєструватися
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

    paddingTop: 32,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",

    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    marginHorizontal: 16,
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
    color: "#1B4371",

    position: "absolute",

    top: 13,
    left: 270,
  },
  button: {
    backgroundColor: "#FF6C00",
    width: 343,
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
    marginTop: 16,
  },
});
