import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddIngredient from './pages/chef/AddIngredient';
import ManageSalad from './pages/chef/ManageSalad';
import Login from './pages/auth/Login';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer'; // ✅ Import Footer
import Register from './pages/auth/Register';
import ManageChef from './pages/admin/ManageChef';
import AddChef from './pages/admin/AddChef';
import ManageOrders from './pages/admin/ManageOrders';
import CustomizationForm from './pages/user/CustomizationForm';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <AuthProvider>
          <Header /> 
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/addingredient' element={<AddIngredient />} />
              <Route path='/managesalad' element={<ManageSalad />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/managechef' element={<ManageChef />} />
              <Route path='/admin/addchef' element={<AddChef />} />
              <Route path='/manageorders' element={<ManageOrders />} />
              <Route path='/customizationform' element={<CustomizationForm />} />
              <Route path='/admin/dashboard' element={<Dashboard />} />
            </Routes>
          </main>
          <Footer /> 
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
