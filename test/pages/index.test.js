import React from "react";
import { render, screen } from "../test-utils";

import HomePage from '../../src/pages/home/index'

describe("Index page", () => {
  it("should render", () => {
    render(<HomePage />);
  });
});

test('renders learn react link', () => {
  const { getByText } = render(<HomePage />);

  expect(getByText("John")).toBeTruthy();
});

