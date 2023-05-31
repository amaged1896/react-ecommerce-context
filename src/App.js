import { RouterProvider, createBrowserRouter, createHashRouter, } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import ProductContextProvider from './Context/ProductContext';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUser();
    }
  }, []);

  function saveUser() {
    // get token from local storage
    let encodedToken = localStorage.getItem('token');
    // decode token
    let decoded = jwtDecode(encodedToken);
    // save user token
    // console.log(decoded);
    setUserData(decoded);
  }

  const routes = createHashRouter([
    {
      path: '', element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoutes><Home /> </ProtectedRoutes> },
        { path: "login", element: <Login saveUser={saveUser} /> },
        { path: "register", element: <Register /> },
        { path: "cart", element: <ProtectedRoutes> <Cart /> </ProtectedRoutes> },
        { path: "cart/checkout", element: <ProtectedRoutes> <Checkout /> </ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes> <AllOrders /> </ProtectedRoutes> },
        { path: "product-details/:id", element: <ProtectedRoutes> <ProductDetails /> </ProtectedRoutes> },

        { path: "*", element: <ProtectedRoutes><NotFound /></ProtectedRoutes> },
      ]
    }
  ]);

  return (

    <CartContextProvider>
      <ProductContextProvider>
        <Toaster></Toaster>
        <RouterProvider router={routes}>

        </RouterProvider>
      </ProductContextProvider>
    </CartContextProvider>

  );
}

export default App;
