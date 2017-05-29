import React from 'react'
import axios from 'axios'
import logo from './logo.svg'
import 'tachyons/css/tachyons.min.css'

import SearchInput from "./SearchInput"
import CardList from "./CardList"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {bars: []}
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
            <div className="center">
                <header className="pa3 pa4-ns tc">
                    <img src={logo} className="h3" alt="logo"/>
                </header>
                <div className="tc">
                    <SearchInput onChange={this.onFilterChange}/>
                </div>
                <div className="center w-100">
                    <CardList cards={filteredBars} key="place_id"/>
                </div>
            </div>
        )
    }
}

const filterByName = (bars = [], name) => bars.filter(bar => bar.name.toLowerCase().includes(name))

export default App
