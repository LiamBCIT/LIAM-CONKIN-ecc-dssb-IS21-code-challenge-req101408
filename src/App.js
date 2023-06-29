import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './EmpListing';
import EmpCreate from './EmpCreate';
import EmpProduct from './EmpProduct';
import EmpEdit from './EmpEdit';

function App() {
  return (
    <div className="App">
      <h1>Product CRUD Project</h1>

      {/* settings routes */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />}></Route>
          <Route path='/api/create' element={<EmpCreate />}></Route>

          <Route path='/api/product/:empid' element={<EmpProduct />}></Route>
          <Route path='/api/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;


