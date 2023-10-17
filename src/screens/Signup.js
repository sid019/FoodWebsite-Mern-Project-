import React,{useState} from 'react';
import {Link} from "react-router-dom";
import Navbar from '../components/Navbar';
const Signup = () => {

    const[credential, setCredential] = useState({name : "", email : "", password : "", location : ""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response =  await fetch("http://localhost:5000/api/createUser",{

        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : credential.name,
            password : credential.password,
            email : credential.email,
            location : credential.location
        })
        })
        const data = await response.json();
        console.log(data);

        if(!data.success){
            alert("Invalid credential");
        }

        
       
    }

    const onchange = (event) => {
        setCredential({...credential, [event.target.name] : event.target.value});
    }
  return (
    <>
    {/* <style>{"body { background-color: #2D2D2D; color : white}"}</style> */}
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
    <div className='container'>
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credential.name} onChange={onchange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value= {credential.email} onChange={onchange} />
            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credential.password} onChange={onchange} />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" name='location' value={credential.location} onChange={onchange} />
        </div>
        
        <button type="submit" className=" m-3 btn btn-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'> Already a user</Link>
    </form>
    </div>
    </div>
    </>
  )
}

export default Signup;
