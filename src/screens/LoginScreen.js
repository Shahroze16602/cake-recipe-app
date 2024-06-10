import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.appName}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.text} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  text: {
    marginTop: 16,
    color: "red",
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "red",
    width: "100%",
    padding: 16,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 100,
    alignSelf: "center",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
  },
});

export default LoginScreen;
