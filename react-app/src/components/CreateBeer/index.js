import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createBeer, beerDetails, loadBeers, updateBeer } from "../../store/beer"
import { useModal } from "../../context/Modal"
import { loadVenues } from "../../store/venue"
import './CreateBeer.css'

const NewBeer = ({venue, beer, formType}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState(beer? beer.name : "")
    const [type, setType] = useState(beer? beer.type : "")
    const [abv, setAbv] = useState(beer?beer.abv : 0)
    const [ibu, setIbu] = useState(beer?beer.ibu : 0)
    const [description, setDescription] = useState(beer? beer.description : "")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [venue_id, setVenue_id] = useState(beer?.venue_id)
    const [state, setState] = useState(false)
    const [disable, setDisable] = useState(true)
    const [error, setError] = useState("")
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(formType === 'Create a Beer'){
            const formData = new FormData()
            formData.append('name', name)
            formData.append('type', type)
            formData.append('abv', abv)
            formData.append('ibu', ibu)
            formData.append('description', description)
            formData.append('photo', image)
            formData.append('user_id', sessionUser.id)
            formData.append('venue_id', venue.id)
            const newVenue = await dispatch(createBeer(formData))
            setImageLoading(true);
            venue = newVenue
        }else if(formType === 'Update Beer'){
            beer = {
                ...beer,
                name,
                type,
                abv,
                ibu,
                description,
                user_id: sessionUser.id,
            }
            const updatedBeer = await dispatch(updateBeer(beer))
            
        }
        await setState((prev) => !prev)
        return(closeModal())
    }
    useEffect(() =>{
        if(formType === 'Create a beer'){
            dispatch(loadBeers(venue.id))
        } 
        if(formType === 'Update Beer'){
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
    if(formType === 'Create a Beer'){
      submitText = 'Create Beer'
    }else{
      submitText = 'Update Beer'
    }
    if(name.length > 255){
        setError("Name is too long")
    }
    return (
        <form onSubmit={handleSubmit} className="create-form">
            <h2>{formType}</h2>
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
                Beer Type
                <input 
                type='text'
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                />
            </label>
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
            <label className="review-text">
                Description:
                <textarea 
                placeholder="Tell us about your beer(2000 character limit)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                 </label>
                 {formType === 'Create a Beer' &&
            <label>
                Photo:
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            }
            {(imageLoading)&& <p>Loading...</p>}
            <button type='submit' disabled={disable} className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewBeer