import {
    Container,
    Row,
    Col,
    InputGroup,
    Form as BsForm,
    Button,
} from "react-bootstrap";
import { Outlet, useParams, Form, redirect } from "react-router-dom";

import "./Search.css";

export function Search() {
    let { term } = useParams();

    return (
        <Container fluid="lg">
            <div className="d-flex flex-column min-vh-100">
                <Row id="searchBar" className="pt-5">
                    <Col lg="6">
                        <Form method="post">
                            <InputGroup className="mb-3">
                                <BsForm.Control
                                    placeholder="Enter an item name or upc code"
                                    defaultValue={term}
                                    name="searchTerm"
                                    size="lg"
                                />
                                <Button
                                    type="submit"
                                    className="btn-lg btn-warning"
                                >
                                    Search
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>

                <Row className="flex-grow-1 justify-content-center align-items-center">
                    <Outlet />
                </Row>
            </div>
        </Container>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const searchTerm = formData.get("searchTerm");

    return redirect("/searchproducts/product/" + searchTerm);
}
