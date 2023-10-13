import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewVenue from "../CreateVenue";
import DeleteVenueModal from "../DeleteVenue";
import { loadBeers } from "../../store/beer";
import NewBeer from "../CreateBeer";
import { logout } from "../../store/session";

const VenueShow = () => {
    const {venueId} = useParams()
    const history = useHistory()
    const venue = useSelector((state) => state.venue ? state.venue[venueId] : null)
    const allBeers = useSelector((state) => state.beer ? state.beer : [])
    const beers = Object.values(allBeers)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
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
            <div>

            <h2>{venue.name}</h2>
            <p>{venue.location}</p>
            <p>{beers.length} {beerText}</p>
            <ul>
            {beers.map((beer) => (
                <div>
                        <Link exact to={`/beers/${beer.id}`} venue={venue}>
                        <p>{beer.name}</p>
                        </Link>
                       
                        
                    </div>
                ))}
            </ul>
            </div>
            {sessionUser &&
            <div className="profile-options">
            <div className="profile-card">
                <p>Hello, {sessionUser.username}</p>
                <p>{sessionUser.email}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            {sessionUser.id === venue.user_id &&
                <OpenModalButton buttonText={'Add a Beer'} modalComponent={<NewBeer type='Create a Beer' venue={venue}/>} />
            }
            {sessionUser.id === venue.user_id &&
                <OpenModalButton buttonText={'Update Venue'} modalComponent={<NewVenue type='Update Venue' venue={venue}/>} />
            }
            {sessionUser.id === venue.user_id &&
                <OpenModalButton buttonText={'Delete Venue'} modalComponent={<DeleteVenueModal venue={venue}/>} />
            }
            </div>
        }
        </div>
    )
}

export default VenueShow