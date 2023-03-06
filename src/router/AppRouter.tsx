import { Route, Routes } from 'react-router-dom';
import { PageRouter } from './PageRouter';

export const App = () => {
  return (
        <Routes> 
            <Route path="/*" element={ <PageRouter />} />
        </Routes>
  )
}