import React from "react";

export default function Random({handleRandom}) {
    return (
        <button className="random-btn" onClick={handleRandom}><i className="icon-shuffle icon"></i>Random</button>   
    )
}