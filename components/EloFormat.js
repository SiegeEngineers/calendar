import React from 'react'
import css, { merge } from 'next/css'

export default class EloFormat extends React.Component {
  render () {
    const eloString = this.props.elo.length != 4 ? '???' : this.props.elo[0] + 'k' + this.props.elo[1]
    return <span className={merge(eloStyle, css({fontSize: Math.ceil(7 + 7 / this.props.teamSize) + 'pt'}))}>{eloString}</span>
  }
}

const eloStyle = css({fontSize: '14pt', color: '#C8C8C8', marginLeft: '0.25em', marginRight: '0.25em'})