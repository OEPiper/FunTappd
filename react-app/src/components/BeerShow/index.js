import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { beerDetails } from "../../store/beer";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewBeer from "../CreateBeer";
import DeleteBeerModal from "../DeleteBeer";
import NewReview from "../CreateReview";
import DeleteReviewModal from "../DeleteReview";
import ToastsOptions from "../Toasts";
import ReviewTile from "../ReviewTile";
import { logout } from "../../store/session";
import { loadReviews } from "../../store/review";
import './BeerShow.css'

const BeerShow = ({venue}) => {
    const {beerId} = useParams()
    const history = useHistory()
    const beer = useSelector((state) => state.beer ? state.beer[beerId] : null)
    const allReviews = useSelector((state) => state.review ? state.review : [])
    const reviews = Object.values(allReviews)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(beerDetails(beerId))
        dispatch(loadReviews(beerId))
    }, [dispatch, beerId])
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
      };
    let reviewText = "Reviews"
    if(reviews.length === 1){
        reviewText = "Review"
    }
    if(!beer){
        return null
    }
    let ratingTotal = 0
    for(let i = 0; i < reviews.length; i++){
        let review = reviews[i];
        ratingTotal += review.rating
    }
    let ratingAvg = ratingTotal/reviews.length
    return(
        <div className="index">
            <div className="beer-details">
            <div className="beer-card">
            <div className="upper-card">
            <img src={beer.photo} alt="photo" className="beer-photo"/>
            <div>
            <h2>{beer.name}</h2>
            <p>{beer.type}</p>
            <p>ABV {parseFloat(beer.abv)}%</p>
            <p>IBU {beer.ibu}</p>
            </div>
            </div>
            <p className="description">{beer.description}</p>
            <div className="rating-show">
                        <div className={ratingAvg >= 1 ? "filled" : "empty"}>
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        </div>
                        <div className={ratingAvg >= 2 ? "filled" : "empty"}>
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        </div>
                        <div className={ratingAvg >= 3 ? "filled" : "empty"}>
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        </div>
                        <div className={ratingAvg >= 4 ? "filled" : "empty"}>
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        </div>
                        <div className={ratingAvg >= 5 ? "filled" : "empty"}>
                        <i class="fa-solid fa-beer-mug-empty"></i>
                        </div>
                        </div>
            <p>{reviews.length} {reviewText}</p>
            </div>
            <ul className="review-list">
                {reviews.map((review) => (
                    <ReviewTile beer={beer} review={review}/>
                ))}
            </ul>
            </div>
            {sessionUser &&
            <div className="profile-options">
            <div className="profile-card">
                <p>Hello, {sessionUser.username}</p>
                <p>{sessionUser.email}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            <div className="create-btn">
            {sessionUser.id === beer.user_id &&
            <OpenModalButton buttonText={'Update Beer'} modalComponent={<NewBeer formType='Update Beer' venue={venue} beer={beer}/>} />
            }
            </div>
            <div className="create-btn">
            {sessionUser.id === beer.user_id &&
            <OpenModalButton buttonText={'Delete Beer'} modalComponent={<DeleteBeerModal beer={beer}/>} />
            }  
            </div>
            <div className="create-btn">
            {sessionUser.id !== beer.user_id &&
            <OpenModalButton buttonText={'Add a Review'} modalComponent={<NewReview type='Create Review' beer={beer}/>} />
            }  
            </div>
            </div>
            }
        </div>
    )

}

export default BeerShow