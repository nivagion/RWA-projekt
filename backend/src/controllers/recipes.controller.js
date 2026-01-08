const service = require("../services/recipes.service");

/**
 * GET /api/recipes?search=&category=&maxTime=&sort=&limit=&offset=
 */
exports.listRecipes = async (req, res, next) => {
  try {
    const { search, category, maxTime, sort, limit, offset } = req.query;
    const data = await service.listRecipes({
      search,
      category,
      maxTime,
      sort,
      limit,
      offset,
    });
    res.json({ data });
  } catch (err) {
    next(err);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await service.getRecipeById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json({ data: recipe });
  } catch (err) {
    next(err);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const { title, instructions } = req.body;
    if (!title || !instructions) {
      return res.status(400).json({ error: "title and instructions are required" });
    }
    const created = await service.createRecipe(req.body);
    res.status(201).json({ data: created });
  } catch (err) {
    next(err);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const updated = await service.updateRecipe(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Recipe not found" });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const ok = await service.deleteRecipe(req.params.id);
    if (!ok) return res.status(404).json({ error: "Recipe not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
