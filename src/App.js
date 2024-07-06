import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import CategoryGrid from './components/CategoryGrid';
import RecipeGrid from './components/RecipeGrid';
import CreateRecipe from './components/CreateRecipe';
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
        <Router>
            <div className="App">
                <header>
                    <h1>{selectedCategory ? `${selectedCategory} Recipes` : 'Recipes'}</h1>
                    <Link to="/create-recipe" className="add-recipe-btn">
                        <i className="fas fa-plus"></i> Add Recipe
                    </Link>
                </header>
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <CategoryGrid categories={categories} onSelectCategory={setSelectedCategory} />
                            {selectedCategory && <RecipeGrid recipes={recipes} />}
                        </Route>
                        <Route path="/create-recipe" component={CreateRecipe} />
                    </Switch>
                </main>
                <footer>
                    <p>&copy; 2024 Recipe Dashboard</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
