import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { beerDetails } from "../../store/beer";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton"
import NewReview from "../CreateReview";
import DeleteReviewModal from "../DeleteReview";
import ToastsOptions from "../Toasts";
import { logout } from "../../store/session";
import { loadReviews } from "../../store/review";
import { loadToasts } from "../../store/toast";


const ReviewTile = ({beer, review}) => {
    const sessionUser = useSelector((state) => state.session.user)
    // const allReviews = useSelector((state) => state.review ? state.review : [])
    // const reviews = Object.values(allReviews)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadReviews(beer.id))
    //     // dispatch(loadToasts(review.id))
    // }, [beer.id])
    return(
        <div className="reviews">
        <h2 className="user">{review.user.username}</h2>
        <p>{review.text}</p>
        <div className="rating-show">
        <div className={review.rating >= 1 ? "filled" : "empty"}>
        <i class="fa-solid fa-beer-mug-empty"></i>
        </div>
        <div className={review.rating >= 2 ? "filled" : "empty"}>
        <i class="fa-solid fa-beer-mug-empty"></i>
        </div>
        <div className={review.rating >= 3 ? "filled" : "empty"}>
        <i class="fa-solid fa-beer-mug-empty"></i>
        </div>
        <div className={review.rating >= 4 ? "filled" : "empty"}>
        <i class="fa-solid fa-beer-mug-empty"></i>
        </div>
        <div className={review.rating >= 5 ? "filled" : "empty"}>
        <i class="fa-solid fa-beer-mug-empty"></i>
        </div>
        </div>
        <img src={review.photo}/>
        <ToastsOptions review={review}/>
        {sessionUser.id === review.user_id &&
        <div className="create-btn">
        <OpenModalButton buttonText={'Edit Review'} modalComponent={<NewReview type='Update Review' beer={beer} review={review}/>} />
        <OpenModalButton buttonText={'Delete Review'} modalComponent={<DeleteReviewModal review={review}/>} />
        </div>
        }  
       
    </div>
    )
}

export default ReviewTile