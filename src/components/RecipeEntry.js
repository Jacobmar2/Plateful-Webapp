import { Link } from "react-router-dom";
import dfltImg from "../image/no-image.png";
import { Card } from 'react-bootstrap';

function RecipeEntry(props) {
    let imgSrc = props.imgSrc || dfltImg;

    const recipeLink = "/SearchRecipes/recipe/"+props.recipeId;

    return (
        <Link to={recipeLink} className="text-decoration-none">
            <Card
                id="productEntry"
                className="flex-column d-flex bg-white p-3 m-3 rounded-3 overflow-hidden text-center border"
                style={{ height: "inherit", cursor: "pointer", textDecoration: 'none' }}
            >
                <div className="product-entry">
                    <Card.Img
                        style={{
                            height: "400px",
                            objectFit: "contain",
                        }}
                        src={imgSrc}
                        alt={props.productName}
                    />
                    <Card.Text className="m-0 mt-2">
                        <strong>{props.productName}</strong>
                    </Card.Text>
                </div>
            </Card>
        </Link>
    );
}

export default RecipeEntry;
