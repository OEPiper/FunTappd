import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { beerDetails } from "../../store/beer";
import { venueDetails } from "../../store/venue";
import OpenModalButton from "../OpenModalButton";
import NewBeer from "../CreateBeer";

const BeerShow = ({venue}) => {
    const {beerId} = useParams()
    const beer = useSelector((state) => state.beer ? state.beer[beerId] : null)
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()
    console.log(venue)
    
    useEffect(() => {
        dispatch(beerDetails(beerId))
    }, [dispatch, beerId])
    if(!beer){
        return null
    }
    return(
        <div>
            <h2>{beer.name}</h2>
            {sessionUser.id === beer.user_id &&
            <OpenModalButton buttonText={'Update Beer'} modalComponent={<NewBeer type='Update Beer' venue={venue} beer={beer}/>} />
            }
        </div>
    )

}

export default BeerShow