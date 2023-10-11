import { useDispatch } from "react-redux";
import { deleteVenue } from "../../store/venue";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";



const DeleteVenueModal = ({venue}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteVenue(venue.id));
        history.push('/home')
        closeModal()
    }
    
    return(
        <div className="delete-venue">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this venue?</p>
            <button onClick={handleDelete} className="confirm-delete">Yes (Delete Venue)</button>
            <button onClick={(e) => closeModal()} className="cancel-delete">No (Keep Venue)</button>
        </div>
    )
}

export default DeleteVenueModal