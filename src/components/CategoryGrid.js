import React from 'react';

const CategoryGrid = ({ categories, onSelectCategory }) => {
    console.log('Rendering categories:', categories); // Debugging log

    return (
        <section className="category-grid">
            {categories.map((category) => (
                <div 
                    key={category.id} 
                    className="category" 
                    onClick={() => onSelectCategory(category.id)}
                >
                    <img src={category.picture || 'default-category.jpg'} alt={category.name} />
                    <h2>{category.name}</h2>
                </div>
            ))}
        </section>
    );
};

export default CategoryGrid;
