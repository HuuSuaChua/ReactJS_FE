import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';
import ProductList from './scenes/productList/ProductList';
import ProductDetail from './scenes/productDetail/ProductDetail';
import Home from './scenes/home/Home';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import CartMenu from './scenes/global/CartMenu';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import store from './scenes/state/store';
import Dashboard from './admin/scenes/Dashboard';
import AdminProduct from './admin/scenes/Product/AdminProduct';
import AdminProductBox from './admin/scenes/Product/AdminProductBox';
import AdminProductDetail from './admin/scenes/Product/AdminProductDetail';
import AdminProductAdd from './admin/scenes/Product/AdminProductAdd';
import AdminProductEdit from './admin/scenes/Product/AdminProductEdit';
import Register from './auth/Register';
import Login from './auth/Login';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register',
        element: <Register/>,
      },
      {
        path:'login',
        element: <Login/>,
      },
      {
        path: 'product',
        element:<ProductList />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'checkout',
        element: <Checkout/>
      },
      {
        path: 'checkout/success',
        element: <Confirmation/>
      },
      {
        path: 'cart',
        element: <CartMenu/>
      },
      {
          path:  'products/page/:pageNum',
          element: <ProductList />
      },
    ]
  },
  {
    path: '/admin',
    element: <Admin/>,
    children: [
      {
        index: true,
        element: <Dashboard/>
      },
      {
        path: '/admin/product',
        element: <AdminProduct/>,
        children:[
          {
            index: true,
            element: <AdminProductBox/>,
          },
          {
            path: '/admin/product/page/:pageNum',
            element: <AdminProductBox/>
          },
          {
            path: '/admin/product/:id',
            element: <AdminProductDetail/>
          },
          {
            path: '/admin/product/add',
            element: <AdminProductAdd/>
          },
          {
            path: '/admin/product/edit/:id',
            element: <AdminProductEdit/>
          }
        ]
      },
    ],
  }
])
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
