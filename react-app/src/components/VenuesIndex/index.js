import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { loadVenues } from "../../store/venue"
import OpenModalButton from "../OpenModalButton";
import NewVenue from "../CreateVenue";

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

    return (
        <div>
            <ul>
                {venues.map((venue) => (
                    <div>
                        <Link exact to={`/venues/${venue.id}`}>
                        <p>{venue.name}</p>
                        <p>{venue.location}</p>
                        </Link>
                    </div>
                ))}
            </ul>
            {sessionUser &&
            <OpenModalButton buttonText={'Create a Venue'} modalComponent={<NewVenue type='Create a Venue'/>} />
            }
        </div>
    )
}

export default VenuesIndex