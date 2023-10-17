import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import Navbar from '../components/Navbar';
const Login = () => {

  const[credential, setCredential] = useState({email : "", password : ""});
let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/loginUser",{

        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            password : credential.password,
            email : credential.email
        })
        })
        const data = await response.json();
        console.log(data);

        if(!data.success){
            alert("Invalid credential");
        }
        
        if(data.success){

            localStorage.setItem("userEmail",credential.email);
            localStorage.setItem("authToken",data.authToken);
            console.log(localStorage.getItem("authToken"));
            navigate("/");
        }
        
       
    }

    const onchange = (event) => {
        setCredential({...credential, [event.target.name] : event.target.value});
    }
  return (
    <>
    {/* <style>{"body { background-color: #2D2D2D; color : white}"}</style> */}
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
    <div className='container'>
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value= {credential.email} onChange={onchange} />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credential.password} onChange={onchange} />
        </div>
        
        <button type="submit" className=" m-3 btn btn-success">Submit</button>
        <Link to="/signup" className='m-3 btn btn-danger'> I'm a new user</Link>
    </form>
    </div>
    </div>
    </>
  )
}

export default Login;




