export const LOAD_BEERS = 'beers/LOAD_BEERS'

export const actionLoadBeers = (beers) => {
    return {
        type: LOAD_BEERS,
        beers
    }
}

export const loadBeers = (venueId) => async(dispatch) =>{
    const res = await fetch(`/api/venues/${venueId}/beers`)
    if(res.ok){
        const beers = await res.json()
        dispatch(actionLoadBeers(beers))
        return beers
    }else{
        const errors = await res.json()
        return errors
    }
}

const initialState = {}

const beerReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BEERS:
            const beersState = {};
            const beersAction = action.beers;
            beersAction.Beers.forEach((beer) => {
                beersState[beer.id] = beer
            })
            return beersState
        default:
            return state
    }
}

export default beerReducer