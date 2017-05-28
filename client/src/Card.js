import React from 'react'
import Rating from "./Rating"
import './Card.css'

const color = colorizer()

const Card = ({data}) => (
    <article className='Card'>
        <div className="viewport" style={{backgroundColor: color.next().value}}>
            {/*<img src={photo} className="image" title="Photo" alt="Place"/>*/}
        </div>
        <div className="pa1">
            <h1 className="f4">{data.name}</h1>
            <h2 className="f5"><Rating value={data.rating}/></h2>
            <p className="f6 black-70">{data.vicinity}</p>
        </div>
    </article>
)

export default Card

function* colorizer() {
    while(true) {
        yield '#545252'
        yield '#d2e7e7'
        yield '#a4d2cf'
        yield '#f6e3db'
        yield '#f092a2'
    }
}
