import { useState } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";

import "./NutritionFacts.css";

function NutritionFacts({ productData }) {
    const [inputWeight, setInputWeight] = useState(100);
    const [inputServings, setInputServings] = useState(1);

    let nutrientData = productData.nutriments;

    let nutritionTable = [];

    function buildNutritionTableRecursive(inputArray, tabs) {
        inputArray?.forEach((nutrientEntry) => {
            const outputUnit = nutrientEntry.unit || "";

            const key100g = nutrientEntry.key + "_100g";
            const keyServing = nutrientEntry.key + "_serving";

            const data100gAvail = key100g in nutrientData;
            const dataServingAvail = keyServing in nutrientData;

            let nextTabs = tabs;

            if (data100gAvail || dataServingAvail) {
                let val100g = 0;
                let valserving = 0;

                if (data100gAvail) {
                    val100g = nutrientData[key100g];
                    if (outputUnit === "µg") {
                        val100g *= 1000000;
                    } else if (outputUnit === "mg") {
                        val100g *= 1000;
                    }

                    if (outputUnit !== "% vol" && outputUnit !== "") {
                        val100g = (val100g * inputWeight) / 100;
                    }

                    val100g = +val100g.toFixed(2);
                }

                if (dataServingAvail) {
                    valserving = nutrientData[keyServing];
                    if (outputUnit === "µg") {
                        valserving *= 1000000;
                    } else if (outputUnit === "mg") {
                        valserving *= 1000;
                    }

                    if (outputUnit !== "% vol" && outputUnit !== "") {
                        valserving = valserving * inputServings;
                    }

                    valserving = +valserving.toFixed(2);
                }

                nutritionTable.push(
                    <Row key={key100g}>
                        <Col xs="4" className="p-0 text-break">
                            <p
                                className={
                                    "m-0 " + (nutrientEntry?.bold && "fw-bold")
                                }
                                style={{ paddingLeft: `${tabs}rem` }}
                            >
                                {nutrientEntry.label}
                            </p>
                        </Col>
                        <Col xs="4" className="py-0">
                            {data100gAvail && val100g + " " + outputUnit}
                        </Col>
                        <Col xs="4" className="py-0">
                            {dataServingAvail && valserving + " " + outputUnit}
                        </Col>
                    </Row>
                );

                nutritionTable.push(
                    <Row
                        key={key100g + "row"}
                        className="border-bottom border-1 border-black"
                    ></Row>
                );
                nextTabs++;
            }
            buildNutritionTableRecursive(nutrientEntry.children, nextTabs);
        });
    }

    buildNutritionTableRecursive(nutrient_entries, 0);

    nutritionTable.pop();

    function weightChangeHandler(event) {
        if (event.target.value >= 0) {
            setInputWeight(event.target.value);
        }
    }

    function servingsChangeHandler(event) {
        if (event.target.value >= 0) {
            setInputServings(event.target.value);
        }
    }

    return (
        <Row
            id="nutritionFacts"
            className="mx-0 border border-3 border-black p-2"
        >
            <Col>
                <Row>
                    <h1 className="p-0 m-0">Nutrition Facts</h1>
                </Row>
                <Row className="border-bottom border-3 border-black align-items-center">
                    <Col xs="4" className="p-0">
                        {"serving_size" in productData &&
                            "Serving size: " + productData.serving_size}
                    </Col>
                    <Col xs="4" className="py-0">
                        Per <strong>{inputWeight || 0}</strong> g or ml
                    </Col>
                    <Col xs="4" className="py-0">
                        Per <strong>{inputServings || 0}</strong> serving
                        {Number(inputServings) !== 1 && "s"}
                    </Col>
                </Row>
                {nutritionTable}
                <Row className="border-top border-3 border-black"></Row>
                <Row className="align-items-center">
                    <Col xs="4" className="ps-0 pt-1">
                        Custom Amounts
                    </Col>
                    <Col xs="4" className="ps-1 pt-1">
                        <InputGroup>
                            <Form.Control
                                type="number"
                                className="p-0 ps-2"
                                placeholder="0"
                                value={inputWeight}
                                onChange={weightChangeHandler}
                            ></Form.Control>
                            <Button
                                title="Press to reset."
                                className="py-0"
                                onClick={() => setInputWeight(100)}
                            >
                                g or ml
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs="4" className="ps-1 pt-1 pe-2">
                        <InputGroup>
                            <Form.Control
                                type="number"
                                className="p-0 ps-2"
                                placeholder="0"
                                value={inputServings}
                                onChange={servingsChangeHandler}
                            ></Form.Control>
                            <Button
                                title="Press to reset."
                                className="py-0"
                                onClick={() => setInputServings(1)}
                            >
                                servings
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default NutritionFacts;

/*
 * This array encodes the structure and formatting of the nutrition table. Almost every nutrient that can appear in an OFF product query is encoded in this array.
 *
 * The nesting and order of nutrients is loosely based off the Nutrition Labelling standards of Health Canada
 * (https://www.canada.ca/en/health-canada/services/technical-documents-labelling-requirements/directory-nutrition-facts-table-formats/nutrition-labelling.html#a22)
 */
const nutrient_entries = [
    { key: "energy-kcal", label: "Energy kcal", unit: "kcal", bold: true },
    { key: "energy", label: "Energy kj", unit: "kj", bold: true },
    {
        key: "energy-from-fat",
        label: "Energy From Fat",
        unit: "kj",
    },

    {
        key: "fat",
        label: "Total Fat",
        unit: "g",
        bold: true,
        children: [
            {
                key: "saturated-fat",
                label: "Saturated Fat",
                unit: "g",
                children: [
                    {
                        key: "butyric-acid",
                        label: "Butyric Acid",
                        unit: "g",
                    },
                    {
                        key: "caproic-acid",
                        label: "Caproic Acid",
                        unit: "g",
                    },
                    {
                        key: "caprylic-acid",
                        label: "Caprylic Acid",
                        unit: "g",
                    },
                    {
                        key: "capric-acid",
                        label: "Capric Acid",
                        unit: "g",
                    },
                    {
                        key: "lauric-acid",
                        label: "Lauric Acid",
                        unit: "g",
                    },
                    {
                        key: "myristic-acid",
                        label: "Myristic Acid",
                        unit: "g",
                    },
                    {
                        key: "palmitic-acid",
                        label: "Palmitic Acid",
                        unit: "g",
                    },
                    {
                        key: "stearic-acid",
                        label: "Stearic Acid",
                        unit: "g",
                    },
                    {
                        key: "arachidic-acid",
                        label: "Arachidic Acid",
                        unit: "g",
                    },
                    {
                        key: "behenic-acid",
                        label: "Behenic Acid",
                        unit: "g",
                    },
                    {
                        key: "lignoceric-acid",
                        label: "Lignoceric Acid",
                        unit: "g",
                    },
                    {
                        key: "cerotic-acid",
                        label: "Cerotic Acid",
                        unit: "g",
                    },
                    {
                        key: "montanic-acid",
                        label: "Montanic Acid",
                        unit: "g",
                    },
                    {
                        key: "melissic-acid",
                        label: "Melissic Acid",
                        unit: "g",
                    },
                ],
            },
            {
                key: "unsaturated-fat",
                label: "Unsaturated Fat",
                unit: "g",
                children: [
                    {
                        key: "monounsaturated-fat",
                        label: "Monounsaturated Fat",
                        unit: "g",
                        children: [
                            {
                                key: "oleic-acid",
                                label: "Oleic Acid",
                                unit: "g",
                            },
                            {
                                key: "elaidic-acid",
                                label: "Elaidic Acid",
                                unit: "g",
                            },
                            {
                                key: "erucic-acid",
                                label: "Erucic Acid",
                                unit: "g",
                            },
                            {
                                key: "nervonic-acid",
                                label: "Nervonic Acid",
                                unit: "g",
                            },
                            {
                                key: "gondoic-acid",
                                label: "Gondoic Acid",
                                unit: "g",
                            },
                        ],
                    },
                    {
                        key: "polyunsaturated-fat",
                        label: "Polyunsaturated Fat",
                        unit: "g",

                        children: [
                            {
                                key: "linoleic-acid",
                                label: "Linoleic Acid",
                                unit: "g",
                            },
                            {
                                key: "gamma-linolenic-acid",
                                label: "Gamma-linolenic Acid",
                                unit: "g",
                            },
                            {
                                key: "alpha-linolenic-acid",
                                label: "Alpha-linolenic Acid",
                                unit: "g",
                            },
                            {
                                key: "eicosapentaenoic-acid",
                                label: "Eicosapentaenoic Acid",
                                unit: "g",
                            },
                            {
                                key: "mead-acid",
                                label: "Mead Acid",
                                unit: "g",
                            },
                            {
                                key: "dihomo-gamma-linolenic-acid",
                                label: "Dihomo-gamma-linolenic Acid",
                                unit: "g",
                            },
                            {
                                key: "arachidonic-acid",
                                label: "Arachidonic Acid",
                                unit: "g",
                            },
                            {
                                key: "docosahexaenoic-acid",
                                label: "Docosahexaenoic Acid",
                                unit: "g",
                            },
                            {
                                key: "omega-3-fat",
                                label: "Omega-3 Fat",
                                unit: "g",
                            },
                            {
                                key: "omega-6-fat",
                                label: "Omega-6 Fat",
                                unit: "g",
                            },
                            {
                                key: "omega-9-fat",
                                label: "Omega-9 Fat",
                                unit: "g",
                            },
                        ],
                    },
                    {
                        key: "trans-fat",
                        label: "Trans Fat",
                        unit: "g",
                    },
                ],
            },
        ],
    },

    {
        key: "carbohydrates",
        label: "Total Carbohydrates",
        unit: "g",
        bold: true,
        children: [
            {
                key: "fiber",
                label: "Dietary Fiber",
                unit: "g",

                children: [
                    {
                        key: "insoluble-fiber",
                        label: "Insoluble Fiber",
                        unit: "g",
                    },
                    {
                        key: "soluble-fiber",
                        label: "Soluble Fiber",
                        unit: "g",
                    },
                ],
            },
            { key: "starch", label: "Starch", unit: "g" },
            {
                key: "maltodextrins",
                label: "Maltodextrins",
                unit: "g",
            },
            {
                key: "sugars",
                label: "Sugars",
                unit: "g",

                children: [
                    {
                        key: "fructose",
                        label: "Fructose",
                        unit: "g",
                    },
                    {
                        key: "glucose",
                        label: "Glucose",
                        unit: "g",
                    },
                    {
                        key: "lactose",
                        label: "Lactose",
                        unit: "g",
                    },
                    {
                        key: "maltose",
                        label: "Maltose",
                        unit: "g",
                    },
                    {
                        key: "sucrose",
                        label: "Sucrose",
                        unit: "g",
                    },
                    {
                        key: "alcohol",
                        label: "Alcohol",
                        unit: "% vol",
                    },
                    {
                        key: "inositol",
                        label: "Inositol",
                        unit: "g",
                    },
                    {
                        key: "added-sugars",
                        label: "Added Sugars",
                        unit: "g",
                    },
                    {
                        key: "glycemic-index",
                        label: "Glycemic Index",
                    },
                ],
            },
        ],
    },

    {
        key: "proteins",
        label: "Protein",
        unit: "g",
        bold: true,
        children: [
            { key: "casein", label: "Casein", unit: "g" },
            {
                key: "serum-proteins",
                label: "Serum Proteins",
                unit: "g",
            },
        ],
    },

    { key: "cholesterol", label: "Cholesterol", unit: "mg", bold: true },

    {
        key: "salt",
        label: "Salt",
        unit: "mg",
        bold: true,
        children: [
            { key: "sodium", label: "Sodium", unit: "mg" },
            { key: "added-salt", label: "Added Salt", unit: "mg" },
        ],
    },

    { key: "potassium", label: "Potassium", unit: "mg" },
    { key: "calcium", label: "Calcium", unit: "mg" },
    { key: "iron", label: "Iron", unit: "mg" },
    { key: "vitamin-a", label: "Vitamin A", unit: "µg" },
    { key: "vitamin-c", label: "Vitamin C", unit: "mg" },
    { key: "vitamin-d", label: "Vitamin D", unit: "µg" },
    { key: "vitamin-e", label: "Vitamin E", unit: "mg" },
    { key: "vitamin-k", label: "Vitamin K", unit: "µg" },
    { key: "phylloquinone", label: "Phylloquinone", unit: "µg" },
    { key: "vitamin-b1", label: "Thiamine", unit: "mg" },
    { key: "vitamin-b2", label: "Riboflavin", unit: "mg" },
    { key: "vitamin-pp", label: "Niacin", unit: "mg" },
    { key: "vitamin-b6", label: "Vitamin B6", unit: "mg" },
    { key: "vitamin-b9", label: "Folate", unit: "µg" },
    { key: "folates", label: "Folate", unit: "µg" },
    { key: "vitamin-b12", label: "Vitamin B12", unit: "µg" },
    { key: "biotin", label: "Biotin", unit: "µg" },
    { key: "pantothenic-acid", label: "Pantothenate", unit: "mg" },
    { key: "choline", label: "Choline", unit: "mg" },
    { key: "phosphorus", label: "Phosphorus", unit: "mg" },
    { key: "iodine", label: "Iodine", unit: "µg" },
    { key: "magnesium", label: "Magnesium", unit: "mg" },
    { key: "zinc", label: "Zinc", unit: "mg" },
    { key: "selenium", label: "Selenium", unit: "µg" },
    { key: "copper", label: "Copper", unit: "mg" },
    { key: "manganese", label: "Manganese", unit: "mg" },
    { key: "chromium", label: "Chromium", unit: "µg" },
    { key: "molybdenum", label: "Molybdenum", unit: "µg" },
    { key: "chloride", label: "Chloride", unit: "mg" },
    { key: "fluoride", label: "Flouride", unit: "mg" },

    { key: "beta-carotene", label: "Beta-carotene", unit: "µg" },
    { key: "beta-glucan", label: "Beta-glucan", unit: "mg" },
    { key: "bicarbonate", label: "Bicarbonate", unit: "mg" },
    { key: "caffeine", label: "Caffeine", unit: "mg" },
    { key: "carnitine", label: "Carnitine", unit: "mg" },
    { key: "chlorophyl", label: "Chlorophyl", unit: "mg" },
    { key: "nitrate", label: "Nitrate", unit: "mg" },
    { key: "nucleotides", label: "Nucleotides", unit: "g" },
    { key: "polyols", label: "Polyols", unit: "g" },
    { key: "erythritol", label: "Erythritol", unit: "g" },
    { key: "silica", label: "Silica", unit: "mg" },
    { key: "sulphate", label: "Sulphate", unit: "mg" },
    { key: "fr-sulfate", label: "Sulphate", unit: "mg" },
    { key: "taurine", label: "Taurine", unit: "mg" },

    { key: "ph", label: "PH" },
];
