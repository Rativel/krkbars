import React from 'react'

const stars = count => new Array(count + 1).join('★')

const Rating = ({value}) => (
    <p>
        <span style={{color: '#fa0'}}>{stars(~~value)}</span>
        <span style={{color: '#ddd'}}>{stars(5 - ~~value)}</span>
        <span className="pl2 f5 black-80">{value}</span>
    </p>
)

export default Rating