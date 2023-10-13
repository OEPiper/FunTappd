import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-links'>
			<li className='home'>
				{sessionUser ? 
				<NavLink exact to='/home'>FunTappd</NavLink>:
				<NavLink exact to="/">FunTappd</NavLink>
				}
			</li>
			{/* {isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)} */}
		</ul>
	);
}

export default Navigation;