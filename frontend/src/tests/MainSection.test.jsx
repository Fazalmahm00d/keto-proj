import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import MainSection from "../components/MainSection";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("MainSection Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <BrowserRouter>
        <MainSection />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/LESS CARBS,/i)).toBeInTheDocument();
    expect(screen.getByText(/KETO FRIENDLY LOW CARB 100% GLUTEN FREE/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Order btn/i })).toBeInTheDocument();
  });

  it("navigates to /menu when the button is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <MainSection />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Order btn/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/menu");
  });
});