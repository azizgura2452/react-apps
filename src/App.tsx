import React from 'react';
import Layout from './pages/layout';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Calculator from './components/calculator';
import Playground from './pages/playground';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/' element={<Calculator />}/>
          <Route path='/playground' element={<Playground />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
