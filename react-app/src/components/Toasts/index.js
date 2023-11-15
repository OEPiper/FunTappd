import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { addToast, loadToasts, removeToast } from "../../store/toast";
import { reviewDetails } from "../../store/review";
import './Toasts.css'

const ToastsOptions = ({review}) => {
    // console.log(review, "review")
    const [toasted, setToasted] = useState(true)
    // const [render, setRender] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    const toastObj = useSelector((state) => state.toast? state.toast : [])
    const allToasts = Object.values(toastObj)
    const reviewToasts = []
    const toastedUser = []
    allToasts.forEach((toast) => { 
        if(toast.review_id === review.id){
            reviewToasts.push(toast)
            if(sessionUser.id === toast.user_id){
                toastedUser.push(toast)
            }
        }
    })
    // console.log(allToasts, `${review.id}`, "all---------toasts")
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadToasts(review.id))
        // dispatch(reviewDetails(review.id))
        // const toastedUser = reviewToasts.filter(toast => sessionUser.id === toast.user_id)
        console.log('toastedUser',toastedUser, `${review.id}`, reviewToasts)
        if(toastedUser.length > 0){
            setToasted(true)
        }else{
            setToasted(false)
        }
    },[dispatch, review.id])
    
    // console.log(toasted, `${review.id}`)
    const handleToast = () => {
        // e.preventDefault()
        if(sessionUser){
            const review_id = review.id
            const user_id = sessionUser.id
            if(toasted){
                console.log('removing toast')
                dispatch(removeToast(review_id, user_id))
                
            }else{
                console.log('adding toast')
                dispatch(addToast(review_id, user_id))
                
            }
            setToasted(!toasted);
        }
    }

    // useEffect(()=>{

    // },[])
    return(
        <div>
            <p className="total-toasts">{reviewToasts.length} <i className="fa-solid fa-beer-mug-empty"></i></p>
            {sessionUser &&
            <button className={toasted ? 'isToasted' : 'notToasted' } onClick={handleToast}>
               <i className="fa-solid fa-beer-mug-empty"></i> Toast
            </button>
            }
        </div>
    )
}

export default ToastsOptions