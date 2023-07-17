import * as userMethods from "./userModel.js";

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const insertedUser = await userMethods.createNewUser(newUser);
    res.status(200).json(insertedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await userMethods.findExistingUser({ userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.userPassword !== userPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const populatedUser = await userMethods.findExistingUser({ userEmail });
    res.status(200).json({ message: "Login successful", user: populatedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userMethods.getAllUsers();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const addToFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipe } = req.body;
    const user = await userMethods.findExistingUser({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userFavorites.push(recipe);
    await user.save();
    res.status(200).json({ message: "Recipe added to favorites" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe to favorites" });
  }
};


const deleteFromFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;
    const user = await userMethods.findExistingUser({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userFavorites = user.userFavorites.filter((recipe) => recipe.id !== recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove recipe from favorites" });
  }
};



export default (app) => {
  app.get("/users/all", getAllUsers);
  app.post("/users/new", createUser);
  app.post("/users/login", loginUser);
  app.post("/users/:userId/favorites/add", addToFavorites);
  app.delete("/users/:userId/favorites/delete", deleteFromFavorites); 
};
