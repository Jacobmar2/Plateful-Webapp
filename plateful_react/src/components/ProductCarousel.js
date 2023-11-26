import { Dot } from "react-bootstrap-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ProductEntry from "./ProductEntry";
import "./ProductCarousel.css";

function ProductCarousel({ products }) {
    var settings = {
        dots: true,
        customPaging: function (i) {
            return <Dot />;
        },
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        products &&
        products.length > 0 && (
            <div id="product-carousel" className="d-flex flex-column p-5 gap-2">
                <h1 className="d-flex justify-content-center">
                    Popular Products
                </h1>
                <Slider {...settings} className="d-flex justify-content-center">
                    {products.map((item, i) => (
                        <ProductEntry
                            key={i}
                            productName={item.product_name}
                            upc={item.code}
                            imgSrc={item.image_url}
                        />
                    ))}
                </Slider>
            </div>
        )
    );
}

export default ProductCarousel;
