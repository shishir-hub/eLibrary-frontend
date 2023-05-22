import React from 'react';
import './Star.scss';
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

function Star({ stars, reviews }) {
    const ratings = Array.from({ length: 5 }, (el, i) => {
        let number = i + 0.5;

        return <span key={i}>
            {
                stars >= i + 1 ? (<FaStar className='icon' style={{ color: "gold" }} />) : stars >= number ? (<FaStarHalfAlt className='icon' style={{ color: "gold" }} />) : (<AiOutlineStar className='icon' style={{ color: "gold" }} />)
            }
        </span>
    })
    return (
        <>
            <div className='rating'>
                {ratings}
            </div>
        </>
    )
}

export default Star
