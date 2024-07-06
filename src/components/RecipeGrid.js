import React from 'react';

const RecipeGrid = ({ recipes }) => {
    return (
        <div className="recipe-grid">
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <h3>{recipe.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default RecipeGrid;
