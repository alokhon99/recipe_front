import React from 'react';

const RecipeGrid = ({ recipes }) => {
    return (
        <section className="recipe-grid">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe">
                    <img src={recipe.image} alt={recipe.name} />
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </section>
    );
};

export default RecipeGrid;
