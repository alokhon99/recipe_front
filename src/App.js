import React, { useState, useEffect } from 'react';
import CategoryGrid from './components/CategoryGrid';
import RecipeGrid from './components/RecipeGrid';
import './App.css';

const App = () => {
    const [categories, setCategories] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        // Fetch categories
        fetch('https://alokhont.pythonanywhere.com/api/meal_groups/')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            // Fetch recipes based on the selected category
            fetch(`https://alokhont.pythonanywhere.com/api/recipes?category=${selectedCategory}`)
                .then(response => response.json())
                .then(data => setRecipes(data))
                .catch(error => console.error('Error fetching recipes:', error));
        }
    }, [selectedCategory]);

    return (
        <div className="App">
            <header>
                <h1>{selectedCategory ? `${selectedCategory} Recipes` : 'Recipes'}</h1>
                <button className="add-recipe-btn"><i className="fas fa-plus"></i> Add Recipe</button>
            </header>
            <main>
                <CategoryGrid categories={categories} onSelectCategory={setSelectedCategory} />
                {selectedCategory && <RecipeGrid recipes={recipes} />}
            </main>
            <footer>
                <p>&copy; 2024 Recipe Dashboard</p>
            </footer>
        </div>
    );
};

export default App;
