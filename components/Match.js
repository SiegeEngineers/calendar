import React from 'react'
import Team from './Team'
import Stream from './Stream'
import { divider, matchStyle } from '../styles/common'
import { normalize } from '../helpers/helpers'
import css, { merge } from 'next/css'
import moment from 'moment'
import _ from 'lodash'

export default class Match extends React.Component {
  render () {
    const d = this.props.d
    const match = this.props.match
    const dm = match.event.toLowerCase().includes('dm')
    return (
            <div className={matchStyle}>
              <hr className={matchDividerStyle}/>
              <Team d={d} team={match.team} match={match} side='left' dm={dm}/>
              <div className={divider}> {this.props.timezone ? 
                <div>
                  <div className={dateStyle}>{moment(new Date(match.time + ' UTC')).format('ll')}</div>
                  <div>{this.props.timezone == 'GMT'
                    ? moment(new Date(match.time + ' UTC')).format('HH:mm')
                    : moment(new Date(match.time + ' UTC')).format('LT')}</div>
                </div>
                : '...'}</div>
              <Team d={d} team={match.team_2} match={match} side='right' dm={dm}/>
              <div className={eventStyle}>
                {match.recorded == 'TRUE' ? <span className={recordedStyle}>(RECS)</span> : null} {match.event} - {match.round} - {match.format}
              </div>
              <div className={streamStyle}>
                {match.streams.split(',').map(stream => _.get(d, ['streamers', normalize(stream)])).filter(stream => stream !== undefined).map(
                  (stream) => (<Stream stream={stream} />))}
              </div>
          </div>)
  }
}

const streamStyle = css({textAlign: 'center', marginTop: '1em'})
const recordedStyle = css({color: 'red', fontWeight: 'bold'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const dateStyle = css({fontSize: '12pt'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
