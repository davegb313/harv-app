import React from 'react';

import Navbar from './components/navbar';
import Form from './components/form-section';
import './App.css';

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Form />
      <div className='result'></div>
    </React.Fragment>
  )
};

export default App;
