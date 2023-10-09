export const LOAD_VENUES = 'venues/LOAD_VENUES'

export const actionLoadVenues = (venues) => {
    return {
        type: LOAD_VENUES,
        venues
    }
}

export const loadVenues = (data) => async(dispatch, getState) => {
    const res = await fetch("/api/vanues");
    if(res.ok){
        const venues = await res.json()
        dispatch(actionLoadVenues(venues))
        return venues
    }else{
        const errors = await res.json()
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
            return venuesState
        default:
            return state
    }
}

export default venueReducer