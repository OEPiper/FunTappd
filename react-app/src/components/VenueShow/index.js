import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { venueDetails } from "../../store/venue";

const VenueShow = () => {
    const {venueId} = useParams()
    const venue = useSelector((state) => state.venue ? state.venue[venueId] : null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(venueDetails(venueId))
    }, [dispatch, venueId])
    return (
        <div>
            <h2>{venue.name}</h2>
        </div>
    )
}

export default VenueShow