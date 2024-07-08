// src/components/CreateRecipe.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [mealGroups, setMealGroups] = useState([]);
    const [selectedMealGroup, setSelectedMealGroup] = useState('');
    const [mealIngredients, setMealIngredients] = useState([{ ingredient: '', quantity: '' }]);
    const [mealActions, setMealActions] = useState([{ action: '', ingredient: '', duration: '' }]);

    useEffect(() => {
        axios.get('https://alokhont.pythonanywhere.com/api/meal_groups/')
            .then(response => {
                setMealGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching meal groups:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            meal_group: selectedMealGroup,
            meal_ingredients: mealIngredients,
            meal_actions: mealActions,
        };

        axios.post('https://alokhont.pythonanywhere.com/api/recipes/', newRecipe)
            .then(response => {
                console.log('Recipe created:', response.data);
            })
            .catch(error => {
                console.error('Error creating recipe:', error);
            });
    };

    const addIngredient = () => {
        setMealIngredients([...mealIngredients, { ingredient: '', quantity: '' }]);
    };

    const addAction = () => {
        setMealActions([...mealActions, { action: '', ingredient: '', duration: '' }]);
    };

    const handleIngredientChange = (index, e) => {
        const newIngredients = mealIngredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [e.target.name]: e.target.value };
            }
            return ingredient;
        });
        setMealIngredients(newIngredients);
    };

    const handleActionChange = (index, e) => {
        const newActions = mealActions.map((action, i) => {
            if (i === index) {
                return { ...action, [e.target.name]: e.target.value };
            }
            return action;
        });
        setMealActions(newActions);
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <h3>Ingredients</h3>
                    {mealIngredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="ingredient"
                                placeholder="Ingredient"
                                value={ingredient.ingredient}
                                onChange={(e) => handleIngredientChange(index, e)}
                                required
                            />
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
                    <h3>Actions</h3>
                    {mealActions.map((action, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="action"
                                placeholder="Action"
                                value={action.action}
                                onChange={(e) => handleActionChange(index, e)}
                                required
                            />
                            <input
                                type="text"
                                name="ingredient"
                                placeholder="Ingredient"
                                value={action.ingredient}
                                onChange={(e) => handleActionChange(index, e)}
                                required
                            />
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
