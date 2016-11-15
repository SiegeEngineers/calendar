import React from 'react'
import Immutable from 'immutable'
import css, { merge } from 'next/css'
import GSpread from 'google-spreadsheets'
import moment from 'moment-timezone'
import jstz from 'jstz'


const gKey = '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'
  
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timezone: false };
  }
  
  componentDidMount() {
    moment.locale(window.navigator.language)
    this.setState({timezone: jstz.determine()})
  }
  
  static async getInitialProps ({ req }) {
    return {
      server: req ? true : false,
      players: await getRows('oe5g22b', 'name'),
      matches: await getRows('od6'),
      flags: await getRows('ojz6xko', 'name')
    }
  }

  render () {
    const d = fromJSOrdered(this.props)
    // if (this.state.timezone) moment.locale(this.state.timezone)
    return (
    <div className={general}>
        <div className={topNoteStyle}>
          <b>Professional Age of Empires 2 Calendar</b>
          <br/>new to pro AoE2? <a href="test">learn more</a>
          <br/>{this.state.timezone ? 'all times in ' + this.state.timezone.name() : ''}
        </div>
        {d.get('matches').map(match => (
          <div className={matchStyle} onClick={() => test(d)}>
              <hr className={matchDividerStyle}/>
              <div className={merge(player, left)}>
                {match.get('team')}
                <img className={merge(flag, {float: 'right'})} 
                    src={d.getIn(['flags', d.getIn(['players', match.get('team'), 'country']), 'url'])}/>
              </div>
              <div className={divider}> {this.state.timezone ? 
                <div>
                  <div className={dateStyle}>{moment(new Date(match.get('time') + ' UTC')).format('ll')}</div>
                  <div>{moment(new Date(match.get('time') + ' UTC')).format('LT')}</div>
                </div>
                : '...'}</div>
              <div className={merge(player, right)}>
                <img className={merge(flag, {float: 'left'})} 
                    src={d.getIn(['flags', d.getIn(['players', match.get('team_2'), 'country']), 'url'])}/>
                {match.get('team_2')}
              </div>
              <div className={eventStyle}>
                {match.get('event')} - {match.get('round')} - {match.get('format')}
              </div>
          </div>
        ))}
        <div className={footerStyle}>
          <hr />
          <span>made by patao with love</span>
        </div>
    </div>)
  }
}

// testing
const fromJSOrdered = (js) => {
  return typeof js !== 'object' || js === null ? js :
    Array.isArray(js) ? 
      Immutable.Seq(js).map(fromJSOrdered).toList() :
      Immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
}

// Experiment
const test = (d) => {
    window.d = d
    window.g = GSpread
    GSpread({key: '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'}, (err, sheet) => {
        window.sheet = sheet
    })
}
  
// Data fetchers
const getRows = (worksheetId, keyName) => {
  return new Promise((resolve, reject) => {
    GSpread.rows({key: gKey, worksheet: worksheetId}, (err, rows) => {
      if (err !== null) return reject(err)
      const results = keyName 
        ? rows.reduce((prev, cur) => prev.set(cur[keyName], cur), Immutable.OrderedMap())
        : Immutable.fromJS(rows)
      resolve(results)
    })
  })
}


// Styling
const general = css({fontFamily: 'Century Gothic, sans-serif', 
                      width: 80 * 12 + 'px', 
                      paddingLeft: 10 + 'px', 
                      paddingRight: 10 + 'px',
                      margin: 'auto',
                      color: '#333333'
})

const dateStyle = css({fontSize: '12pt'})
const player = css({fontSize: '30pt', fontVariant: 'small-caps'})
const divider = css({fontSize: '16pt', paddingTop: '2px', textAlign: 'center', float: 'left', width: 80 * 2 + 'px'})
const topNoteStyle = css({textAlign: 'center', fontSize: '10pt', fontStyle: 'italic'})
const matchStyle = css({clear: 'both', paddingTop: '2em'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
const footerStyle = css({width: '100%', marginTop: '2em', textAlign: 'center'})
const left = css({float: 'left', textAlign: 'right', width: 80 * 5 + 'px'})
const right = css({float: 'right', textAlign: 'left', width: 80 * 5 + 'px'})
const flag = css({height: '1em', paddingTop: '5px', margin: '0px 0.5em 0px 0.5em', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))'})