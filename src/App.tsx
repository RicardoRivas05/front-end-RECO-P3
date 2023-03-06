import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { PageRouter } from './router/PageRouter';

const App = () =>(
  <BrowserRouter>
    <PageRouter />
  </BrowserRouter>
)

export default App
