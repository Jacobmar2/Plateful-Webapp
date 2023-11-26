import { CardImg, Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "./Recipe.css";
import RecipeSuggestion from "../components/RecipeSuggestion";
import { getRandomSubset } from "../utils";
export function Recipe() {
    const resData = useLoaderData();
    const recipe = resData; // Assuming Spoonacular API returns the entire recipe as a single object

    // Check if recipe exists and has the image property
    if (!recipe || !recipe.image) {
        return <div>No recipe details found</div>;
    }
    const description = recipe?.summary || 'No description available';

    return (
        <>
            <Row className="recipe-header">
                <Col lg={6} className="title-card">
                    <h1 className="mb-3">{recipe.title}</h1>
                    {/* Display other relevant details */}
                    <p>Rating: {Math.floor(recipe.spoonacularScore)}%</p>
                    <h2>Description:</h2>
                    {/* Render the HTML content */}
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </Col>
                <Col lg={6} className="d-flex justify-content-center mb-5 mb-lg-0">
                    <CardImg
                        variant="top"
                        src={recipe.image}
                        alt={recipe.title}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                </Col>
            </Row>

            <Row className="recipe-ingredients">
                <Col lg={12}>
                    <h2 className="mb-3 text-center">Ingredients</h2>
                    <ul>
                        {/* Map through extendedIngredients to create a list */}
                        {recipe.extendedIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.original}</li>
                        ))}
                    </ul>
                    {/* Display other recipe details as needed */}
                </Col>
            </Row>
            <Row className="recipe-method">
                <Col lg={12}>
                    <h2 className="mb-3 text-center">Methods</h2>
                    <ol>
                        {/* Map through recipe steps and render as a list */}
                        {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                    </ol>
                </Col>
            </Row>
            <Row className="suggested-row">
                <RecipeSuggestion products={recipe.dishTypes}/>
            </Row>

        </>
    );
}

export async function loader({ params }) {
    const recipeId = params.recipeId;
    const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=0a69d74f88c248cbaace8bd933a41abd`
        // Replace YOUR_API_KEY with your actual Spoonacular API key
    );

    const resData = await response.json();

    if (resData.error) {
        console.error("Error fetching recipe details:", resData.error);
        // Handle errors or redirect appropriately
    }

    return resData;
}
