import { LinkContainer } from "react-router-bootstrap";

import dfltImg from "../image/no-image.png";

function ProductEntry(props) {
    console.log("Product Entry Props:", props);

    const productLink = "/searchproducts/product/" + props.upc;

    return (
        <LinkContainer
            id="productEntry"
            to={productLink}
            className="flex-column d-flex bg-white p-3 m-3 rounded-3 overflow-hidden text-center border"
            style={{ height: "inherit", cursor:"pointer" }}
        >
            <div className="product-entry">
                <img
                    style={{
                        height: "400px",
                        objectFit: "contain",
                    }}
                    src={props.imgSrc || dfltImg}
                    alt={props.productName}
                />
                <p className="m-0 mt-2">
                    <strong>{props.productName}</strong>
                </p>
                <p className="m-0">{props.upc}</p>
            </div>
        </LinkContainer>
    );
}

export default ProductEntry;
