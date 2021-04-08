import React from 'react';
import './FormSign.css';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';

class Formlogin extends React.Component{
    
  state={
    email:'',
    password:'',
    error: false,
    verification: false,
    errorMsg: false,
    errorMsgContent:'',
  }
    
  Submit=()=>{
     axios
     .post(`${process.env.REACT_APP_BASE_URL}/user/login`,{email:this.state.email,password:this.state.password})
     .then((result)=>{
        if(result.data){
          this.setState({error: false});
          this.props.history.push({
            pathname:`/protask/${result.data._id}/${result.data.username}`,
          })
        }  
     })
     .catch((err)=>{
        if(err.response.data.status===401){
          this.setState({error: false});
          this.setState({verification: true});
          this.setState({errorMsg: true});
          this.setState({errorMsgContent:'Email not verified. Please check your email for the verification link.'});
        }
        else{
          this.setState({verification: false});
          this.setState({error: true});
          this.setState({errorMsg: true});
          this.setState({errorMsgContent:'Incorrect Email or Password'});
        }
        console.log(err);
     })
  }
  
  onResend=()=>{
    axios
    .post(`${process.env.REACT_APP_BASE_URL}/user/resend`,{email:this.state.email})
    .then((res)=>{
      this.setState({errorMsgContent:'Verification link sent'});
    })
    .catch((err)=>{
      this.setState({errorMsgContent:`${err.response.data.error}`});
    });
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
            <div className='error-div' style={{display: (this.state.errorMsg && this.state.error) ? 'flex' : 'none' }}>
                <label className='error-div-msg'>{this.state.errorMsgContent}</label>
                <div className='error-div-button' onClick={()=>{this.setState({errorMsg: false})}}>x</div>
              </div>
              <div className='verification-div' style={{display: (this.state.errorMsg && this.state.verification)?'flex':'none'}}>
                <label className='verification-div-msg'>{this.state.errorMsgContent}</label>
                <div className='verification-div-button' onClick={()=>{this.onResend()}} >Resend</div>
              </div>
            <div className='form-inputs'>
              <label className='form-label'>Email</label>
              <input
                className={`form-input ${(this.state.error)?'form-input-error':''}`}
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
                className={`form-input ${(this.state.error)?'form-input-error':''}`}
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