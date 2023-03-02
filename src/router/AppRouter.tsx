import { Route, Routes } from 'react-router-dom';
import { RouterPage } from './PageRouter';

export const AppRouter = () => {
  return (
        <Routes> 
            <Route path="/*" element={ <RouterPage />} />
        </Routes>
  )
}