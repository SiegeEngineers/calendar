import React from 'react'
import css, { merge } from 'next/css'
import { divider, matchStyle } from '../styles/common'
import MatchTime from './MatchTime'
import MatchStreams from './MatchStreams'
import Team from './Team'
import moment from 'moment-timezone'
import CalendarExporter from './CalendarExporter'

// Match display on a landscape-style screen.
export default class MatchMobile extends React.Component {
  render () {
    const { d, match, timezone } = this.props

    return (
      <div className={matchStyle}>
        <hr className={matchDividerStyle}/>
        <div className={mobileMatchTimeStyle}>
          <MatchTime time={match.time} timezone={timezone} />
          <CalendarExporter
                title={match.event + ": " + match.team + " vs " + match.team_2 + " (" + match.round + ")"}
                startTime={new Date(match.time)} endTime={moment(new Date(match.time)).add(1.5, 'hours').toString()}
                content={match.content}
                location={match.schedulingthread}
          />
        </div>
        <div className={eventStyle}>
          {match.recorded == 'TRUE' 
            ? <span className={recordedStyle}>(RECS)</span> 
            : null} 
          {match.event} - {match.round} - {match.format}
        </div>
        <div style={{margin:'1em 0 1em 0'}}>
          <Team d={d} team={match.team} match={match} side='right'/>
          <Team d={d} team={match.team_2} match={match} side='left'/>
          <div style={{clear:'both'}} />
        </div>
        <MatchStreams d={d} streams={match.streams} />
      </div>
    )
  }
}

const recordedStyle = css({color: 'red', fontWeight: 'bold'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
const mobileMatchTimeStyle = merge([divider, css({ width: '100%' })])
