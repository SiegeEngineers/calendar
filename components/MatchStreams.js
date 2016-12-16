import React from 'react'
import css, { merge } from 'next/css'
import _ from 'lodash'
import { normalize } from '../helpers/helpers'
import Stream from './Stream'

export default class MatchStreams extends React.Component {
  render () {
    const { d, streams } = this.props
    return (
      <div className={streamStyle}>
        {streams.split(',')
          .map(stream => _.get(d, ['streamers', normalize(stream)]))
          .filter(stream => stream !== undefined)
          .map((stream) => (
            <Stream stream={stream} />
          ))
        }
      </div>
    )
  }
}

const streamStyle = css({textAlign: 'center', marginTop: '1em'})