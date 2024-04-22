import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Admin from './admin/Admin';
import ProductList from './scenes/productList/ProductList';
import ProductDetail from './scenes/productDetail/ProductDetail';
import PostDetail from './scenes/productDetail/PostDetail';
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
import GridViewList from './scenes/productList/GridViewList';
import AdminCategory from './admin/scenes/Category/AdminCategory';
import AdminCategoryBox from './admin/scenes/Category/AdminCategoryBox';
import AdminCategoryDetail from './admin/scenes/Category/AdminCategoryDetail';
import AdminCategoryAdd from './admin/scenes/Category/AdminCategoryAdd';
import AdminCategoryEdit from './admin/scenes/Category/AdminCategoryEdit';
import GoldPrice from './components/GoldPrice';
import USDPrice from './components/USDPrice ';
import Weather from './components/Weather';
import AdminPostBox from './admin/scenes/Post/AdminPostBox';
import AdminPostDetail from './admin/scenes/Post/AdminPostDetail';
import AdminPostAdd from './admin/scenes/Post/AdminPostAdd';
import AdminPostEdit from './admin/scenes/Post/AdminPostEdit';
import AdminPost from './admin/scenes/Post/AdminPost';
import PostList from './scenes/productList/PostList';
import PageDetail from './scenes/productDetail/PageDetail';
import PageList from './scenes/productList/PageList';
import SuccessCart from './components/SuccessCart';

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
        path: 'successcart',
        element:<SuccessCart />
      },
      {
        path: 'page',
        element:<PageList />
      },
      {
        path: 'post',
        element:<PostList />
      },
      {
        path: 'gridview',
        element:<GridViewList />
      },
      {
        path: 'weather',
        element:<Weather />
      },
      {
        path: 'goldprice',
        element:<GoldPrice />
      },
      {
        path: 'usdprice',
        element:<USDPrice />
      },
      {
        path: 'product/:id',
        element: <ProductDetail />
      },
      {
        path: 'post/:id',
        element: <PostDetail />
      },
      {
        path: 'page/:id',
        element: <PageDetail />
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
      {
        path:  'gridview/page/:pageNum',
        element: <GridViewList />
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
      {
        path: '/admin/category',
        element: <AdminCategory/>,
        children:[
          {
            index: true,
            element: <AdminCategoryBox/>,
          },
          {
            path: '/admin/category/page/:pageNum',
            element: <AdminCategoryBox/>
          },
          {
            path: '/admin/category/:id',
            element: <AdminCategoryDetail/>
          },
          {
            path: '/admin/category/add',
            element: <AdminCategoryAdd/>
          },
          {
            path: '/admin/category/edit/:id',
            element: <AdminCategoryEdit/>
          },
  
        ]
      },
      {
        path: '/admin/post',
        element: <AdminPost/>,
        children:[
          {
            index: true,
            element: <AdminPostBox/>,
          },
          {
            path: '/admin/post/page/:pageNum',
            element: <AdminPostBox/>
          },
          {
            path: '/admin/post/:id',
            element: <AdminPostDetail/>
          },
          {
            path: '/admin/post/add',
            element: <AdminPostAdd/>
          },
          {
            path: '/admin/post/edit/:id',
            element: <AdminPostEdit/>
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
