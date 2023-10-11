export const LOAD_VENUES = 'venues/LOAD_VENUES'
export const RECIEVE_VENUE = 'venues/RECIEVE_VENUE'
export const UPDATE_VENUE = 'venues/UPDATE_VENUE'
export const REMOVE_VENUE = 'venues/REMOVE_VENUE'

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

export const actionUpdateVenue = (venue) => {
    return{
        type: UPDATE_VENUE,
        venue
    }
}

export const actionRemoveVenue = (venueId) => {
    return{
        type: REMOVE_VENUE,
        venueId
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

export const createVenue = (data) => async(dispatch, getState) => {
    const {name, location, user_id} = data
    const res = await fetch('/api/venues/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            location: location,
            user_id: user_id
        })
    });
    if(res.ok){
        const newVenue = await res.json();
        dispatch(actionRecieveVenue(newVenue))
        return newVenue
    }else{
        const errors = await res.json()
        return errors.errors
    }
}

export const updateVenue = (data) => async(dispatch, getState) => {
    const res = await fetch(`/api/venues/${data.id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(res.ok){
        const updatedVenue = await res.json();
        dispatch(actionUpdateVenue(updatedVenue))
        return updatedVenue
    }else{
        const errors = await res.json()
        return errors.errors
    }
}

export const deleteVenue = (data) => async(dispatch) => {
    const res = await fetch(`/api/venues/${data}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
    })
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
        case UPDATE_VENUE:
            return { ...state, [action.venue.id]: action.venue };
        case REMOVE_VENUE:
            const newState = {...state};
            delete newState[action.venueId];
            return newState
        default:
            return state
    }
}

export default venueReducer