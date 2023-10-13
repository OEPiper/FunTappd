import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import './Footer.css'

const Footer = () => {
    return(
        <div className="footer">
            <p>This site was developed by Matthew Piper</p>
            <p>Contact Developer:</p>
            <div className="dev-links">
            <NavLink to={{pathname:'https://www.linkedin.com/in/matthew-piper-aa463b157'}} target='_blank'>
            <i class="fa fa-linkedin-square"></i>
            </NavLink>
            <NavLink to={{pathname:'https://github.com/OEPiper'}} target='_blank'>
            <i class="fa fa-github"></i>
            </NavLink>
            </div>
        </div>
    )
}

export default Footer