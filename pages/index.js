import React from 'react'
// import Immutable from 'immutable'
import _ from 'lodash'
import css, { merge } from 'next/css'
import GSpread from 'google-spreadsheets'
import moment from 'moment-timezone'
import Head from 'next/head'
import ReactGA from 'react-ga'
import isMobile from 'is-mobile'
import props from 'promise-props'
import {general, miniFlag, topNoteStyle, link, matchFilters, footerStyle, matchStyle} from '../styles/common'
import MatchList from '../components/MatchList'
import FilterSelect from '../components/FilterSelect'
import FilterSwitch from '../components/FilterSwitch'
import TimezoneSelector from '../components/TimezoneSelector'
import jstz from 'jstz'
import { normalize } from '../helpers/helpers'

const gKey = '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
       timezone: false,
       filterPro: true,
       filterUpc: true,
       filterEvent: false,
       filterPlayer: false,
       filterTop: false,
       showTop: false
     };
  }
  
  componentDidMount() {
    // Set up function to initialize test capabilities if necessary
    window.test = (d) => {
        window.d = d
        window._ = _
        window.g = GSpread
        GSpread({key: '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'}, (err, sheet) => {
            window.sheet = sheet
        })
    } 
    
    moment.locale(window.navigator.language)
    
    this.setState({timezone: localStorage.getItem('timezone') || moment.tz(jstz.determine().name()).zoneAbbr()})
    
    // Save to analytics on each mount
    ReactGA.initialize('UA-88082608-1')
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
  
  static getInitialProps ({ req }) {
    // To find new ID, use window.sheet
    return props({
      server: req ? true : false,
      isMobileAgent: req ? isMobile(req) : null,
      players: getRows('oe5g22b', 'name'),
      matches: getRows('od6'),
      flags: getRows('ojz6xko', 'name'),
      events: getRows('o1vzpub', 'name'),
      streamers: getRows('o5jbq27', 'name'),
      cms: (req.url.indexOf("test") > -1) ? getRows('out9nrp', 'name') : getRows('orxrubb', 'name')
    })
  }

  static childContextTypes = {
    isMobileAgent: React.PropTypes.bool
  }

  getChildContext () {
    return {
      isMobileAgent: this.props.isMobileAgent
    }
  }

  filterMatches(d) {
    let results = d.matches
    
    if(this.state.filterEvent) {
      results = results.filter((match) => (match.event == this.state.filterEvent))
    }
    
    if(this.state.filterRound) {
      results = results.filter((match) => (match.round == this.state.filterRound))
    }
    
    if (this.state.filterPlayer) {
      results = results.filter((match) => (match.team.indexOf(this.state.filterPlayer) > -1 || match.team_2.indexOf(this.state.filterPlayer) > -1))
    }
    
    if (this.state.filterTop) {
      // Helpers
      const getRating = (p, t) => (parseInt(_.get(d.players, [normalize(p), t], '1600')))
      const getAverage = (arr) => (arr.reduce((x, y)=>x+y,0) / arr.length)
      results = results.filter((match) => {
        const dm = match.event.toLowerCase().includes('dm')
        const players = match.team.split(',').concat(match.team_2.split(','))
        const elos = players.map((p) => (dm ? getRating(p, dm ? 'dm' : 'rating') + 200 : getRating(p, 'rating')))
        const average = getAverage(elos)
        return ((average >= 2000) || match.streams)
      })
    }
    
    // Remove expired matches
    const expired = moment().subtract(1.5, 'hours')
    results = results.filter((match) => moment(new Date(match.time + ' UTC')) > expired)
    
    return results
  }

  render () {
    const d = this.props
    const matches = this.filterMatches(d)
    const events = Object.values(d.events)
    let entries = [...events, ...matches]
    
    // Set timezone
    if(this.state.timezone) {
      moment.tz.setDefault(this.state.timezone)
    }
    
    const headerCMS = d.cms.header
    
    return (
    <div className={general}>
        <Head>
          <title>Professional Age of Empires 2 calendar</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="static/favicon.ico" />
        </Head>
        <div className={topNoteStyle}>
          <b>Professional Age of Empires 2 Calendar</b>
          <br/>new to pro AoE2? <a href="https://medium.com/@charlieoffenbacher/5-minute-intro-to-pro-age-of-empires-2-94de4b3573b#.tc3kgqu8p" className={link}>learn more</a>
          <br/>{this.state.timezone ? 'all times in ' + this.state.timezone : ''}
          <TimezoneSelector active={this.state.timezone} toggle={(tz) => this.setState({timezone: tz})} />
        </div>
        { d.cms.header ? <div dangerouslySetInnerHTML={{__html: d.cms.header.content}} />: null}
        <hr />
        <div className={matchFilters}>
          <FilterSelect default='all levels'
            selected={this.state.filterTop}
            options={['top games only']}
            handler={(v)=>this.setState({filterTop: v})}/>
          <FilterSelect default='all events' 
            selected={this.state.filterEvent} 
            options={_.uniq(matches.map((match) => (match.event)))} 
            handler={(v)=>this.setState({filterEvent: v})}/>
          <FilterSelect default='all rounds' 
            selected={this.state.filterRound} 
            options={_.uniq(matches.map((match) => (match.round)))} 
            handler={(v)=>this.setState({filterRound: v})}/>
          <FilterSelect default='all players'
            selected={this.state.filterPlayer}
            options={_.uniq(_.flattenDeep(matches.map((match) => ([...match.team.split(','), ...match.team_2.split(',')]))))}
            handler={(v)=>this.setState({filterPlayer: v})}/>
        </div>
        {entries.length 
        ? <MatchList entries={entries} d={d} timezone={this.state.timezone} />
        : <div className={merge([matchStyle, css({textAlign: 'center'})])}> 
          No matches scheduled for these filters at the moment 
        </div>  
        }
        <div className={footerStyle}>
          <hr />
          <span>made w/ love by <img className={miniFlag} src={_.get(d, ['flags', normalize('United States of America'), 'url'])}/>
            &nbsp;<a href="https://github.com/coffenbacher">patao</a>, source available at <a href="https://github.com/coffenbacher/calendar">github</a>
          </span>
          <br/>
          <span>improved with really amazing help from</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Netherlands'), 'url'])}/> nimanoe</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Australia'), 'url'])}/> robo</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Netherlands'), 'url'])}/> goto-bus-stop</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Brazil'), 'url'])}/> damianijr</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Japan'), 'url'])} style={{boxShadow: '1px 1px 1px #888888'}}/> iPhone</span>
        </div>
    </div>)
  }
}

// Data fetchers
const getRows = (worksheetId, keyName) => {
  return new Promise((resolve, reject) => {
    GSpread.rows({key: gKey, worksheet: worksheetId}, (err, rows) => {
      if (err !== null) return reject(err)
      const results = keyName 
        // If there's a key
        ? rows.reduce((prev, cur) => {
            // Wipe out weird $t objects that appear in empty cells, default to '' instead
            _.keys(_.pickBy(_.omit(cur, 'id'), _.isObjectLike)).map(k => _.set(cur, k, ''))
            prev[normalize(cur[keyName])] = cur
            return prev
          }, {})
        // If there's no key specified
        : rows.map(cur => {
            // Wipe out weird $t objects that appear in empty cells, default to '' instead
            _.keys(_.pickBy(_.omit(cur, 'id'), _.isObjectLike)).map(k => _.set(cur, k, ''))
            return cur
        })
      resolve(results)
    })
  })
}
