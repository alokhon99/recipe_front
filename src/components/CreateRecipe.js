import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateRecipe.css';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [mealGroups, setMealGroups] = useState([]);
    const [selectedMealGroup, setSelectedMealGroup] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientQuantities, setIngredientQuantities] = useState({});
    const [currentQuantity, setCurrentQuantity] = useState(0);

    useEffect(() => {
        // Fetch meal groups and ingredients on component mount
        axios.get('https://alokhont.pythonanywhere.com/api/meal_groups/')
            .then(response => {
                setMealGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching meal groups:', error);
            });

        axios.get('https://alokhont.pythonanywhere.com/api/ingredients/')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    const handleAddIngredient = (ingredient) => {
        if (!selectedIngredients.includes(ingredient.id)) {
            setSelectedIngredients([...selectedIngredients, ingredient.id]);
            setIngredientQuantities({ ...ingredientQuantities, [ingredient.id]: 1 });
        }
    };

    const handleQuantityChange = (ingredientId, quantity) => {
        setIngredientQuantities({ ...ingredientQuantities, [ingredientId]: quantity });
    };

    const handleQuantityIncrement = (ingredientId) => {
        setIngredientQuantities(prevQuantities => ({
            ...prevQuantities,
            [ingredientId]: prevQuantities[ingredientId] + 1
        }));
    };

    const handleQuantityDecrement = (ingredientId) => {
        if (ingredientQuantities[ingredientId] > 0) {
            setIngredientQuantities(prevQuantities => ({
                ...prevQuantities,
                [ingredientId]: prevQuantities[ingredientId] - 1
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct recipe object to be sent to backend
        const newRecipe = {
            title,
            meal_group: selectedMealGroup,
            ingredients: selectedIngredients.map(id => ({
                id,
                quantity: ingredientQuantities[id]
            }))
        };

        // Example of how to post the new recipe to backend
        axios.post('https://alokhont.pythonanywhere.com/api/recipes/', newRecipe)
            .then(response => {
                console.log('Recipe created:', response.data);
                // Optionally, redirect or update state after successful creation
            })
            .catch(error => {
                console.error('Error creating recipe:', error);
            });
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>

            {/* First Screen: Recipe Title and Meal Group Selection */}
            <form onSubmit={handleSubmit}>
                <div className="recipe-screen">
                    <input
                        type="text"
                        name="title"
                        placeholder="Recipe Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <select
                        name="meal_group"
                        value={selectedMealGroup}
                        onChange={(e) => setSelectedMealGroup(e.target.value)}
                        required
                    >
                        <option value="">Select Meal Group</option>
                        {mealGroups.map((group) => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </div>

                {/* Second Screen: Ingredients Selection and Quantity */}
                <div className="recipe-screen">
                    <h3>Ingredients</h3>
                    <div className="ingredient-grid">
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className="ingredient-item">
                                <label htmlFor={`ingredient-${ingredient.id}`}>
                                    <img src={ingredient.picture || 'default-ingredient.jpg'} alt={ingredient.name} />
                                    <input
                                        type="checkbox"
                                        id={`ingredient-${ingredient.id}`}
                                        onChange={() => handleAddIngredient(ingredient)}
                                        checked={selectedIngredients.includes(ingredient.id)}
                                    />
                                    {ingredient.name}
                                </label>
                                {selectedIngredients.includes(ingredient.id) && (
                                    <div className="quantity-controls">
                                        <button type="button" onClick={() => handleQuantityDecrement(ingredient.id)}>-</button>
                                        <input
                                            type="number"
                                            min="0"
                                            value={ingredientQuantities[ingredient.id]}
                                            onChange={(e) => handleQuantityChange(ingredient.id, parseInt(e.target.value))}
                                        />
                                        <button type="button" onClick={() => handleQuantityIncrement(ingredient.id)}>+</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Third Screen: Actions Selection (To be implemented later) */}

                {/* Submit Button */}
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};

export default CreateRecipe;
