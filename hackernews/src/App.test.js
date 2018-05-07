import React from 'react';
import ReactDOM from 'react-dom';
import App, {
  Search,
  Table,
  Button
} from './App';
import renderer from 'react-test-renderer';
import {
  shallow
} from 'enzyme';

// describe('App', () => {
//   // it('renders without crashing', () => {
//   //   const div = document.createElement("div");
//   //   ReactDOM.render(<App />, div);
//   // });

//   test('has a valid snapshot', () => {
//     const component = renderer.create(
//       <Search />
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// Enzyme
describe('浅渲染 test', () => {
  const props = {
    list: [{
        title: '1',
        author: '1',
        num_comments: 1,
        points: 2,
        objectID: 'y'
      },
      {
        title: '2',
        author: '2',
        num_comments: 1,
        points: 2,
        objectID: 'z'
      },
    ],
  };

  it('should behave...', () => {
    const element = shallow(<Table {...props} />);
    expect(element.find('.table-row').length).toBe(2);
  });

});