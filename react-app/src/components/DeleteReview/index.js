import { useDispatch } from "react-redux";
import { deleteReview, loadReviews } from "../../store/review";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";




const DeleteReviewModal = ({review}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id));
        dispatch(loadReviews(review.beer_id))
        // history.push(`/beers/${review.beer_id}`)
        closeModal()
    }
    
    return(
        <div className="delete-beer">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this Review?</p>
            <button onClick={handleDelete} className="confirm-delete">Yes (Delete Review)</button>
            <button onClick={(e) => closeModal()} className="cancel-delete">No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal