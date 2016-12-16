import React from 'react'
import _ from 'lodash'
import css, { merge } from 'next/css'
import Player from './Player'
import { normalize } from '../helpers/helpers'

export default class Team extends React.Component {
  render () {
    const d = this.props.d
    const largestTeamSize = Math.max(this.props.match.team.split(',').length, this.props.match.team_2.split(',').length)
    return <div className={merge(teamStyle)}>
      {this.props.team.split(',').map((p, idx) => <Player player={_.get(d, ['players', normalize(p)])} {...this.props} idx={idx} teamSize={largestTeamSize}/>)}
    </div>
  }
}

const teamStyle = css({float: 'left', width: 80 * 5 + 'px'})
