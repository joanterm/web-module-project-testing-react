import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from "@testing-library/user-event"
{/* <Show show={show} selectedSeason={selectedSeason} handleSelect={handleSelect} /> */}

const dummyShowData = {
    name: "test name",
    summary: "test summary",
    seasons: [
        {
            id: "1",
            name: "season name one",
            episodes: []
        },
        {
            id: "2",
            name: "season name two",
            episodes: []
        }
    ]
}


test('renders without errors', () => {
    render(<Show show={dummyShowData} selectedSeason={"none"}/>)
 });

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)
    const loadingComponent = screen.queryByTestId("loading-container")
    expect(loadingComponent).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => {
    render(<Show show={dummyShowData} selectedSeason={"none"}/>)
    const numOfSeasonOptions = screen.queryAllByTestId("season-option")
    expect(numOfSeasonOptions).toHaveLength(2)
 });

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn()
    render(<Show show={dummyShowData} selectedSeason={"none"} handleSelect={mockHandleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i)
    userEvent.selectOptions(select, ["1"])
    expect(mockHandleSelect).toBeCalled()
 });

test('component renders when no seasons are selected and rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={dummyShowData} selectedSeason={"none"}/>)
    let allEpisodes = screen.queryByTestId("episodes-container")
    expect(allEpisodes).not.toBeInTheDocument()
    rerender(<Show show={dummyShowData} selectedSeason={1}/>)
    allEpisodes = screen.queryByTestId("episodes-container")
    expect(allEpisodes).toBeInTheDocument()
});

// Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
// Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
// Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
// Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
// Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
// Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.