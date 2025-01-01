import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import RecipeCard from "../components/RecipeCard";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]); // State to store user's favorites

  useEffect(() => {
    // Listen for recipe updates
    const unsubscribeRecipes = onSnapshot(
      collection(firestore, "recipes"),
      (snapshot) => {
        const recipesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipesData);
      }
    );

    // Listen for user favorites updates
    let unsubscribeFavorites;
    if (auth.currentUser) {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      unsubscribeFavorites = onSnapshot(userRef, (docSnap) => {
        const favorites = docSnap.exists()
          ? docSnap.data().favorites || []
          : [];
        setUserFavorites(favorites);
      });
    }

    // Clean up listeners on unmount
    return () => {
      unsubscribeRecipes();
      if (unsubscribeFavorites) {
        unsubscribeFavorites();
      }
    };
  }, [auth.currentUser]);

  const addToFavorites = async (recipeId) => {
    const isAlreadyFavorite = userFavorites.includes(recipeId);
    const updatedFavorites = isAlreadyFavorite
      ? userFavorites.filter((id) => id !== recipeId)
      : [...userFavorites, recipeId];

    try {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        favorites: updatedFavorites,
      });
      setUserFavorites(updatedFavorites); // Update local state
      console.log(
        `Recipe ${
          isAlreadyFavorite ? "removed from" : "added to"
        } favorites successfully!`
      );
    } catch (error) {
      console.error(
        `Error ${
          isAlreadyFavorite ? "removing recipe from" : "adding recipe to"
        } favorites:`,
        error
      );
      // Handle errors appropriately
    }
  };

  const renderItem = ({ item }) => {
    const isFavorite = userFavorites.includes(item.id);

    return (
      <RecipeCard
        recipe={item}
        onPress={() => navigation.navigate("Recipe", { recipeId: item.id })}
        onFavorite={() => addToFavorites(item.id)}
        isFavorite={isFavorite}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 70, paddingTop: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No recipes found.</Text>
        }
      />
      <FAB
        style={styles.fab}
        icon={({ size }) => <Icon name="add" size={size} color="red" />}
        onPress={() => navigation.navigate("AddRecipe")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "white",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});

export default HomeScreen;
