import React from 'react'
import _ from 'lodash'
import css, { merge } from 'next/css'
import Player from './Player'
import { normalize } from '../helpers/helpers'
import { mobile } from '../styles/common'

export default class EventPlayerList extends React.Component {
  render () {
    const d = this.props.d
    const eventName = this.props.event.name.toLowerCase()
    const isDeathmatch = eventName.includes('dm') || eventName.includes('death')
    const largestTeamSize = this.props.largestTeamSize

    return <div className={merge(teamStyle)}>
      {
        this.props.players.map((p, idx) => 
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
