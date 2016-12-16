import React from 'react'
import moment from 'moment'
import css, { merge } from 'next/css'

/**
 * Render match time in the user's own timezone.
*/
export default class MatchTime extends React.Component {
  render () {
    const { time, timezone } = this.props

    const dateStr = moment(new Date(time + ' UTC')).format('ll')
    const timeStr = timezone == 'GMT'
      ? moment(new Date(time + ' UTC')).format('HH:mm')
      : moment(new Date(time + ' UTC')).format('LT')
      
      return timezone ? (
        <div>
          <div className={dateStyle}>{dateStr}</div>
          <div>{timeStr}</div>
        </div>
      ) : (
        <span>...</span>
      )
  }
}

const dateStyle = css({fontSize: '12pt'})