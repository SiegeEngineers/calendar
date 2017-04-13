import React from 'react'
import _ from 'lodash'
import css, { merge } from 'next/css'
import Player from './Player'
import { normalize } from '../helpers/helpers'
import { mobile } from '../styles/common'

export default class Team extends React.Component {
  render () {
    const d = this.props.d
    const eventName = this.props.match.event.toLowerCase()
    const isDeathmatch = eventName.includes('dm') || eventName.includes('death')
    const largestTeamSize = Math.max(this.props.match.team.split(',').length, this.props.match.team_2.split(',').length)
    return <div className={merge(teamStyle)}>
      {
        this.props.team.split(',').map((p, idx) => 
          <Player key={idx} player={_.get(d, ['players', normalize(p)])} 
            isDeathmatch={isDeathmatch}
            idx={idx} 
            teamSize={largestTeamSize}
            {...this.props} />)
      }
    </div>
  }
}

const teamStyle = css({
  float: 'left',
  width: 80 * 5 + 'px',
  [mobile]: {
    width: '100%'
  }
})
