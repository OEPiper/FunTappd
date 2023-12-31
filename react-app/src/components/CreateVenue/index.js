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
    const [story, setStory] = useState(venue? venue.story : "")
    const [location, setLocation] = useState(venue? venue.location : "")
    const [state, setState] = useState(false)
    const [disable, setDisable] = useState(true)
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState("")
    venue = {
        ...venue,
        name,
        story,
        location,
        logo: image,
        user_id: sessionUser.id
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('story', story);
        formData.append('location', location);
        formData.append('logo', image);
        formData.append('user_id', sessionUser.id);
        if(type === 'Create a Venue'){
        setImageLoading(true);
        const newVenue = await dispatch(createVenue(formData))
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
    if(name.length > 255){
        setError("Name is too long")
    }
    
    return (
        <form onSubmit={handleSubmit} className="create-form" encType="multipart/form-data">
            <h2>{type}</h2>
            <div className="inputs">

            <label>
                Name:
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
                Location:
                <input 
                type='text'
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </label>
                {type === 'Create a Venue' &&
            <label>
                Logo:
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            }
            <label className="review-text">
                Your Story:
                <textarea 
                placeholder="Tell us about your brewery(2000 character limit)"
                value={story}
                onChange={(e) => setStory(e.target.value)}
                rows={5}
                cols={30}
                />
                 </label>
            {(imageLoading)&& <p>Loading...</p>}
            </div>
            <button type='submit' disabled={disable} className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewVenue