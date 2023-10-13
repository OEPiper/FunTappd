import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createVenue, updateVenue, venueDetails } from "../../store/venue"
import { useModal } from "../../context/Modal"
import './CreateVenue.css'


const NewVenue = ({venue, type}) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState(venue? venue.name : "")
    const [location, setLocation] = useState(venue? venue.location : "")
    const [state, setState] = useState(false)
    const [disable, setDisable] = useState(true)
    venue = {
        ...venue,
        name,
        location,
        user_id: sessionUser.id
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(type === 'Create a Venue'){
        const newVenue = await dispatch(createVenue(venue))
        venue = newVenue
        }else if(type === 'Update Venue'){
            const updatedVenue = await dispatch(updateVenue(venue))
            // history.push(`/home`)
        }
        await setState((prev) => !prev)
        return(closeModal())
    }
    useEffect(() =>{
        dispatch(venueDetails(venue.id))
    },[dispatch, state])
    useEffect(() =>{
        if(name.length < 1 || location.length <= 1){
            setDisable(true)
        }else{
            setDisable(false)
        }
    },[name, location, disable])

    let submitText
    if(type === 'Create a Venue'){
      submitText = 'Create Venue'
    }else{
      submitText = 'Update Venue'
    }
    
    return (
        <form onSubmit={handleSubmit} className="create-form">
            <h2>{type}</h2>
            <label>
                Name:
                <input 
                type='text'
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Location:
                <input 
                type='text'
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            <button type='submit' disabled={disable} className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewVenue