import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MealGroupDashboard.css';

const MealGroupDashboard = () => {
    const [mealGroups, setMealGroups] = useState([]);

    useEffect(() => {
        axios.get('https://alokhont.pythonanywhere.com/api/meal_groups/')
            .then(response => {
                setMealGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching meal groups:', error);
            });
    }, []);

    return (
        <div className="meal-group-dashboard">
            {mealGroups.map(group => (
                <Link to={`/recipes/${group.id}`} key={group.id} className="meal-group">
                    <img src={group.picture || 'default-category.jpg'} alt={group.name} />
                    <h2>{group.name}</h2>
                </Link>
            ))}
        </div>
    );
};

export default MealGroupDashboard;
