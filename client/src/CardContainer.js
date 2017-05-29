import React from 'react'
import axios from 'axios'

import SearchInput from "./SearchInput"
import CardList from "./CardList"

class CardContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {bars: [], filter: ''}
        this.onFilterChange = this.onFilterChange.bind(this)
    }

    componentDidMount() {
        axios.get('/api/bars').then(({data}) => this.setState({bars: data}))
    }

    onFilterChange(filter) {
        this.setState({filter: filter.toLowerCase()})
    }

    render() {
        const filteredBars = this.state.filter ? filterByName(this.state.bars, this.state.filter) : this.state.bars

        return (
            <div className="center w-100 tc">
                <SearchInput onChange={this.onFilterChange}/>
                <CardList cards={filteredBars} key="place_id"/>
            </div>
        )
    }
}

const filterByName = (bars = [], name) => bars.filter(bar => bar.name.toLowerCase().includes(name))

export default CardContainer
