import React from 'react'
import css, { merge } from 'next/css'

export default class FilterSwitch extends React.Component {
  render () {
    const o1class = this.props.selected ? merge(filterSwitchOption, filterSwitchOptionActive) : filterSwitchOption
    const o2class = !this.props.selected ? merge(filterSwitchOption, filterSwitchOptionActive) : filterSwitchOption
    return <div className={filterSwitch}>
      <span className={o1class} onClick={() => this.props.handler(true)}>
        {this.props.option_1}
      </span>
       | 
      <span className={o2class} onClick={() => this.props.handler(false)}>
        {this.props.option_2}
      </span>
    </div>
  }
}

const filterSwitchOptionActive = css({color: '#333333',  textDecoration: 'none'})
const filterSwitchOption = css({color: '#C8C8C8', cursor: 'pointer'})
const filterSwitch = css({textAlign: 'center', display:'inline-block', margin: '0em 1em 0em 1em'})