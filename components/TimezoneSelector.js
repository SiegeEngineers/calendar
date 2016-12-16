import React from 'react'
import css, { merge } from 'next/css'
import jstz from 'jstz'
import moment from 'moment'
import { link } from '../styles/common'

export default class TimezoneSelector extends React.Component {
  render () {
    /* Server side loading */
    if (!this.props.active) return <span></span>
    
    const local = moment.tz(jstz.determine().name()).zoneAbbr()
    const other = this.props.active ==  'GMT' ? local : 'GMT'
    return <span>
      &nbsp;(<span className={link} onClick={() => 
        {localStorage.setItem('timezone', other); this.props.toggle(other)}}>switch to {other}</span>)
    </span>
  }
}