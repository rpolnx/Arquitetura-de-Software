import React from 'react';
import './App.css';
import axios from 'axios';
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

// axios.defaults.baseURL = 'http://192.168.99.100:5000';
axios.defaults.baseURL = 'http://192.168.99.100'; // NGINX
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/categories" component={Category} />
          <Route path="/sellers" component={Seller} />
          <Route path="/suppliers" component={Supplier} />
          <Route path="/products" component={Product} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
