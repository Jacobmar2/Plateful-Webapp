import { useEffect, useState } from 'react';
import RecipeEntry from './RecipeEntry';
import './RecipeSuggestion.css';

function RecipeSuggestion({ products }) {
    const [suggestedRecipes, setSuggestedRecipes] = useState([]);
    useEffect(() => {
        if (products) {
            const itemType = products; // Assuming itemType is provided in products
            
            // Fetch recipes based on the itemType
            fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${itemType}&number=6&apiKey=359fe0a025e448219b658cb389e0d358`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Log the fetched data to inspect it
                    const recipes = data.results || [];
                    const randomizedRecipes = shuffleArray(recipes).slice(0, 6); // Shuffle and select the first 6 suggested recipes
                    setSuggestedRecipes(randomizedRecipes);
                })
                .catch(error => {
                    console.log('Error fetching suggested recipes:', error);
                    // Handle errors appropriately
                });
        }
    }, [products]);
    
    return (
        <div id="recipe-cards" className="container mt-5">
            <h1 className="text-center mb-4">Suggested Recipes</h1>
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

function shuffleArray(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
export default RecipeSuggestion;
