import { CardImg, Col, Container, Row } from "react-bootstrap";
import { redirect, useLoaderData } from "react-router-dom";
import NutritionFacts from "../components/NutritionFacts";

import dfltImg from "../image/no-image.png";
import Suggestions from "../components/Suggestions";
import "../components/RecipeSuggestion.css";
import "./Home.css";
export function ProductDetails() {
    const resData = useLoaderData();
    const productInfo = resData.product;

    let ingredients = "";
    console.log(productInfo)
    if (
        "ingredients_text_en" in productInfo &&
        productInfo.ingredients_text_en !== ""
    ) {
        ingredients = productInfo.ingredients_text_en;
    } else if ("ingredients_text" in productInfo) {
        ingredients = productInfo.ingredients_text;
    }

    const handleButtonClickRecipe = () => {
        // Navigate to a different page upon button click
       
        window.location.href = '/SearchRecipes/results/'+productInfo.product_name;
    };
    return (
        <Container className="mt-5">
        <Row className="row-cols-1 row-cols-lg-2 justify-content-center">
            <Col className="d-flex justify-content-center">
                <CardImg
                    variant="top"
                    className="mb-5 mb-lg-0"
                    src={productInfo.image_url || dfltImg}
                    alt="..."
                    style={{
                        width: "100%",
                        maxHeight: "600px",
                        objectFit: "contain",
                    }}
                />
            </Col>
            <Col>
                <Row className="mb-2">
                    <div className="small mb-1">UPC {resData.code}</div>
                    <h3>{productInfo.brands}</h3>
                    <div className="display-4 fw-bold">
                        {productInfo.product_name}
                    </div>
                </Row>
                <Row>
                    <p>
                        <strong>Package Quantity:</strong>{" "}
                        {productInfo.quantity}
                    </p>
                    {ingredients !== "" && (
                        <p>
                            <strong>Ingredients:</strong> {ingredients}
                        </p>
                    )}
                </Row>
                <NutritionFacts productData={productInfo} />
            </Col>
        </Row>
        <Row className="product-suggested justify-content-center">
            <Col xs={12} className="text-center"> {/* Add a column to center the button */}
                <Suggestions productName={productInfo.product_name} ingredients={ingredients} />
                <button className="btn btn-warning btn-lg mt-2" onClick={handleButtonClickRecipe} style={{ width: '150px' }}>
                    View More
                </button>
            </Col>
        </Row>
        </Container>
    );
}

export async function loader({ params }) {
    const code = params.code;

    const response = await fetch(
        `https://world.openfoodfacts.net/api/v2/product/${code}.json?lang=en&fields=quantity,serving_size,nutriments,product_name,image_url,code,ingredients_text,ingredients_text_en,categories,brands`
    );

    const resData = await response.json();

    if (resData.status !== 1) {
        return redirect("/searchproducts/results/" + code);
    }

    return resData;
}
