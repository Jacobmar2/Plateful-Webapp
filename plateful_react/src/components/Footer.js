import { Col, Container, Row } from "react-bootstrap";
import { ChevronUp } from "react-bootstrap-icons";

import "./Footer.css";

function Footer() {
    function handleScrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <footer className="footer text-center mt-auto">
            <div id="footer-image">
                <div className="py-5 h-100">
                    <Container fluid="lg">
                        <Row>
                            <Col lg={6}>
                                <h1>
                                    Serving up Delight, One Plateful at a Time!
                                </h1>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Container fluid className="bg-darkgreen py-3">
                <button
                    id="upButton"
                    type="button"
                    onClick={handleScrollToTop}
                    className="text-decoration-none"
                >
                    <ChevronUp color="white" size={24} />
                    <p className="text-white">back to top</p>
                </button>
            </Container>
        </footer>
    );
}

export default Footer;
