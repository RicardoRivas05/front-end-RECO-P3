import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

const App:FC = () =>(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
)

export default App
