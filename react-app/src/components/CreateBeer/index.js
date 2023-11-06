import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createBeer, beerDetails, loadBeers, updateBeer } from "../../store/beer"
import { useModal } from "../../context/Modal"
import { loadVenues } from "../../store/venue"
import './CreateBeer.css'

const NewBeer = ({venue, beer, type}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState(beer? beer.name : "")
    const [abv, setAbv] = useState(beer?beer.abv : 0)
    const [ibu, setIbu] = useState(beer?beer.ibu : 0)
    const [venue_id, setVenue_id] = useState(beer?.venue_id)
    const [state, setState] = useState(false)
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(type === 'Create a Beer'){
            beer = {
                ...beer,
                name,
                abv,
                ibu,
                user_id: sessionUser.id,
                venue_id: venue.id
            }
            const newVenue = await dispatch(createBeer(beer))
            venue = newVenue
        }else if(type === 'Update Beer'){
            beer = {
                ...beer,
                name,
                abv,
                ibu,
                user_id: sessionUser.id,
            }
            const updatedBeer = await dispatch(updateBeer(beer))
            
        }
        await setState((prev) => !prev)
        return(closeModal())
    }
    useEffect(() =>{
        if(type === 'Create a beer'){
            dispatch(loadBeers(venue.id))
        } 
        if(type === 'Update Beer'){
            dispatch(beerDetails(beer.id))
        }
    },[dispatch, state])

    useEffect(() =>{
        if(name.length < 1 || abv <= 0 || ibu < 1){
            setDisable(true)
        }else{
            setDisable(false)
        }
    },[name, abv, ibu, disable])

    let submitText
    if(type === 'Create a Beer'){
      submitText = 'Create Beer'
    }else{
      submitText = 'Update Beer'
    }
    if(name.length > 255){
        setError("Name is too long")
    }
    return (
        <form onSubmit={handleSubmit} className="create-form">
            <h2>{type}</h2>
            <label>
                Name
                <input 
                type='text'
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            {error && 
            <p>{error}</p>}
            <label>
                ABV
                <input 
                type='number'
                placeholder="ABV"
                value={parseFloat(abv)}
                onChange={(e) => setAbv(e.target.value)}
                />
            </label>
            <label>
                IBU
                <input
                type="number"
                placeholder="IBU"
                value={ibu}
                onChange={(e) => setIbu(e.target.value)}
                />
            </label>
            <button type='submit' disabled={disable} className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewBeer