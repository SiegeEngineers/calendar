import React from 'react'
import css, { merge } from 'next/css'
import _ from 'lodash'
import EloFormat from './EloFormat'
import { flag, left, right } from '../styles/common'
import { normalize } from '../helpers/helpers'

export default class Player extends React.Component {
  render () {
    const d = this.props.d
    let p = this.props.player
    if(!p) {
      p = {rating: '?', name: '???', country:'United Nations'}
    }
    let rating = this.props.isDeathmatch ? p.dm || p.rating : p.rating
    const elo = <EloFormat elo={rating || '?'} {...this.props} />
    
    const img = <img className={merge(flag, flagSides[this.props.side])} src={_.get(d, ['flags', normalize(p.country), 'url'])} />
    
    const adjustForTeamSize = css({fontSize: Math.max(Math.ceil(10 + 20 / this.props.teamSize), 20) + 'pt', marginTop: this.props.idx ? '0.5em': '0em'})
    
    if (this.props.side == 'left') {
      return <div className={merge(player, left, adjustForTeamSize)}>
        {elo}{p.name}{img}
      </div>
    } else {
      return <div className={merge(player, right, adjustForTeamSize)}>
        {img}{p.name}{elo}
      </div>
    }
  }
}

const player = css({fontSize: '30pt', fontVariant: 'small-caps'})
const flagSides = {
   left: css({
     float: 'right',
     margin: '0 0 0 0.5em'
   }),
   right: css({
     float: 'left',
     margin: '0 0.5em 0 0'
   })
 }