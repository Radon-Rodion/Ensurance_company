import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

export const Context = createContext(null)

ReactDOM.render(
    <div>Hello, guy!</div>,
  document.getElementById('root')
);

