import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Image } from "react-native";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async (userId, name, email) => {
    const newUser = {
      name: name,
      email: email,
    };
    const collectionRef = collection(firestore, "users");
    const docRef = doc(collectionRef, userId || undefined);
    setDoc(docRef, newUser)
      .then(() => {
        console.log("Data written successfully");
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await addUser(user.uid, name, email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.appName}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
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

export default RegisterScreen;
