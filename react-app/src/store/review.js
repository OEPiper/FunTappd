export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const RECIEVE_REVIEW = 'reviews/RECIEVE_REVIEWS'
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS'
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEWS'

export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const actionRecieveReview = (review) => {
    return{
        type: RECIEVE_REVIEW,
        review
    }
}

export const actionUpdateReviews = (review) =>{
    return{
        type: UPDATE_REVIEW,
        review
    }
}

export const actionRemoveReview = (reviewId) =>{
    return{
        type: REMOVE_REVIEW,
        reviewId
    }
}

export const loadReviews = (beerId) => async(dispatch) => {
    const res = await fetch(`/api/${beerId}/reviews`)
    if(res.ok){
        const reviews = await res.json()
        dispatch(actionLoadReviews(reviews))
        return reviews
    }else{
       const errors = await res.json()
       return errors 
    }
}

export const reviewDetails = (reviewId) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`)
    if(res.ok){
        const review = await res.json()
        dispatch(actionRecieveReview(review))
    }else{
        const errors = res.json()
        return errors
    }
}

export const createReview = (data) => async(dispatch) => {
    const res = await fetch('/api/reviews/new', {
        method: 'POST',
        body: data 
    });
    if(res.ok){
        const newReview = await res.json();
        dispatch(actionRecieveReview(newReview))
        return newReview
    }else{
        const errors = await res.json()
        return errors
    }
}

export const updateReview = (data) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${data.id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(res.ok){
        const updatedReview = await res.json()
        dispatch(actionUpdateReviews(updatedReview))
        return updatedReview
    }else{
        const errors = await res.json()
        return errors
    }
}

export const deleteReview = (data) => async(dispatch) => {
    const res = await fetch(`/api/reviews/${data}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_REVIEWS:
            const reviewsState = {};
            const reviewsAction = action.reviews
            reviewsAction.Reviews.forEach((review) => {
                reviewsState[review.id] = review;
            })
            return reviewsState
        case RECIEVE_REVIEW:
            return {...state, [action.review.id]: action.review}
        case UPDATE_REVIEW:
            return {...state, [action.review.id]: action.review}
        case REMOVE_REVIEW:
            const newState = {...state};
            delete newState[action.reviewId];
            return newState
        default:
            return state
    }
}

export default reviewReducer