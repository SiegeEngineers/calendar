import React from 'react'
import { link } from '../styles/common'

export default class Admin extends React.Component {
    
    syncAoCZone() {
        alert('syncedd - future feature')
    }
    render() {
        return <div>
            <h1>Hello</h1>
            <div className={link} onClick={() => this.syncAoCZone()}>Sync to AoCZone</div>
        </div>
    }
}