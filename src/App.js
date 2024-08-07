import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MealGroupDashboard from './components/MealGroupDashboard';
import RecipeDashboard from './components/RecipeDashboard';
import CreateRecipe from './components/CreateRecipe';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Retsept Menejer</h1>
                    <nav>
                        <Link to="/">Bosh sahifa</Link>
                        <Link to="/create-recipe">Retsept qo'shish</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<MealGroupDashboard />} />
                        <Route path="/recipes/:groupId" element={<RecipeDashboard />} />
                        <Route path="/create-recipe" element={<CreateRecipe />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
