// src/components/RecipeDashboard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDashboard = () => {
    const { groupId } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`https://alokhont.pythonanywhere.com/api/recipes?category=${groupId}`)
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, [groupId]);

    return (
        <div className="recipe-dashboard">
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe">
                    <h2>{recipe.title}</h2>
                    <p>Group: {recipe.meal_group.name}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeDashboard;
