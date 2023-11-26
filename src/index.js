import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from './components/ErrorBoundary';

import RootLayout from "./routes/RootLayout";
import Home, { loader as homeLoader } from "./routes/Home";
import { ProductDetails, loader as productLoader } from "./routes/ProductDetails";
import { Search, action as searchAction } from "./routes/Search";
import { SearchResults } from "./routes/SearchResults";
import { SearchRecipes, action as searchRecipesAction } from "./routes/SearchRecipes";
import { SearchRecipesResults } from "./routes/SearchRecipesResults";
import { Recipe, loader as recipeLoader } from "./routes/Recipe"; 


const router = createBrowserRouter([
    {
        path: "/",
        element: <ErrorBoundary><RootLayout /></ErrorBoundary>,
        children: [
            { index: true, element: <ErrorBoundary><Home /></ErrorBoundary>, loader: homeLoader, action: searchAction },
            {
                path: "/searchproducts",
                element: <ErrorBoundary><Search /></ErrorBoundary>,
                children: [
                    { index: true, element: <h1>Enter a search term</h1> },
                    { path: "results/:term", element: <ErrorBoundary><SearchResults /></ErrorBoundary>, action: searchAction },
                    { path: "product/:code", element: <ErrorBoundary><ProductDetails /></ErrorBoundary>, loader: productLoader },
                ],
                action: searchAction,
            },
            {
                path: "/searchRecipes",
                element: <ErrorBoundary><SearchRecipes /></ErrorBoundary>,
                children: [
                    { index: true, element: <h1>Enter a recipe search term</h1> },
                    { path: "results/:term", element: <ErrorBoundary><SearchRecipesResults /></ErrorBoundary>, action: searchRecipesAction },
                    { path: "recipe/:recipeId", element: <ErrorBoundary><Recipe /></ErrorBoundary>, loader: recipeLoader }
                ],
                action: searchRecipesAction,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
