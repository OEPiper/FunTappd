export const LOAD_VENUES = 'venues/LOAD_VENUES'
export const RECIEVE_VENUE = 'venues/RECIEVE_VENUE'

export const actionLoadVenues = (venues) => {
    return {
        type: LOAD_VENUES,
        venues
    }
}

export const actionRecieveVenue = (venue) => {
    return{
    type: RECIEVE_VENUE,
    venue
    }
}

export const loadVenues = (data) => async(dispatch, getState) => {
    const res = await fetch("/api/venues");
    if(res.ok){
        const venues = await res.json()
        dispatch(actionLoadVenues(venues))
        return venues
    }else{
        const errors = await res.json()
        return errors
    }
}

export const venueDetails = (venueId) => async(dispatch) => {
    const res = await fetch(`/api/venues/${venueId}`, {method: 'GET'});
    if(res.ok){
        const venue = await res.json();
        dispatch(actionRecieveVenue(venue))
    }else{
        const errors = res.json()
        return errors
    }
}

const initialState = {}

const venueReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_VENUES:
            const venuesState = {};
            const venuesAction = action.venues
            venuesAction.Venues.forEach((venue) => {
                venuesState[venue.id] = venue;
            });
            //console.log(venuesState)
            return venuesState
        case RECIEVE_VENUE:
            return { ...state, [action.venue.id]: action.venue}
        default:
            return state
    }
}

export default venueReducer