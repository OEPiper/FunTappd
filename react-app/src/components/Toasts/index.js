import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { addToast, loadToasts, removeToast } from "../../store/toast";
import { reviewDetails } from "../../store/review";
import './Toasts.css'

const ToastsOptions = ({review}) => {
    const [toasted, setToasted] = useState(false)
    const [render, setRender] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadToasts(review.id))
        // dispatch(reviewDetails(review.id))
        const toastedUser = review.toasts.filter(toast => sessionUser.id === toast.user_id)
        console.log('toastedUser',toastedUser, `${review.id}`)
        if(toastedUser.length > 0){
            console.log('toasted to true')
            setToasted(true)
        }else{
            setToasted(false)
        }
    },[toasted, render])
    
    console.log(toasted, `${review.id}`)
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
            setRender(!render);
        }
    }

    // useEffect(()=>{

    // },[])
    return(
        <div>
            <p className="total-toasts">{review.toasts.length} <i className="fa-solid fa-beer-mug-empty"></i></p>
            {sessionUser &&
            <button className={toasted ? 'isToasted' : 'notToasted' } onClick={handleToast}>
               <i className="fa-solid fa-beer-mug-empty"></i> Toast
            </button>
            }
        </div>
    )
}

export default ToastsOptions