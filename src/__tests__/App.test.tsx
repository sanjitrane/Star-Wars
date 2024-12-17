import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";

jest.mock("../components/Header/Header", ()=>()=><div data-testid="header">Header Component</div>);
jest.mock("../components/Toolbar/Toolbar", ()=>()=><div data-testid="toolbar">Toolbar Component</div>);
jest.mock("../Layout", ()=>()=><div data-testid="layout">Layout Component</div>);

describe("App Component",()=>{
  it("renders Header Component",()=>{
    render(<App/>);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Header Component');
  });

  it("renders Toolbar Component",()=>{
    render(<App/>);
    const headerElement = screen.getByTestId('toolbar');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveTextContent('Toolbar Component');
  });

  it('renders Layout component inside the container', () => {
    const {container} = render(<App />);
    const layoutElement = screen.getByTestId('layout');
    const containerElement = container.querySelector('.container');
    
    expect(containerElement).toBeInTheDocument();
    expect(layoutElement).toBeInTheDocument();
    expect(layoutElement).toHaveTextContent('Layout Component');
  });

  it('has the correct structure with container class', () => {
    const {container} = render(<App />);
    const containerDiv = container.querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });
})