import React from 'react'
import Card from "./Card"
import './CardContainer.css'

const CardContainer = ({cards, key}) => (
    <div className="CardContainer">
        {cards.map(card => <Card key={card[key]} data={card}/>)}
    </div>
)

export default CardContainer
