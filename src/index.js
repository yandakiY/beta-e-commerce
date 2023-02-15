import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter , Outlet, RouterProvider} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Setting, { submitArt, submitCat } from './components/Setting';
import {Provider, useSelector} from 'react-redux'
import store from './store';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// *****
// const lists = useSelector(state => state.lists.lists)
// const category = useSelector(state => state.category.category)
// *****
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path:'/about',
    element:<About />,
    errorElement: <ErrorPage />,
  }
  ,
  {
    path:'/settings',
    element:<Setting />,
    errorElement: <ErrorPage />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
   <React.StrictMode>
   
      <RouterProvider router={router} />
    
  </React.StrictMode></Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
