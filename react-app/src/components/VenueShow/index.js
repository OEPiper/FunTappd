import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewVenue from "../CreateVenue";
import DeleteVenueModal from "../DeleteVenue";
import { loadBeers } from "../../store/beer";

const VenueShow = () => {
    const {venueId} = useParams()
    const venue = useSelector((state) => state.venue ? state.venue[venueId] : null)
    const allBeers = useSelector((state) => state.beer ? state.beer : [])
    const beers = Object.values(allBeers)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(venueDetails(venueId))
        dispatch(loadBeers(venueId))
    }, [dispatch, venueId, beers.length])
    let beerText = 'Beers'
    if(beers.length === 1){
         beerText = 'Beer'
    }
    if(!venue){
        return null
    }
    return (
        <div>
            <h2>{venue.name}</h2>
            <p>{beers.length} {beerText}</p>
            <ul>
            {beers.map((beer) => (
                    <div>
                        
                        <p>{beer.name}</p>
                        <p>ABV {parseFloat(beer.abv)}%</p>
                       
                        
                    </div>
                ))}
            </ul>
            {sessionUser.id === venue.user_id &&
            <OpenModalButton buttonText={'Update Venue'} modalComponent={<NewVenue type='Update Venue' venue={venue}/>} />
            }
            {sessionUser.id === venue.user_id &&
            <OpenModalButton buttonText={'Delete Venue'} modalComponent={<DeleteVenueModal venue={venue}/>} />
            }  
        </div>
    )
}

export default VenueShow