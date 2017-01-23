import React from 'react'
import Media from 'react-media'
import { mobileBreakpoint } from '../styles/common'
import MatchMobile from './MatchMobile'
import MatchDesktop from './MatchDesktop'


export default class MatchList extends React.Component {
  static contextTypes = {
    // Whether we're targeting a mobile device during a server-side render.
    isMobileAgent: React.PropTypes.bool
  }

  render () {
    const { isMobileAgent } = this.context
    const { d, timezone, matches } = this.props
    return (
      <Media query={mobileBreakpoint}>
        {isMobileViewport => {
          // isMobileAgent is `null` on client renders. We should only use it
          // for server renders.
          const isMobile = isMobileAgent !== null ? isMobileAgent : isMobileViewport

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