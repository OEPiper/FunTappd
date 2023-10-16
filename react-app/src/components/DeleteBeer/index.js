import { useDispatch } from "react-redux";
import { deleteBeer } from "../../store/beer";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteBeer.css'



const DeleteBeerModal = ({beer}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBeer(beer.id));
        history.push(`/venues/${beer.venue_id}`)
        closeModal()
    }
    
    return(
        <div className="delete-beer">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this beer?</p>
            <button onClick={handleDelete} className="confirm-delete">Yes (Delete Beer)</button>
            <button onClick={(e) => closeModal()} className="cancel-delete">No (Keep Beer)</button>
        </div>
    )
}

export default DeleteBeerModal