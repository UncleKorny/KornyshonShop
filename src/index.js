import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductScreen from './components/ProductScreen';
import NotFound from './components/NotFound';
import { StoreProvider } from './Store';
import CartScreen from './components/CartScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import DashboardScreen from './adminComponents/DashboardScreen';
import ProductsScreen from './adminComponents/ProductsScreen';
import OrdersScreen from './adminComponents/OrdersScreen';
import SettingsScreen from './userProfileComponents/SettingsScreen';
import ProtectedRoute from './components/ProtectedRoute';
import OrderHistoryScreen from './userProfileComponents/OrderHistoryScreen';
import AdminUsers from './adminComponents/AdminUsers';
import AdminRoute from './protect/AdminRoute';
import ModerRoute from './protect/ModerRoute';
import Support from './components/Support';
import MailingScreen from './adminComponents/MailingScreen';
import Presents from './components/Presents';
import PresentScreen from './components/PresentScreen';
import Simvolika from './components/Simvolika';
import SimvolikaScreen from './adminComponents/SimvolikaScreen';
import SimvolikaScrn from './components/SimvolikaScrn';
import Shipping from './components/Shipping';
import Maps from './components/Maps';
import Books from './components/Books';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/presents' element={<Presents/>}/>
          <Route path='/presents/:present' element={<PresentScreen/>}/>;
          <Route path='/simvolika' element={<Simvolika/>}/>;
          <Route path='/simvolika/:simvolika' element={<SimvolikaScrn/>}/>;
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/products/:slug' element={<ProductScreen/>}/>;
          <Route path='*' element={<NotFound/>}/>;
          <Route path='/cart' element={<CartScreen/>}/>;
          <Route path='/signin' element={<SignInScreen/>}/>;
          <Route path='/signup' element={<SignUpScreen/>}/>;
          <Route path='/support' element={<Support/>}/>;
          <Route path='/maps' element={<Maps/>}/>;
          <Route path='/books' element={<Books/>}/>;
          
          {/* UserProfile routes */}
          <Route path='/user/settings' element={<ProtectedRoute><SettingsScreen/></ProtectedRoute>}/>
          <Route path='/user/orderhistory' element={<ProtectedRoute><OrderHistoryScreen/></ProtectedRoute>}/>

          {/* Admin routes */}
          <Route path='/admin/dashboard' element={<AdminRoute><DashboardScreen/></AdminRoute>}/>
          <Route path='/admin/orders' element={<AdminRoute><OrdersScreen/></AdminRoute>}/>
          <Route path='/admin/products' element={<ModerRoute><ProductsScreen/></ModerRoute>}/>
          <Route path='/admin/simvolika' element={<ModerRoute><SimvolikaScreen/></ModerRoute>}/>
          <Route path='/admin/users' element={<AdminRoute><AdminUsers/></AdminRoute>}/>
          <Route path='/admin/mailing' element={<AdminRoute><MailingScreen/></AdminRoute>}/>
        </Routes>
      {/* <App /> */}
      <Footer/>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);