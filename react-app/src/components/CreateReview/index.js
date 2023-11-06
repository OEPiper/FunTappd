import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createReview, updateReview } from "../../store/review"
import { useModal } from "../../context/Modal"
import "./CreateReview.css"

const NewReview = ({beer, review, type}) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const sessionUser = useSelector(state => state.session.user)
    const [text, setText] = useState(review? review.text : "")
    const [rating, setRating] = useState(review? review.rating : 0)
    const [disable, setDisable] = useState(false)
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [error, setError] = useState("")

    review = {
        ...review,
        text,
        rating,
        photo: image,
        user_id: sessionUser.id,
        beer_id: beer.id
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('text', text)
        formData.append('rating', rating)
        formData.append('photo', image)
        formData.append('user_id', sessionUser.id)
        formData.append('beer_id', beer.id)
        if(type === 'Create Review'){
            setImageLoading(true);
            const newReview = await dispatch(createReview(formData))
            review = newReview
            console.log(review)
        }else if(type === 'Update Review'){
            const updatedReview = await dispatch(updateReview(review))
        }
        // history.push(`/beers/${beer.id}`)
        return(closeModal())
    }
    useEffect(() =>{
        if(text.length < 3 || rating <= 0){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }, [text, rating, disable])
    if(text.length > 2000){
        setError("Review is too long")
    }

    return (
        <form onSubmit={handleSubmit} className="create-form" encType="multipart/form-data" >
            <h2>{type}</h2>
            <div className="rating-input">
                <div
                    className={rating >= 1 ? "filled" : "empty"}
                    // onMouseEnter={() => {  setStars(1)} }
                    //onMouseLeave={() => {  setStars(0)} }
                    onClick={() => {  setRating(1)} }
                >
                    <i class="fa-solid fa-beer-mug-empty"></i>
                </div>
                <div
                    className={rating >= 2 ? "filled" : "empty"}
                    // onMouseEnter={() => {  setStars(1)} }
                    //onMouseLeave={() => {  setStars(0)} }
                    onClick={() => {  setRating(2)} }
                >
                    <i class="fa-solid fa-beer-mug-empty"></i>
                </div>
                <div
                    className={rating >= 3 ? "filled" : "empty"}
                    // onMouseEnter={() => {  setStars(1)} }
                    //onMouseLeave={() => {  setStars(0)} }
                    onClick={() => {  setRating(3)} }
                >
                    <i class="fa-solid fa-beer-mug-empty"></i>
                </div>
                <div
                    className={rating >= 4 ? "filled" : "empty"}
                    // onMouseEnter={() => {  setStars(1)} }
                    //onMouseLeave={() => {  setStars(0)} }
                    onClick={() => {  setRating(4)} }
                >
                    <i class="fa-solid fa-beer-mug-empty"></i>
                </div>
                <div
                    className={rating >= 5 ? "filled" : "empty"}
                    // onMouseEnter={() => {  setStars(1)} }
                    //onMouseLeave={() => {  setStars(0)} }
                    onClick={() => {  setRating(5)} }
                >
                    <i class="fa-solid fa-beer-mug-empty"></i>
                </div>
                </div>
                <label className="review-text">
                Review:
                <textarea 
                placeholder="Leave a review here(2000 character limit)"
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                 </label>
                 {error && 
                <p>{error}</p>}
                 {type === 'Create Review' &&
                 <label>
                Photo:
                <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
            </label>
            }
           <button type='submit' disabled={disable} className='submit-button'>{type}</button> 
        </form>
    )
}

export default NewReview