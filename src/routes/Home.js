import { Container, Form as BsForm, InputGroup, Button } from "react-bootstrap";
import { Form, useLoaderData } from "react-router-dom";
import { getRandomSubset } from "../utils";
import "./Home.css";

import ProductCarousel from "../components/ProductCarousel";
import RecipeSuggestion from "../components/RecipeSuggestion";
function Home() {
    let fetchedProducts = useLoaderData();
    let selected = getRandomSubset(fetchedProducts, 8, (m) => m.product_name);
    const handleButtonClick = () => {
        // Navigate to a different page upon button click
        let randomIndex = Math.floor(Math.random() * selected.length);
        window.location.href = '/searchproducts/results/'+selected[randomIndex].product_name;
    };

    const handleButtonClickRecipe = () => {
        // Navigate to a different page upon button click
        let randomIndex = Math.floor(Math.random() * selected.length);
        window.location.href = '/SearchRecipes/results/pasta';
    };
    return (
        <>
            <div id="search">
                <div>
                    <Container className="d-flex align-items-center">
                        <div className="col-lg-8">
                            <h1>Are You Hungry?</h1>
                            <p>FIND THE PERFECT RECIPE FOR YOU.</p>
                            <Form method="post">
                                <InputGroup>
                                    <BsForm.Control
                                        className="input-lg"
                                        placeholder="Enter the name of an item or UPC"
                                        name="searchTerm"
                                    />
                                    <Button
                                        type="submit"
                                        className="btn-warning btn-lg"
                                    >
                                        Search
                                    </Button>
                                </InputGroup>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="bg-darkgreen products-section">
                <Container fluid="lg text-center">
                    <ProductCarousel products={selected} />
                    <Button className="btn btn-warning btn-lg mt-5 custom-button" onClick={handleButtonClick}>
                        View More
                    </Button> 
                </Container>
            </div>
            <div className="bg-white recipe-section">
                <Container fluid="lg text-center">
                    <RecipeSuggestion products={selected} />
                    <Button className="btn btn-warning btn-lg mt-5" onClick={handleButtonClickRecipe}>
                        View More
                    </Button> 
                </Container>
            </div>
        </>
    );
}

export default Home;

export async function loader() {
    const response = await fetch(
        "https://world.openfoodfacts.org/cgi/search.pl?search_terms=&search_simple=1&json=1&sort_by=popularity_key&page_size=100&fields=code,product_name,image_url"
    );

    const resData = await response.json();

    return resData.products;
}
