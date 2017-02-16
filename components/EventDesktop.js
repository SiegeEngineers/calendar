import React from 'react'
import css, { merge } from 'next/css'
import { divider, matchStyle } from '../styles/common'
import MatchTime from './MatchTime'
import MatchStreams from './MatchStreams'
import EventPlayerList from './EventPlayerList'

// Match display on a landscape-style screen.
export default class EventDesktop extends React.Component {
  render () {
    const { d, event, timezone } = this.props
    const players = event.players.split(',')
    const leftPlayers = players.slice(0, Math.ceil(players.length / 2))
    const rightPlayers = players.slice(Math.ceil(players.length / 2), players.length)
    return (
      <div className={matchStyle}>
        <hr className={matchDividerStyle}/>
        <EventPlayerList d={d} players={leftPlayers} event={event} largestTeamSize={Math.max(leftPlayers, rightPlayers)} side='left'/>
        <div className={divider}>
          <img src={event.logo} style={{width: '100px'}}/>
          <MatchTime time={event.nextstarttime} timezone={timezone} />
        </div>
        <EventPlayerList d={d} players={rightPlayers} event={event} largestTeamSize={Math.max(leftPlayers, rightPlayers)} side='right'/>
        <div className={merge(eventStyle, css({fontSize: '12pt'}))}>
          {event.name} ${event.prizepool} <br /> {event.humanreadabledates}
        </div>
        <div className={eventStyle}>
          <a href={event.brackets}>Brackets</a> - <a href={event.settings}>Settings</a>
        </div>
        <MatchStreams d={d} streams={event.streams} />
      </div>
        /*
        <Team d={d} team={match.team_2} match={match} side='right'/>

        
      </div>*/
    )
  }
}

const recordedStyle = css({color: 'red', fontWeight: 'bold'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
