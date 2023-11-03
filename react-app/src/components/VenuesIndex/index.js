import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { loadVenues } from "../../store/venue"
import OpenModalButton from "../OpenModalButton";
import NewVenue from "../CreateVenue";
import { logout } from "../../store/session";
import './VenueIndex.css'

function VenuesIndex(){
    const allVenues = useSelector((state) => (state.venue ? state.venue : []));
    const sessionUser = useSelector((state) => (state.session.user))
    const venues = Object.values(allVenues)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(loadVenues());
    }, [dispatch, venues.length])
    if(!venues.length){
        return null
    }

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
      };

    return (
        <div className="index">
            <div className="venue-list">
            <ul>
                {venues.map((venue) => (
                    <div className="venue-card">
                        <img src={venue.logo} alt="Logo" className="logo"/>
                        <Link exact to={`/venues/${venue.id}`}>
                        <h3>{venue.name}</h3>
                        <p>{venue.location}</p>
                        </Link>
                    </div>
                ))}
            </ul>
            </div>
            <div className="profile-options">
            {sessionUser &&
            <div className="profile-card">
                <p>Hello, {sessionUser.username}</p>
                <p>{sessionUser.email}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            }
            <div className="create-btn">

            {sessionUser &&
            <OpenModalButton buttonText={'Create a Venue'} modalComponent={<NewVenue type='Create a Venue'/>} />
        }
            </div>
            </div>
        </div>
    )
}

export default VenuesIndex