import React from 'react';

const CategoryGrid = ({ categories, onSelectCategory }) => {
    return (
        <div className="category-grid">
            {categories.map(category => (
                <div key={category.id} className="category-card" onClick={() => onSelectCategory(category.name)}>
                    <img src={category.picture} alt={category.name} />
                    <h3>{category.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;
