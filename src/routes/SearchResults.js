import { useState, useEffect } from "react";

import { Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductEntry from "../components/ProductEntry";
import Pagination from "../components/Pagination";

import "./SearchResults.css";

export function SearchResults() {
    const [pageNumber, setPageNumber] = useState(1);
    const [resultsLoading, setResultsLoading] = useState(true);
    const [pageResults, setPageResults] = useState({});
    const { term } = useParams();

    useEffect(() => {
        setResultsLoading(true);
        fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${term}&search_simple=1&json=1&lc=en:Canada&fields=code,product_name,image_url&page=${pageNumber}&sort_by=popularity_key`
        )
            .then((res) => res.json())
            .then((res) => {
                setPageResults(res);
                setResultsLoading(false);
            });
    }, [pageNumber, term]);

    function handlePageNavigation(page) {
        setPageNumber(page);
        window.scrollTo(0, 0);
    }

    if (resultsLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    } else if (Number(pageResults.count) === 0) {
        return (
            <Col lg={8}>
                <h1 className="display-6">No results for "{term}"</h1>
                <div className="large">Try searching for a different item</div>
            </Col>
        );
    }

    let pageCount = Math.ceil(pageResults.count / pageResults.page_size);

    let firstItemOnPage = pageResults.skip + 1;
    let lastItemOnPage = pageResults.skip + pageResults.page_count;

    return (
        <>
            <Row
                id="searchResults"
                className="justify-content-center align-items-stretch"
            >
                {pageResults.products.map((item, i) => (
                    <Col key={"peCol" + i} lg="4" className="p-0 products">
                        <ProductEntry
                            key={"pe" + i}
                            productName={item.product_name}
                            upc={item.code}
                            imgSrc={item.image_url}
                        />
                    </Col>
                ))}
            </Row>

            <Row id="searchResultsPagination" className="text-center mt-4">
                <Pagination
                    pageCount={pageCount}
                    currentPage={pageNumber}
                    onPageClick={handlePageNavigation}
                />
                <p>
                    {firstItemOnPage}-{lastItemOnPage} of {pageResults.count}
                </p>
            </Row>
        </>
    );
}
