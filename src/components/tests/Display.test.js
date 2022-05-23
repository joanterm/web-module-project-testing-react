import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetch from "./../../api/fetchShow"
jest.mock("./../../api/fetchShow")

{/* <Display displayFun={displayFunc}/> */}

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

test('renders without errors with no props', async () => {
    render(<Display />)
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetch.mockResolvedValueOnce(dummyShowData)
    render(<Display />)
    const button = screen.getByRole("button")
    userEvent.click(button)
    const show = await screen.findByTestId("show-container")
    expect(show).toBeInTheDocument()

 });

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetch.mockResolvedValueOnce(dummyShowData)
    render(<Display />)
    const button = screen.getByRole("button")
    userEvent.click(button)
    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId("season-option")
        expect(seasonOptions).toHaveLength(2)
    })
 });


// Test that the Display component renders without any passed in props.
// Rebuild or copy the show test data element as used in the previous set of tests.
// Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
