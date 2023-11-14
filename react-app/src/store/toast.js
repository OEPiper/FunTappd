export const LOAD_TOASTS = 'toasts/LOAD_TOASTS'
export const RECIEVE_TOAST = 'toasts/RECIEVE_TOAST'
export const REMOVE_TOAST = 'toasts/REMOVE_TOAST'

export const actionLoadToasts = (toasts) => {
    return {
        type: LOAD_TOASTS,
        toasts
    }
}

export const actionRecieveToast = (toast) => {
    return {
        type: RECIEVE_TOAST,
        toast
    }
}

export const actionRemoveToast = (toastId) => {
    return {
        type: REMOVE_TOAST,
        toastId
    }
}

export const loadToasts = (reviewId) => async(dispatch) => {
    const res = await fetch(`/api/toasts/review/${reviewId}`)
    if(res.ok){
        const toasts = await res.json()
        dispatch(actionLoadToasts(toasts))
        return toasts
    }else{
        const errors = await res.json()
        return errors
    }
}

export const addToast = (review_id, user_id) => async(dispatch) => {
    const res = await fetch(`/api/toasts/review/${review_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id: user_id})
    })
    if(res.ok){
        const data = await res.json()
        dispatch(actionRecieveToast(data));
    }else{
        const errors = await res.json();
        return errors
    }
}

export const removeToast = (review_id, user_id) => async(dispatch) => {
    const res = await fetch(`/api/toasts/review/${review_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id: user_id})
    })
    if(res.ok){
        const data = await res.json()
        dispatch(actionRemoveToast(data));
    }else{
        const errors = await res.json();
        return errors
    }
}

const initialState = {}

const toastReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TOASTS:
            const toastsState = {...state};
            const toastsAction = action.toasts;
            toastsAction.Toasts.forEach((toast) => {
                toastsState[toast.id] = toast
            })
            return toastsState
        case RECIEVE_TOAST:
            return {...state, [action.toast.id]: action.toast}
        case REMOVE_TOAST:
            const newState = {...state};
            delete newState[action.toastId];
            return newState
        default:
            return state
    }
}

export default toastReducer

