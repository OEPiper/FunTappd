export const LOAD_BEERS = 'beers/LOAD_BEERS'
export const RECIEVE_BEER = 'beers/RECIEVE_BEERS'

export const actionLoadBeers = (beers) => {
    return {
        type: LOAD_BEERS,
        beers
    }
}

export const actionRecieveBeer = (beer) => {
    return{
        type: RECIEVE_BEER,
        beer
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

export const createBeer = (data) => async(dispatch) =>{
    const {name, abv, ibu, user_id, venue_id} = data
    const res = await fetch('/api/beers/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            abv: abv,
            ibu: ibu,
            user_id: user_id,
            venue_id: venue_id
        })
    });
    if(res.ok){
        const newBeer = await res.json();
        dispatch(actionRecieveBeer(newBeer))
        return newBeer
    }else{
        const errors = await res.json()
        return errors.errors
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
        case RECIEVE_BEER:
            return {...state, [action.beer.id]: action.beer}
        default:
            return state
    }
}

export default beerReducer