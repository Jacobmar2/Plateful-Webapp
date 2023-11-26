import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NutritionFacts from './NutritionFacts'; // Adjust the path accordingly

// Mock product data for testing
const nutella = {
  serving_size: '15g',
  nutriments: {
    energy: 80.8,
  },
};

test('renders Nutrition Facts component with default values', () => {
  render(<NutritionFacts productData={nutella} />);
  // Add your assertions here
  // For example:
  expect(screen.getByText('Nutrition Facts')).toBeInTheDocument();
  expect(screen.getByText('Serving size: 15g')).toBeInTheDocument();
  // Add more assertions based on your component's output
});

test('Custom weight amount of 150g', () => {
    render(<NutritionFacts productData={nutella} />);
  
    const inputWeight = screen.getByPlaceholderText("Weight");

    fireEvent.change(inputWeight, { target: { value: '150' } });

    const getEnergyValue = screen.getByText(/energy-kcal/);

    expect(inputWeight.value).toBe('150');
    expect(getEnergyValue).toBe('100');

  });

test('Custom serving amount of 3', () => {
  render(<NutritionFacts productData={nutella} />);

  const inputServing = screen.getByPlaceholderText("Servings");

  fireEvent.change(inputServing, { target: { value: '3' } });

  expect(inputServing.value).toBe('3');
});