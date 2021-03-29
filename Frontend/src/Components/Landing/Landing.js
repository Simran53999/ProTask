import React from 'react';
import './Landing.css';
import {Link, withRouter} from 'react-router-dom';
import cogwheel from '../../Utils/cogwheel.png';
import checked from '../../Utils/logo.png';
import tm1 from '../../Utils/team_member_1.jpg';
import tm2 from '../../Utils/team_member_2.jpg';

const Landing = () => {
	return(
		<div className='landingBG'>
			<div className='heading'>
				<img alt='logo' src={checked} className='headingimg'/>
				<h1 className='projectName'>ProTask</h1>
				<span className='sep2'></span>
				<div className='redirectButtons'>
					<Link to="/signup"><button className="redirectButton register" >Sign Up</button></Link>
					<Link to="/login"><button className="redirectButton login" >Login</button></Link>
				</div>
			</div>
			
			<div className='cards'>
				<div className='card card1'>
					<img alt="photo" src={ checked } className='c1img' />
					<div className='c1cnt'>
						<p className='cardh1'>About ProTask</p>
						<p>ProTask is an all in one web application to manage your schedule as well as your workload from long-term projects to short-term errands</p>
					</div>
				</div>
				
				<div className='card card2'>
					<div className='c2imgs'>
						<img alt="photo" src={ cogwheel } className='c2img1 ' />
						<img alt="photo" src={ cogwheel } className='c2img2 ' />
						<img alt="photo" src={ cogwheel } className='c2img3 ' />
					</div>
					
					<div className='c2cnt'>
						<p className='cardh1'>How it works</p>
						<p>ProTask uses Reactjs to dynamically render HTML elements all the while updating user data in the relational databases through a back-end server made using Expressjs</p>
					</div>
				</div>
				
				<div className='card card3'>
					<div className='c3imgs'>
						<div className='c3img1cnt c3imgcnt'>
							<img alt="photo" src={tm1} className='c3img'/>
							<p className='c3imgtxt'>Saksham<br/>Tewari</p>
						</div>
						<div className='c3img2cnt c3imgcnt'>
							<img alt="photo" src={tm2} className='c3img'/>
							<p className='c3imgtxt'>Simran<br/>Singh</p>
						</div>
					</div>
					
					<div className='c3cnt'>
						<p className='cardh1'>Our Team</p>
						<p></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default (withRouter(Landing));