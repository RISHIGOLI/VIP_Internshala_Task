import React, { useState, useEffect } from 'react';

import TradeListPage from './Pages/TradeListPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import OrderListPage from './Pages/OrderListPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<TradeListPage/>}/>
        <Route exact path='/orders' element={<OrderListPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
