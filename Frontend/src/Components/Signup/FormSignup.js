import React from 'react';
import axios from 'axios';
import validate from './validateInfo';
import {Link, withRouter} from 'react-router-dom';
import './FormSign.css';

class SignUp extends React.Component{
    
    state={
        email:'',
        password:'',
        confirmPassword:'',
        username:''
    }
    
    Submit=()=>{
      if(this.state.email.length!==0&&this.state.password.length!==0&&this.state.confirmPassword.length!==0&&this.state.username.length!==0)
      {  axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`,{email:this.state.email,password:this.state.password,username:this.state.username}).then((res)=>{
        if(!res.data.errors)
        {
         this.props.history.push({
         pathname:`/protask/${res.data._id}/${res.data.username}`,
        
         });
        } 
      }).catch((err)=>{
      console.log(err);
      })
    }
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
            <div className='form-content-right' >
        <div className='form' >
        <h1>
          Get started with ProTask today! Create your account by signing up.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={this.state.username}
            onChange={(event)=>this.setState({username:event.target.value})}
          />
          {/*{errors.username && <p>{errors.username}</p>}  */}
          
        </div>
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
          {/*  {errors.email && <p>{errors.email}</p>} */}
         
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
          {/*{errors.password && <p>{errors.password}</p>}  */}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={this.state.confirmPassword}
            onChange={(event)=>this.setState({confirmPassword:event.target.value})}
          />
         {/* {errors.password2 && <p>{errors.password2}</p>} */}
        </div>
        <button className='form-input-btn' type='submit' onClick={this.Submit}>
          Sign up
        </button>

        <span className='form-input-login'>
          Already have an account? <Link to="/login"><button className="login-btn" >Login here</button></Link>
        </span>
        </div>
    </div>
    </div>
        )
    }
}



export default (withRouter(SignUp));