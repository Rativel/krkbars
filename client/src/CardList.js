import React from 'react'
import Card from "./Card"
import './CardList.css'

const CardList = ({cards, key}) => (
    <div className="CardList">
        {cards.map(card => <Card key={card[key]} data={card}/>)}
    </div>
)

export default CardList
