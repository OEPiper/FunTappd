import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"


const NewVenue = ({spot, type}) =>{
    const history = useHistory()
    const [name, setName] = useState(spot?.name)
    const [location, setLocation] = useState(spot?.location)
    const handleSubmit = async(e) => {
        e.preventDefault()
        history.push('/home')
    }
    let submitText
    if(type === 'Create a Venue'){
      submitText = 'Create Venue'
    }else{
      submitText = 'Update Venue'
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
                Name
                <input 
                type='text'
                placeholder="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            <button type='submit' className='submit-button'>{submitText}</button>
        </form>
    )
}

export default NewVenue