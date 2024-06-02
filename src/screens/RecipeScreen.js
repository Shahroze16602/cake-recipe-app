import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getDoc, doc } from 'firebase/firestore'; // Updated imports
import { firestore } from '../firebase';

const RecipeScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Reset error state

      try {
        const recipeRef = doc(firestore, 'recipes', recipeId);
        const docSnap = await getDoc(recipeRef);

        if (docSnap.exists) {
          setRecipe({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such recipe!'); // Log error if recipe not found
          setError('Recipe not found'); // Set error state
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('An error occurred. Please try again later.'); // Set user-friendly error
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>; // Display error message
  }

  return (
    <ScrollView style={styles.container}
    contentContainerStyle={{paddingBottom: 50}}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{ingredient}</Text>
      ))}
      <Text style={styles.instructionsTitle}>Instructions:</Text>
      {recipe.instructions.map((instruction, index) => (
        <Text key={index} style={styles.instruction}>{index + 1}. {instruction}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Added background color
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10, // Added border radius for rounded corners
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333', // Added text color
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
    color: '#666', // Added text color
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333', // Added text color
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
    color: '#666', // Added text color
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333', // Added text color
  },
  instruction: {
    fontSize: 16,
    marginVertical: 2,
    color: '#666', // Added text color
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333', // Added text color
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red', // Added error text color
  },
});

export default RecipeScreen;
