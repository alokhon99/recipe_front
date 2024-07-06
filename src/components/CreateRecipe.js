import React, { useState, useEffect } from 'react';

const CreateRecipe = () => {
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [actions, setActions] = useState([]);
    const [recipe, setRecipe] = useState({
        title: '',
        meal_group: '',
        meal_ingredients: [{ ingredient: '', quantity: '' }],
        meal_actions: [{ ingredient: '', action: '', duration: '' }],
    });

    useEffect(() => {
        fetch('https://alokhont.pythonanywhere.com/api/meal_groups/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));

        fetch('https://alokhont.pythonanywhere.com/api/ingredients/')
            .then(response => response.json())
            .then(data => setIngredients(data))
            .catch(error => console.error('Error fetching ingredients:', error));

        fetch('https://alokhont.pythonanywhere.com/api/actions/')
            .then(response => response.json())
            .then(data => setActions(data))
            .catch(error => console.error('Error fetching actions:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const meal_ingredients = [...recipe.meal_ingredients];
        meal_ingredients[index][name] = value;
        setRecipe({ ...recipe, meal_ingredients });
    };

    const handleActionChange = (index, e) => {
        const { name, value } = e.target;
        const meal_actions = [...recipe.meal_actions];
        meal_actions[index][name] = value;
        setRecipe({ ...recipe, meal_actions });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, meal_ingredients: [...recipe.meal_ingredients, { ingredient: '', quantity: '' }] });
    };

    const addAction = () => {
        setRecipe({ ...recipe, meal_actions: [...recipe.meal_actions, { ingredient: '', action: '', duration: '' }] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://alokhont.pythonanywhere.com/api/recipes/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Recipe created:', data);
                // Handle success, maybe redirect to another page or reset form
            })
            .catch(error => console.error('Error creating recipe:', error));
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={recipe.title} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="meal_group" value={recipe.meal_group} onChange={handleInputChange} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Ingredients:</label>
                    {recipe.meal_ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <select
                                name="ingredient"
                                value={ingredient.ingredient}
                                onChange={(e) => handleIngredientChange(index, e)}
                                required
                            >
                                <option value="">Select Ingredient</option>
                                {ingredients.map(ing => (
                                    <option key={ing.id} value={ing.id}>
                                        {ing.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="quantity"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) => handleIngredientChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div>
                    <label>Actions:</label>
                    {recipe.meal_actions.map((action, index) => (
                        <div key={index}>
                            <select
                                name="ingredient"
                                value={action.ingredient}
                                onChange={(e) => handleActionChange(index, e)}
                                required
                            >
                                <option value="">Select Ingredient</option>
                                {ingredients.map(ing => (
                                    <option key={ing.id} value={ing.id}>
                                        {ing.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="action"
                                value={action.action}
                                onChange={(e) => handleActionChange(index, e)}
                                required
                            >
                                <option value="">Select Action</option>
                                {actions.map(act => (
                                    <option key={act.id} value={act.id}>
                                        {act.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duration"
                                value={action.duration}
                                onChange={(e) => handleActionChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addAction}>Add Action</button>
                </div>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
