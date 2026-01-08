const express = require("express");
const controller = require("../controllers/recipes.controller");

const router = express.Router();

// CRUD
router.get("/", controller.listRecipes);
router.get("/:id", controller.getRecipeById);
router.post("/", controller.createRecipe);
router.put("/:id", controller.updateRecipe);
router.delete("/:id", controller.deleteRecipe);

module.exports = router;
