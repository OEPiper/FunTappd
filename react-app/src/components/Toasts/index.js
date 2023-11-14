import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { addToast, loadToasts, removeToast } from "../../store/toast";
import './Toasts.css'

const ToastsOptions = ({review}) => {
    const [toasted, setToasted] = useState(false)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        const toastedUser = review.toasts.filter(toast => sessionUser.id === toast.user_id)
        if(toastedUser.length > 0){
            setToasted(true)
        }else{
            setToasted(false)
        }
    },[review.toasts.length])
    console.log(toasted, `${review.id}`)
    return(
        <div>
            <p className="total-toasts">{review.toasts.length} <i class="fa-solid fa-beer-mug-empty"></i></p>
            {sessionUser &&
            <button className={toasted ? 'isToasted' : 'notToasted' }>
               <i class="fa-solid fa-beer-mug-empty"></i> Toast
            </button>
            }
        </div>
    )
}

export default ToastsOptions