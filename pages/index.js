import React from 'react'
// import Immutable from 'immutable'
import _ from 'lodash'
import css, { merge } from 'next/css'
import GSpread from 'google-spreadsheets'
import moment from 'moment-timezone'
import Head from 'next/head'
import ReactGA from 'react-ga'
import isMobile from 'is-mobile'
import {general, miniFlag, topNoteStyle, link, matchFilters, footerStyle, matchStyle} from '../styles/common'
import MatchList from '../components/MatchList'
import FilterSelect from '../components/FilterSelect'
import FilterSwitch from '../components/FilterSwitch'
import TimezoneSelector from '../components/TimezoneSelector'
import TopMatchSelector from '../components/TopMatchSelector'
import jstz from 'jstz'
import { normalize } from '../helpers/helpers'

const gKey = '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
       timezone: false,
       filter2k: true,
       filterPro: true,
       filterUpc: true,
       filterEvent: false,
       filterPlayer: false,
       filterLive: false,
       showAll: false
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
  
  static async getInitialProps ({ req }) {
    // To find new ID, use window.sheet
    return {
      server: req ? true : false,
      isMobileAgent: req ? isMobile(req) : null,
      players: await getRows('oe5g22b', 'name'),
      matches: await getRows('od6'),
      flags: await getRows('ojz6xko', 'name'),
      events: await getRows('o1vzpub', 'name'),
      streamers: await getRows('o5jbq27', 'name')
    }
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
    } else {
      // if(this.state.filter2k) {
      //   const players2k = _.values(d.players).filter((p) => ((p.rating || ' ')[0] == '2')).map((p) => normalize(p.name))
      //   const getRating = (p) => (parseInt(_.get(d.players, [normalize(p), 'rating'], '1600')))
      //   const getAverage = (arr) => (arr.reduce((x, y)=>x+y,0) / arr.length)
        
      //   results = results.filter((match) => 
      //     getAverage((match.team.split(',').map(getRating).concat(match.team_2.split(',').map(getRating)))) > 2000)
      // }
    }
    
    if (!this.state.showAll) {
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
    
    // if (this.state.filterLive) {
    //   results = results.filter((match) => (match.recorded !== 'TRUE'))
    // }
    
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
        <hr />
        <div className={matchFilters}>
          <FilterSelect default='top games only' 
            selected={this.state.showAll} 
            options={['all']} 
            handler={(v)=>this.setState({showAll: v})}/>
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
          <span>made by <img className={miniFlag} src={_.get(d, ['flags', normalize('United States of America'), 'url'])}/> patao with love</span>
          <br/>
          <span>with really amazing help from</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Netherlands'), 'url'])}/> nimanoe</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Australia'), 'url'])}/> robo</span>
          <br/>
          <span><img className={miniFlag} src={_.get(d, ['flags', normalize('Netherlands'), 'url'])}/> goto-bus-stop</span>
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


