import { Routes, Route } from 'react-router-dom';
import PrivateRouteApp from './PrivateRouteApp';
import Login from '../views/user/login/Login';
import ContactUs from '../views/landing/ContactUs';
import Landing from '../views/landing/Landing';
import ForgetPassword from '../views/user/login/ForgotPassword';
import PrivacyPolicy from '../views/landing/PrivacyPolicy';
import TermsAndCondtions from '../views/landing/TermsAndConditions';
import Navbar from '../views/landing/NavBar';
import AboutUs from '../views/landing/AboutUs';
import TripsApp from '../views/tripsapp/TripsApp';
import OrderTracking from '../views/tripsapp/views/components/OrderTracking';

const PublicRoute = () => {
  let token = localStorage.getItem('token');
  let isLoggedIn = token || token !== 'null';
  return (
    <Routes>
      <Route path='/tripsandorders' element={<TripsApp />} />
      <Route path='/tripsandorders/ordertracking' element={<OrderTracking />} />
      <Route path='*' element={isLoggedIn ? <PrivateRouteApp /> : <Login />} />
      <Route path='/' element={<Landing />} />
      <Route
        path='/aboutus'
        element={
          <>
            <Navbar />
            <AboutUs />
          </>
        }
      />
      <Route
        path='/contactus'
        element={
          <>
            <Navbar />
            <ContactUs />
          </>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/forgotpassword' element={<ForgetPassword />} />
      <Route
        path='/privacypolicy'
        element={
          <>
            <Navbar />
            <PrivacyPolicy />
          </>
        }
      />
      <Route
        path='/termsandconditions'
        element={
          <>
            <Navbar />
            <TermsAndCondtions />
          </>
        }
      />
    </Routes>
  );
};

export default PublicRoute;
