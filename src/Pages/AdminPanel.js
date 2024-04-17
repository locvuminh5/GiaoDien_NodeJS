import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faCog, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import AppFooter from "../Components/AppFooter";
import AppHeader from "../Components/AppHeader";
import PageContent from "../Components/PageContent";
import SideMenu from "../Components/SideMenu";
import { FaArrowLeft } from 'react-icons/fa';

const AdminPanel = ({ onLogout }) => {

  const handleSubmit = (e) => {
    // e.preventDefault();
    // Perform validation if needed
    // For simplicity, we're assuming validation is done on the server-side
    // Here, we'll just pass the username and password to the onLogin callback
    onLogout({});
  };

  return (
    <div className="App" style={{ width: "100%" }}>
      <AppHeader />

      <div className="SideMenuAndPageContent">
        {/* <FaArrowLeft onClick={handleSubmit} style={{ position: 'absolute', top: '20px', left: '16px', cursor: 'pointer' }} /> */}

        <SideMenu handleLogout={onLogout}/>
          

        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
};

export default AdminPanel;
