import React from 'react';
import './FormSign.css';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

class Formlogin extends React.Component{
    
    state={
        email:'',
        password:''
    }
    
    Submit=()=>{
       console.log(this.state)
       axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`,{email:this.state.email,password:this.state.password}).then((result)=>{
        if(result.data)
        {
        this.props.history.push({
             pathname:`/protask/${result.data._id}/${result.data.username}`,
           })
        }  
       }).catch((err)=>{
         console.log(err);
       })
    }

    render(){
        return(
          <div className='form-container'>
          <span className='close-btn'><Link to="/">×</Link></span>
          <div className='form-content-left'>
          <header>
            <h1>ProTask</h1>
        </header>
        <img className='form-img' src='img/img-2.png' alt='spaceship' />
          </div>
            <div className='form-content-right'>
        <div className='form' >
        <h1>
          Login:
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={this.state.email}
            onChange={(event)=>this.setState({email:event.target.value})}
          />
          
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={this.state.password}
            onChange={(event)=>this.setState({password:event.target.value})}
          />
        </div>
        <button className='form-input-btn' type='submit' onClick={this.Submit}>
          Login
        </button>
        <span className='form-input-login'>
          Don't have an account? <Link to="/"><button className="login-btn" >Sign Up here</button></Link>
        </span>
        </div>
    </div>
    </div>
        )
    }
}


export default (withRouter(Formlogin));
