import React from 'react'
import logo from './logo.svg'
import 'tachyons/css/tachyons.min.css'

import CardContainer from "./CardContainer"

class App extends React.Component {

    render() {
        return (
            <div className="center">
                <header className="pa3 pa4-ns tc">
                    <img src={logo} className="h3" alt="logo"/>
                </header>
                <CardContainer/>
            </div>
        )
    }
}

export default App
