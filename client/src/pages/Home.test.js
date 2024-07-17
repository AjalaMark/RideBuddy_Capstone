// src/pages/Home.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Home";

describe("HomePage", () => {
  test("should render the Navbar component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByTestId("navbar-testid")).toBeInTheDocument();
  });

  test("should render the SearchBar component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByPlaceholderText("Enter origin")).toBeInTheDocument();
  });

  test("should render the Footer component", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText("Contact Information")).toBeInTheDocument();
  });

  test("should render the Signup section", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(
      screen.getByText(
        "Create your RideBuddy account in just a few simple steps."
      )
    ).toBeInTheDocument();
  });

  test("should render the About RideBuddy section", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText("About RideBuddy")).toBeInTheDocument();
  });

  test("should render the testimonials section", () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(
      screen.getByText(
        /RideBuddy has been a game-changer for my daily commute/i
      )
    ).toBeInTheDocument();
  });
});
