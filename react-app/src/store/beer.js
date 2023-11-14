export const LOAD_BEERS = 'beers/LOAD_BEERS'
export const RECIEVE_BEER = 'beers/RECIEVE_BEER'
export const UPDATE_BEER = 'beers/UPDATE_BEER'
export const REMOVE_BEER = 'beers/REMOVE_BEER'

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

export const actionUpdateBeer = (beer) => {
    return{
        type: UPDATE_BEER,
        beer
    }
}

export const actionRemoveBeer = (beerId) => {
    return{
        type: REMOVE_BEER,
        beerId
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

export const loadAllBeers = (data) => async(dispatch) =>{
    const res = await fetch('/api/beers')
    if(res.ok){
        const beers = await res.json()
        dispatch(actionLoadBeers(beers))
        return beers
    }else{
        const errors = await res.json()
        return errors
    }
}

export const beerDetails = (beerId) => async(dispatch) => {
    const res = await fetch(`/api/beers/${beerId}`)
    if(res.ok){
        const beer = await res.json();
        dispatch(actionRecieveBeer(beer))
    }else{
        const errors = res.json()
        return errors
    }
}

export const createBeer = (data) => async(dispatch) =>{
    const {name, abv, ibu, user_id, venue_id} = data
    const res = await fetch('/api/beers/new', {
        method: 'POST',
        body: data
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

export const updateBeer = (data) => async(dispatch) => {
    const res = await fetch(`/api/beers/${data.id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(res.ok){
        const updatedBeer = await res.json();
        dispatch(actionUpdateBeer(updatedBeer))
        return updatedBeer
    }else{
        const errors = await res.json()
        return errors.errors
    }
}

export const deleteBeer = (data) => async(dispatch) => {
    const res = await fetch(`/api/beers/${data}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
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
        case UPDATE_BEER:
            return {...state, [action.beer.id]: action.beer};
        case REMOVE_BEER:
            const newState = {...state};
            delete newState[action.beerId];
            return newState
        default:
            return state
    }
}

export default beerReducer