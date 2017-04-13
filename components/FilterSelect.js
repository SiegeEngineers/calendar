import React from 'react'
import css, { merge } from 'next/css'

export default class FilterSelect extends React.Component {
  render () {
    return <select className={filterSelect} value={this.props.selected} onChange={(e) => this.props.handler(e.target.value)}>
      <option value={''}>{this.props.default}</option>
      {this.props.options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  }
}

const filterSelect = css({width: 80 * 2 + 'px', marginLeft: 10 + 'px'})
