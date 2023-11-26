import { useEffect, useState } from 'react';
import RecipeEntry from './RecipeEntry';

function Suggestions({ productName, ingredients }) {
    const [suggestedRecipes, setSuggestedRecipes] = useState([]);
    
    const formatIngredientsForQuery = (ingredients) => {
        return encodeURIComponent(ingredients);
    };

    useEffect(() => {
        const formattedIngredients = formatIngredientsForQuery(ingredients);
        
        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${productName}&ingredients=${formattedIngredients}&number=6&apiKey=359fe0a025e448219b658cb389e0d358`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const recipes = data.results || [];
                setSuggestedRecipes(recipes.slice(0, 6));
            })
            .catch(error => {
                console.log('Error fetching suggested recipes:', error);
            });
    }, [productName, ingredients]);

    return (
        <div id="recipe-cards" className="container mt-5">
            <h1 className="text-center mb-4">Recipe Suggestions</h1>
            <div className="row">
                {suggestedRecipes.map((recipe, index) => (
                    <div key={index} className="col-md-4">
                        <RecipeEntry
                            productName={recipe.title}
                            imgSrc={recipe.image}
                            recipeId={recipe.id}
                            className="recipe-suggestions"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Suggestions;
