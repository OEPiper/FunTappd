import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { beerDetails } from "../../store/beer";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewBeer from "../CreateBeer";
import DeleteBeerModal from "../DeleteBeer";
import { logout } from "../../store/session";

const BeerShow = ({venue}) => {
    const {beerId} = useParams()
    const history = useHistory()
    const beer = useSelector((state) => state.beer ? state.beer[beerId] : null)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    console.log(venue)
    
    useEffect(() => {
        dispatch(beerDetails(beerId))
    }, [dispatch, beerId])
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
      };
    if(!beer){
        return null
    }
    return(
        <div className="index">
            <div>
            <h2>{beer.name}</h2>
            <p>ABV {parseFloat(beer.abv)}%</p>
            <p>IBU {beer.ibu}</p>
            </div>
            {sessionUser &&
            <div className="profile-options">
            <div className="profile-card">
                <p>Hello, {sessionUser.username}</p>
                <p>{sessionUser.email}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
            {sessionUser.id === beer.user_id &&
            <OpenModalButton buttonText={'Update Beer'} modalComponent={<NewBeer type='Update Beer' venue={venue} beer={beer}/>} />
            }
            {sessionUser.id === beer.user_id &&
            <OpenModalButton buttonText={'Delete Beer'} modalComponent={<DeleteBeerModal beer={beer}/>} />
            }  
            </div>
            }
        </div>
    )

}

export default BeerShow