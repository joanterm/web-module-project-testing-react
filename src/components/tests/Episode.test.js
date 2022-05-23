import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

{/* <Episode episode={episode} /> */}

const dummyTest = {
    //this could be any data pulled out from API
    id: 1,
    name: "",
    image: "https://i.ibb.co/2FsfXqM/stranger-things.png",
    season: 1,
    number: 1,
    summary: "test summary not in dom",
    runtime: 1
}

const dummyTestWithoutImage = {
    //this could be any data pulled out from API
    id: 1,
    name: "",
    image: null,
    season: 1,
    number: 1,
    summary: "test summary not in dom",
    runtime: 1
}

test("renders without error", () => { 
    render(<Episode episode={dummyTest}/>)
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={dummyTest}/>)
    const summary = screen.queryByText(/test summary not in dom/i)
    expect(summary).toBeInTheDocument()
    expect(summary).toBeTruthy()
    expect(summary).toHaveTextContent("test summary not in dom")
 });

test("renders default image when image is not defined", () => {
    render(<Episode episode={dummyTestWithoutImage} />)
    const image = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    expect(image).toBeInTheDocument()
 })

// Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
// Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use at least then 3 different types of expect statements to test the the existence of the summary value.
// The episode component displays a default value ('https://i.ibb.co/2FsfXqM/stranger-things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.