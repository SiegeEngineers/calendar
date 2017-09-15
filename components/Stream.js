import React from 'react'
import css, { merge } from 'next/css'

export default class Stream extends React.Component {
  render () {
    return <div className={css({display: 'inline-block', cursor: 'pointer', width:'6em'})}>
      <a href={this.props.stream.twitch} target="_blank" className={css({color: 'blue'})}>
        <img src={this.props.stream.icon} className={css({maxWidth: '45px'})}/><br/>
        {this.props.stream.name}
      </a>
    </div>
  }
}
