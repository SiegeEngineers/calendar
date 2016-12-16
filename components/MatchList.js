import React from 'react'
import Media from 'react-media'
import { mobileBreakpoint } from '../styles/common'
import MatchMobile from './MatchMobile'
import MatchDesktop from './MatchDesktop'


export default class MatchList extends React.Component {
  render () {
    const { d, timezone, matches } = this.props
    return (
      <Media query={mobileBreakpoint}>
        {isMobile => {
          const MatchComponent = isMobile ? MatchMobile : MatchDesktop
          return (
            <div>
              {matches.map(match => (
                <MatchComponent
                  d={d}
                  match={match}
                  timezone={timezone} />
              ))}
            </div>
          )
        }}
      </Media>
    )
  }
}