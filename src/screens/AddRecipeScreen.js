import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { firestore } from '../firebase'; // Replace with your Firestore instance path

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const addRecipe = async () => {
    try {
      const recipesRef = collection(firestore, 'recipes');
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
      console.error('Error adding recipe to Firestore:', error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={(text) => setIngredients(text.split(',').map(trim))} // Trim whitespace
      />
      <TextInput
        style={styles.input}
        placeholder="Instructions (comma separated)"
        value={instructions}
        onChangeText={(text) => setInstructions(text.split(',').map(trim))} // Trim whitespace
      />
      <Button title="Add Recipe" onPress={addRecipe} />
    </ScrollView>
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default AddRecipeScreen;
