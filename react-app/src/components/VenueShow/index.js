import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewVenue from "../CreateVenue";
import DeleteVenueModal from "../DeleteVenue";
import { loadBeers } from "../../store/beer";
import NewBeer from "../CreateBeer";
import { logout } from "../../store/session";
import './VenueShow.css'

const VenueShow = () => {
    const {venueId} = useParams()
    const history = useHistory()
    const venue = useSelector((state) => state.venue ? state.venue[venueId] : null)
    const allBeers = useSelector((state) => state.beer ? state.beer : [])
    const beers = Object.values(allBeers)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const [showBeers, setShowBeers] = useState(false)
    useEffect(() => {
        dispatch(venueDetails(venueId))
        dispatch(loadBeers(venueId))
    }, [dispatch, venueId, beers.length])
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
      };
    let beerText = 'Beers'
    if(beers.length === 1){
         beerText = 'Beer'
    }
    if(!venue){
        return null
    }
    return (
        <div className="index">
            <div className="venue-beers">
            <div className="venue-details">
            <h2>{venue.name}</h2>
            <p>{venue.location}</p>
            <p onClick={(e) => setShowBeers(!showBeers)} id="beer-count">{beers.length} {beerText}</p>
            </div>
            {showBeers &&
            <ul className="beer-list">
            {beers.map((beer) => (
                <div className="beers">
                        <Link exact to={`/beers/${beer.id}`} venue={venue}>
                        <h3>{beer.name}</h3>
                        </Link>
                       
                        
                    </div>
                ))}
            </ul>
            }
            </div>
            {sessionUser &&
            <div className="profile-options">
            <div className="profile-card">
                <p>Hello, {sessionUser.username}</p>
                <p>{sessionUser.email}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <div className="create-btn">
            {sessionUser.id === venue.user_id &&
                <OpenModalButton id='create-beer' buttonText={'Add a Beer'} modalComponent={<NewBeer type='Create a Beer' venue={venue}/>} />
            }
            </div>
            <div className="create-btn">
            {sessionUser.id === venue.user_id &&
                <OpenModalButton buttonText={'Update Venue'} modalComponent={<NewVenue type='Update Venue' venue={venue}/>} />
            }
            </div>
            <div className="create-btn">
            {sessionUser.id === venue.user_id &&
                <OpenModalButton buttonText={'Delete Venue'} modalComponent={<DeleteVenueModal venue={venue}/>} />
            }
            </div>
            </div>
        }
        </div>
    )
}

export default VenueShow