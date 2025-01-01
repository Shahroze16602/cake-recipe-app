import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { firestore } from "../firebase"; // Replace with your Firestore instance path
import { TouchableOpacity } from "react-native-gesture-handler";

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const addRecipe = async () => {
    try {
      const recipesRef = collection(firestore, "recipes");
      const newRecipe = {
        title,
        description,
        image,
        ingredients,
        instructions,
      };

      await addDoc(recipesRef, newRecipe);

      navigation.goBack();
    } catch (error) {
      console.error("Error adding recipe to Firestore:", error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <View
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <ScrollView>
        <TextInput
          cursorColor="red"
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          cursorColor="red"
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          cursorColor="red"
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          cursorColor="red"
          style={styles.input}
          placeholder="Ingredients (Press enter to add new ingredient)"
          multiline={true}
          value={ingredients}
          onChangeText={(text) => setIngredients(text.split("\n").map(trim))} // Trim whitespace
        />
        <TextInput
          cursorColor="red"
          style={styles.input}
          placeholder="Instructions (Press enter to add new instruction)"
          multiline={true}
          value={instructions}
          onChangeText={(text) => setInstructions(text.split("\n").map(trim))} // Trim whitespace
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={addRecipe}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const trim = (str) => str.trim(); // Helper function to trim whitespace

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
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
});

export default AddRecipeScreen;
