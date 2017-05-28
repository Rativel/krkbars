import React from 'react'
import Card from "./Card"
import './CardContainer.css'

const CardContainer = ({cards, key}) => (
    <div className="CardContainer">
        {cards.map(card => (
            <div className="CardWrap">
                <Card key={card[key]} data={card}/>
            </div>
        ))}
    </div>
)

export default CardContainer
