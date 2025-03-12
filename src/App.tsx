import React from 'react';
import Layout from './pages/layout';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Calculator from './components/calculator';
import Playground from './pages/playground';
import Timer from './components/timer';
import Header from './components/common/header';
import Datepicker from './components/datepicker';
import Datavisualization from './components/datavisualization';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index path='/' element={<Layout />} />
        <Route path='/' element={<Playground />}>
          <Route path='/calculator' element={<Calculator />} />
          <Route path='/timer' element={<Timer />} />
          <Route path='/datepicker' element={<Datepicker />} />
          <Route path='/data-visualization' element={<Datavisualization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
