import React from 'react';
import renderer from 'react-test-renderer';
import MoreButton from '../src/components/presentation/Button/Button';
// import MoreButton from '../../src/components/presentation/Button/Button';

test('Testing the button component', () => {
  const component = renderer.create(
    <MoreButton handleClick={() => 'clicked more btn'} />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});