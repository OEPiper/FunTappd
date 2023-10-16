import './index.css'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

function LandingPage() {
    return (
        <div className="landing">
            <div className='left-landing'>
            <img src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/350_Untappd_logo-512.png' className='logo'></img>
            <h1>FunTappd</h1>
            <h2>Discover and share your favorite beer</h2>
            <div className='account-buttons'>

            <OpenModalButton
              buttonText="Log In"
              //   onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
              />

            <OpenModalButton
              buttonText="Sign Up"
              //   onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
              />
              </div>
            </div>
            {/* <img src="https://assets.untappd.com/assets/custom/homepage/images/masthead-img-main.png" alt="Phone discover crop right" class="masthead-img"></img> */}
        </div>
    )
}

export default LandingPage