import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
// import '../CSS/style.css';
import axios from 'axios';
import UserRoute from "./UserRoute";
import { useLocation, useNavigate } from "react-router-dom";

const UserPanel = ({ onLogout }) => {
  const [movies, setMovies] = useState([]);
  const [account, setAccount] = useState();
  const navigate = useNavigate();


  global.myvar = account;

  useEffect(() => {
    // Fetch movies from API
    getUser();
  }, []);

  //Apis call
  const getMovies = async () => {
    let data = '';

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3030/api/v1/movies',
      headers: {}
    };

    await axios.request(config)
      .then((response) => {
        // console.log(response.data.data);
        setMovies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getUser = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3030/api/v1/auth/me',
      withCredentials: true
    };

    await axios.request(config)
      .then((response) => {
        setAccount(response.data.data);
        // console.log(global.myvar)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  //Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogout({});
  };

  if (!account) {
    getUser();
  }
  return (
    <div className="container">
      <Navbar bg="dark" variant="dark" style={{
        marginBottom: "10px",
        borderRadius: "50px"
      }}>
        <Navbar.Brand href="/" style={{
          marginLeft: "20px"
        }}>Danh sách phim</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleSubmit}>Logout</Nav.Link>
          <Nav.Link onClick={() => {navigate('/account-info')}}>Account</Nav.Link>
          <Nav.Link onClick={() => {navigate('/bills')}}>Bills</Nav.Link>
        </Nav>
      </Navbar>
      <div className="PageContent" style={{ width: "100%", padding: "0px" }}>
        <UserRoute />
      </div>
    </div>
  );
};

export default UserPanel;
