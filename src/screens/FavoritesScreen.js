import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import RecipeCard from "../components/RecipeCard";

const FavoritesScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  // Fetch all recipes on initial load
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "recipes"),
      (snapshot) => {
        const allRecipesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRecipes(allRecipesData);
      }
    );

    return unsubscribe;
  }, []);

  // Fetch user favorites on initial load and when the user changes
  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(
        doc(firestore, "users", auth.currentUser.uid),
        (docSnapshot) => {
          const userData = docSnapshot.data();
          if (userData?.favorites) {
            setUserFavorites(userData.favorites);
          } else {
            setUserFavorites([]);
          }
        }
      );

      return unsubscribe;
    }
  }, [auth.currentUser]);

  // Update recipes based on user favorites and all recipes data
  useEffect(() => {
    const filteredRecipes = allRecipes.filter((recipe) =>
      userFavorites.includes(recipe.id)
    );
    setRecipes(filteredRecipes);
  }, [allRecipes, userFavorites]);

  const removeFromFavorites = async (recipeId) => {
    const updatedFavorites = userFavorites.filter((id) => id !== recipeId);

    try {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: updatedFavorites,
      });
      setUserFavorites(updatedFavorites); // Update local state
      console.log("Recipe removed from favorites successfully!");
    } catch (error) {
      console.error("Error removing recipe from favorites:", error);
      // Handle errors appropriately (e.g., display an error message)
    }
  };

  const renderItem = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate("Recipe", { recipeId: item.id })}
      onFavorite={() => removeFromFavorites(item.id)}
      isFavorite={true} // Set isFavorite to true for all favorite recipes
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorite recipes found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});

export default FavoritesScreen;
