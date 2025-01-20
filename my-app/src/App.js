import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';

import About_us from './pages/About_us/About_us';
import Tovar from './pages/Tovar/Tovar';
import Contacts from './pages/Contacts/Contacts';
import Catalog from './pages/Catalog/Catalog';
import CatalogSearch from './pages/Catalog/CatalogSearch';
import PolicyPage from './pages/Policy/PolicyPage';
import AdmPage from './pages/AdmPage/admPage';
import AdmPageEdit from './pages/AdmPage/admPageEdit';
import Busket from './pages/Busket/Busket';
import Category from './pages/Category/Category';
import BusketCat from './pages/Busket/BusketCat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Category />} />
        <Route path="/category/:id" element={<Catalog />} />
        <Route path="/:search" element={<CatalogSearch />} />
        <Route path='/about_us' element={<About_us />} />
        <Route path='/contacts' element={<Contacts />} />
        {/* <Route path='/shops' element={<Shops/>}/>
        <Route path='/review' element={<ReviewPage/>}/> */}
        <Route path="/tovar/:id" element={<Tovar />} />
        <Route path='/admin' element={<AdmPage/>}/>
        <Route path='/admin/' element={<AdmPage/>}/>
        <Route path='/admin/edit/:id/' element={<AdmPageEdit/>}/>
        <Route path='/busket' element={<Busket/>}/>
        <Route path='/busket/:id' element={<BusketCat/>}/>
        <Route path='/policy.txt' element={<PolicyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
