import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import RecipeScreen from "./src/screens/RecipeScreen";
import AddRecipeScreen from "./src/screens/AddRecipeScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { auth } from "./src/firebase";
import { AppRegistry } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

AppRegistry.registerComponent("cake-recipe-app", () => App);

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Favorites") {
          iconName = "heart-outline";
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        backgroundColor: "white",
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShadowVisible: false }}
    />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{
        title: "Cake Recipe App",
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    />
    <Stack.Screen name="Recipe" component={RecipeScreen} />
    <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
