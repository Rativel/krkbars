import React from 'react'
import Card from "./Card"
import './CardList.css'

const CardList = ({cards, id}) => (
    <div className="CardList">
        {cards.map(card => <Card key={card[id]} data={card}/>)}
    </div>
)

export default CardList
