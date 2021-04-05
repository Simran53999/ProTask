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
        username:'',
        error: false,
        errorMsg: false,
        verification: false,
        errorMsgContent:''
    }
    
    Submit=()=>{
      if(this.state.email.length!==0&& this.state.password===this.state.confirmPassword &&this.state.password.length!==0&&this.state.confirmPassword.length!==0&&this.state.username.length>2){
          axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`,{email:this.state.email,password:this.state.password,username:this.state.username})
          .then((res)=>{
            console.log(res.data);
            // if(!res.data.errors && res.data.){
            //   this.props.history.push({
            //     pathname:`/protask/${res.data._id}/${res.data.username}`,
            //   });
            this.setState({error: false});
            this.setState({errorMsgContent: `${res.data.error}`});
            this.setState({verification:true});
            this.setState({errorMsg:true});
          })
          .catch((err)=>{
            console.log(err);
            console.log(err.response.data.error);
            this.setState({verification: false});
            this.setState({errorMsgContent: `${err.response.data.error}.`})
            this.setState({error:true});
            this.setState({errorMsg:true});
          });
      }
      else if(this.state.password!==this.state.confirmPassword){
        this.setState({verification: false});
        this.setState({errorMsgContent: 'Passwords do not match.'})
        this.setState({error:true});
        this.setState({errorMsg:true});
        console.log('Password not matching');
      }
      else if(this.state.username.length<3){
        this.setState({verification: false});
        this.setState({errorMsgContent: 'Username is too short.'})
        this.setState({error:true});
        this.setState({errorMsg:true});
        console.log('UserName too short');
      }
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
          
          <div className='form-content-right' >
            <div className='form' >
              <h1>
                Get started with ProTask today!
              </h1>
              <div className='error-div' style={{display: (this.state.errorMsg && this.state.error) ? 'flex' : 'none' }}>
                <label className='error-div-msg'>{this.state.errorMsgContent}</label>
                <div className='error-div-button' onClick={()=>{this.setState({errorMsg: false})}}>x</div>
              </div>
              <div className='verification-div' style={{display: (this.state.errorMsg && this.state.verification)?'flex':'none'}}>
                <label className='verification-div-msg'>{this.state.errorMsgContent}</label>
                <div className='verification-div-button' onClick={()=>{this.onResend()}}>Resend</div>
              </div>
              <div className='form-inputs'>
                <label className='form-label'>Username</label>
                <input
                  style = {{boxShadow:`${(this.state.error)?'0 0 0 1px red':'0 0 0 0 red'}`}}
                  className='form-input'
                  type='text'
                  name='username'
                  placeholder='Enter your username'
                  value={this.state.username}
                  onChange={(event)=>this.setState({username:event.target.value})}
                />
              </div>
              <div className='form-inputs'>
                <label className='form-label'>Email</label>
                <input
                  style = {{boxShadow:`${(this.state.error)?'0 0 0 1px red':'0 0 0 0 red'}`}}
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
                  style = {{boxShadow:`${(this.state.error)?'0 0 0 1px red':'0 0 0 0 red'}`}}
                  className='form-input'
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={(event)=>this.setState({password:event.target.value})}
                />
              </div>
              <div className='form-inputs'>
                <label className='form-label'>Confirm Password</label>
                <input
                  style = {{boxShadow:`${(this.state.error)?'0 0 0 1px red':'0 0 0 0 red'}`}}
                  className='form-input'
                  type='password'
                  name='password2'
                  placeholder='Confirm your password'
                  value={this.state.confirmPassword}
                  onChange={(event)=>this.setState({confirmPassword:event.target.value})}
                />
              </div>
              <button className='form-input-btn' type='submit' onClick={this.Submit}>
                Sign up
              </button>
              <span className='form-input-login'>
                Already have an account? 
                <Link to="/login">
                  <button className="login-btn" >
                    Login here
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      )
    }
}



export default (withRouter(SignUp));