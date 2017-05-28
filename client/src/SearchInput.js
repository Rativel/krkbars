import React from 'react'
import './SearchInput.css'

const SearchInput = ({onChange}) =>
    <input type="search" placeholder="Search..." className="SearchInput" onChange={ev => onChange(ev.target.value)}/>

export default SearchInput
