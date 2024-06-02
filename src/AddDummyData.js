import { firestore } from './firebase';
import { addDoc, collection } from 'firebase/firestore'; 

const addDummyData = async () => {
  const dummyRecipes = [
    {
      title: "Chocolate Cake",
      description: "A delicious chocolate cake recipe.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlrBaBRcJWnJK3PG4uNJAASWU9HNj7BdBnhA&s",
      ingredients: ["Flour", "Sugar", "Cocoa Powder", "Baking Powder", "Salt", "Eggs", "Milk", "Vegetable Oil", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Mix dry ingredients together.", "Add eggs, milk, oil, and vanilla.", "Pour batter into pans and bake for 30-35 minutes."]
    },
    {
      title: "Vanilla Cake",
      description: "A classic vanilla cake recipe.",
      image: "https://images.squarespace-cdn.com/content/v1/5f1f86dc4c2389479d010fab/1647060249841-I0VTU0SGCI4W6BOOQ5HQ/DSC_8322.jpg",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Salt", "Butter", "Eggs", "Milk", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with milk.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Red Velvet Cake",
      description: "A moist and fluffy red velvet cake.",
      image: "https://www.dpsainiflorist.com/wp-content/uploads/2019/04/CA0256i.jpg",
      ingredients: ["Flour", "Sugar", "Cocoa Powder", "Baking Soda", "Salt", "Buttermilk", "Vegetable Oil", "Eggs", "Red Food Coloring", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Mix dry ingredients together.", "Add wet ingredients and mix until combined.", "Pour batter into pans and bake for 30-35 minutes."]
    },
    {
      title: "Carrot Cake",
      description: "A rich and moist carrot cake.",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/carrot-cake-f1b3d0c.jpg?quality=90&resize=440,400",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Baking Soda", "Salt", "Cinnamon", "Nutmeg", "Eggs", "Vegetable Oil", "Grated Carrots", "Crushed Pineapple", "Chopped Walnuts"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Mix dry ingredients together.", "Add wet ingredients and mix until combined.", "Fold in carrots, pineapple, and walnuts.", "Pour batter into pans and bake for 35-40 minutes."]
    },
    {
      title: "Lemon Cake",
      description: "A refreshing lemon cake with a tangy glaze.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMsA9iwgx8sPhbXbDMZVib7itzKTujQ_0TA&s",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Salt", "Butter", "Eggs", "Milk", "Lemon Juice", "Lemon Zest"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with milk and lemon juice.", "Fold in lemon zest.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Coconut Cake",
      description: "A light and fluffy coconut cake.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT35lPF-isb6VP7mCilwn7CRqAyFv1mZwkxbA&s",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Salt", "Butter", "Eggs", "Coconut Milk", "Vanilla Extract", "Shredded Coconut"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with coconut milk.", "Fold in shredded coconut.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Banana Cake",
      description: "A moist and flavorful banana cake.",
      image: "https://grandbaby-cakes.com/wp-content/uploads/2021/06/Banana-Cake-9.jpg",
      ingredients: ["Flour", "Sugar", "Baking Soda", "Salt", "Butter", "Eggs", "Mashed Bananas", "Buttermilk", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with bananas and buttermilk.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Strawberry Cake",
      description: "A delightful strawberry cake with fresh strawberries.",
      image: "https://preppykitchen.com/wp-content/uploads/2022/05/Strawberry-Cake-Recipe-Card-500x500.jpg",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Salt", "Butter", "Eggs", "Milk", "Strawberry Puree", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with milk and strawberry puree.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Pineapple Cake",
      description: "A tropical pineapple cake with a creamy frosting.",
      image: "https://zafarullahsweets.pk/cdn/shop/products/pineapple-cake_1024x1024_crop_center.jpg?v=1643970841",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Salt", "Butter", "Eggs", "Crushed Pineapple", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Cream butter and sugar together.", "Add eggs one at a time.", "Mix dry ingredients and add alternately with crushed pineapple.", "Pour batter into pans and bake for 25-30 minutes."]
    },
    {
      title: "Pumpkin Cake",
      description: "A spiced pumpkin cake perfect for fall.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgTget0dNMQrG80fhGhgWJ3yu38j-4rahHw&s",
      ingredients: ["Flour", "Sugar", "Baking Powder", "Baking Soda", "Salt", "Cinnamon", "Nutmeg", "Eggs", "Vegetable Oil", "Pumpkin Puree", "Vanilla Extract"],
      instructions: ["Preheat oven to 350°F (175°C).", "Grease and flour two nine-inch round pans.", "Mix dry ingredients together.", "Add wet ingredients and mix until combined.", "Pour batter into pans and bake for 30-35 minutes."]
    }
  ];

  const recipesRef = collection(firestore, 'recipes');

  try {
    for (const recipe of dummyRecipes) {
      await addDoc(recipesRef, recipe);
    }
    console.log('Dummy data added to Firestore.');
  } catch (error) {
    console.error('Error adding dummy data:', error);
    // Handle errors appropriately (e.g., display an error message to the user)
  }
};

export default addDummyData;
