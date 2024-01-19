import { Box } from '@mui/system';
import BusinessObjective from './BusinessObjective';
import FAQ from './FAQ';
import Features from './Features';
import Footer from './Footer';
import HighLights from './HighLights';
import NavBar from './NavBar';
import ValueAdds from './ValueAdds';
import { Navigate } from 'react-router-dom';

const Landing = () => {
  let lastVisitedPage = localStorage.getItem('lastVisitedPage');
  let isLoggedIn = localStorage.getItem('isLoggedIn');

  if (lastVisitedPage && isLoggedIn) return <Navigate to={lastVisitedPage} replace />;

  return (
    <>
      <NavBar />
      <Box sx={{ height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
        <Features />
        <BusinessObjective />
        <ValueAdds />
        <HighLights />
        <FAQ />
        <Footer />
      </Box>
    </>
  );
};

export default Landing;
