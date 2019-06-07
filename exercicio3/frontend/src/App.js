import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from './components/Dashboard/Dashboard'
import Header from './components/Header/Header';
import Index from './components/Index/Index';
import Category from './components/Category/Category';
import Footer from './components/Footer/Footer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import Seller from './components/Seller/Seller';
import Supplier from './components/Supplier/Supplier';
import Product from './components/Product/Product';


library.add(faUser, faTrashAlt, faEdit)

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Index} exact /> {/* This tells to find the exact */}
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/categories" component={Category} />
          <Route path="/sellers" component={Seller} />
          <Route path="/suppliers" component={Supplier} />
          <Route path="/products" component={Product} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
