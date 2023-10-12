import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createBeer, loadBeers } from "../../store/beer"
import { useModal } from "../../context/Modal"

const NewBeer = ({venue, beer, type}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState(beer?.name)
    const [abv, setAbv] = useState(beer?.abv)
    const [ibu, setIbu] = useState(beer?.ibu)
    const [state, setState] = useState(false)
    beer = {
        ...beer,
        name,
        abv,
        ibu,
        user_id: sessionUser.id,
        venue_id: venue.id
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(type === 'Create a Beer'){
        const newVenue = await dispatch(createBeer(beer))
        venue = newVenue
        }else if(type === 'Update Beer'){
            // const updatedVenue = await dispatch(updateVenue(venue))
            // history.push(`/home`)
        }
        await setState((prev) => !prev)
        return(closeModal())
    }
    useEffect(() =>{
        dispatch(loadBeers(venue.id))
    },[dispatch, state])

    let submitText
    if(type === 'Create a Beer'){
      submitText = 'Create Beer'
    }else{
      submitText = 'Update Beer'
    }
    return (
        <form onSubmit={handleSubmit}>
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
            <label>
                ABV
                <input 
                type='number'
                placeholder="ABV"
                value={abv}
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
            <button type='submit' className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewBeer