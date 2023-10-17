import React,{ useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import { useCart } from './ContextReducer';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';

const Navbar = () => {
  let data = useCart(); 
  const[cartView,setCartView] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div >
      <nav className ="navbar navbar-expand-lg navbar-dark bg-success w-100 ">
  <div className ="container-fluid">
    <Link className ="navbar-brand fs-1 fst-italic fw-medium" to="#">GoFood</Link>
    <button className ="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarNav">
      <ul className ="navbar-nav me-auto mb-2">
        <li className ="nav-item">
          <Link className ="nav-link active fs-5 fw-5" aria-current="page" to="/">Home</Link>
        </li>
        {
          (localStorage.getItem("authToken")) ? 
          <li className ="nav-item">
          <Link className ="nav-link active fs-5 fw-5" aria-current="page" to="/myOrder">My orders</Link>
        </li>
        : ""}
        
      </ul>
      {(!localStorage.getItem("authToken")) ?
        <div className="d-flex ">
          <Link className ="btn bg-white text-success mx-1" to="/login">Login</Link>
          <Link className ="btn bg-white text-success mx-1" to="/signup">Signup</Link>
        </div>
        : 
        <div>
        <div className="btn bg-white text-success mx-1" onClick={() => setCartView(true)}>
        Mycart {"   "}
        <Badge pill className="bg-danger" > {data.length}</Badge>
        </div>
        {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /></Modal> : null }
        <div className="btn bg-white text-danger mx-1" onClick={handlelogout}>Logout</div>
        </div>
        
      }
    </div>
  </div>
</nav>
    </div>
  );
};

export default Navbar;
