import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import RecipeEntry from "../components/RecipeEntry";

import { Pagination } from "../components/Pagination";

import "./SearchResults.css";

export function SearchRecipesResults() {
    const resultsPerPage = 12;

    const [pageOffset, setPageOffset] = useState(0);
    const [resultsLoading, setResultsLoading] = useState(true);
    const [pageResults, setPageResults] = useState({});
    const { term } = useParams();

    useEffect(() => {
        setResultsLoading(true);
        fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${term}&number=${resultsPerPage}&offset=${pageOffset}&apiKey=c714962bbc204592a03452c7f01e3abd`
        )
            .then((res) => res.json())
            .then((res) => {
                setPageResults(res);
                setResultsLoading(false);
            });
    }, [pageOffset, term]);

    function handlePageNavigation(page) {
        setPageOffset((page - 1) * resultsPerPage);
        window.scrollTo(0, 0);
    }

    if (resultsLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    } else if (pageResults.results.length === 0) {
        return (
            <Col lg={8}>
                <h1 className="display-6">No results for "{term}"</h1>
                <div className="large">
                    Try searching for a different recipe
                </div>
            </Col>
        );
    }

    let pageCount = Math.ceil(pageResults.totalResults / resultsPerPage);
    let pageNumber = pageResults.offset / resultsPerPage + 1;

    let firstItemOnPage = pageResults.offset + 1;
    let lastItemOnPage = pageResults.offset + pageResults.results.length;

    return (
        <>
            <Row
                id="searchResults"
                className="justify-content-center align-items-stretch recipe-row"
            >
                {pageResults.results.map((recipe, i) => {

                    return (
                        <Col key={"reCol" + i} lg="4" className="p-0 recipe">
                            <RecipeEntry
                                productName={recipe.title}
                                imgSrc={recipe.image}
                                recipeId={recipe.id}
                            />
                        </Col>
                    );
                })}
            </Row>
            <Row id="searchResultsPagination" className="text-center mt-4">
                <Pagination
                    pageCount={pageCount}
                    currentPage={pageNumber}
                    onPageClick={handlePageNavigation}
                />
                <p>
                    {firstItemOnPage}-{lastItemOnPage} of{" "}
                    {pageResults.totalResults}
                </p>
            </Row>
        </>
    );
}
