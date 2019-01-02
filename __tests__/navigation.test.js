import React from "react";
import renderer from "react-test-renderer";
import Navigation from "../src/components/container/Navigation/index";
// import MoreButton from '../../src/components/presentation/Button/Button';

test("Testing the navigation component", () => {
  const component = renderer.create(<Navigation />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
