import React from 'react'
import css, { merge } from 'next/css'
import { link } from '../styles/common'

export default class TopMatchSelector extends React.Component {
  render () {
    const current = this.props.active ? 'top games only' : 'all'
    const other = this.props.active ? 'all' : 'top games only'
    return <div className={matchFilters}>
      showing {current}
      &nbsp;
      (<span className={link} onClick={() => {this.props.toggle()}}>show {other}</span>)
    </div>
  }
}