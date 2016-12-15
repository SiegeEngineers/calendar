import React from 'react'
// import Immutable from 'immutable'
import _ from 'lodash'
import css, { merge } from 'next/css'
import GSpread from 'google-spreadsheets'
import moment from 'moment-timezone'
import jstz from 'jstz'
import Head from 'next/head'
import ReactGA from 'react-ga'
import Media from 'react-media'

const gKey = '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg'

// Helper components
class Stream extends React.Component {
  render () {
    return <div className={css({display: 'inline-block', cursor: 'pointer', width:'6em'})}>
      <img src={this.props.stream.icon} className={css({maxWidth: '45px'})}/><br/>
      <a href={this.props.stream.twitch} target="_blank" className={css({color: 'blue'})}>{this.props.stream.name}</a>
    </div>
  }
}

class EloFormat extends React.Component {
  render () {
    const eloString = this.props.elo.length != 4 ? '???' : this.props.elo[0] + 'k' + this.props.elo[1]
    return <span className={merge(eloStyle, css({fontSize: Math.ceil(7 + 7 / this.props.teamSize) + 'pt'}))}>{eloString}</span>
  }
}

class Player extends React.Component {
  render () {
    const d = this.props.d
    let p = this.props.player
    if(!p) {
      p = {rating: '?', name: '???', country:'United Nations'}
    }
    
    const elo = <EloFormat elo={p.rating || '?'} {...this.props} />
    const img = <img className={merge(flag, flagSides[this.props.side])}
                     src={_.get(d, ['flags', p.country, 'url'])} />
    
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

class Team extends React.Component {
  render () {
    const d = this.props.d
    const largestTeamSize = Math.max(this.props.match.team.split(',').length, this.props.match.team_2.split(',').length)
    return <div className={merge(teamStyle)}>
      {this.props.team.split(',').map((p, idx) => <Player player={_.get(d, ['players', p])} {...this.props} idx={idx} teamSize={largestTeamSize}/>)}
    </div>
  }
}

class FilterSwitch extends React.Component {
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

class FilterSelect extends React.Component {
  render () {
    return <select className={filterSelect} value={this.props.selected} onChange={(e) => this.props.handler(e.target.value)}>
      <option value={''}>{this.props.default}</option>
      {this.props.options.map(option => (
        <option value={option}>{option}</option>
      ))}
    </select>
  }
}

class TimezoneSelector extends React.Component {
  render () {
    /* Server side loading */
    if (!this.props.active) return <span></span>
    
    const local = moment.tz(jstz.determine().name()).zoneAbbr()
    const other = this.props.active ==  'GMT' ? local : 'GMT'
    return <span>
      &nbsp;(<span className={link} onClick={() => 
        {localStorage.setItem('timezone', other); this.props.toggle(other)}}>switch to {other}</span>)
    </span>
  }
  
}

/**
 * Render match time in the user's own timezone.
 */
class MatchTime extends React.Component {
  render () {
    const { time, timezone } = this.props

    const dateStr = moment(new Date(time + ' UTC')).format('ll')
    const timeStr = timezone == 'GMT'
      ? moment(new Date(time + ' UTC')).format('HH:mm')
      : moment(new Date(time + ' UTC')).format('LT')

      return timezone ? (
        <div>
          <div className={dateStyle}>{dateStr}</div>
          <div>{timeStr}</div>
        </div>
      ) : (
        <span>...</span>
      )
  }
}

/**
 * Render icons for a list of streams.
 */
class MatchStreams extends React.Component {
  render () {
    const { d, streams } = this.props
    return (
      <div className={streamStyle}>
        {streams.split(',')
          .map(stream => _.get(d, ['streamers', stream]))
          .filter(stream => stream !== undefined)
          .map((stream) => (
            <Stream stream={stream} />
          ))
        }
      </div>
    )
  }
}

/**
 * Match display on a portrait-style screen.
 */
class MatchMobile extends React.Component {
  render () {
    const { d, match, timezone } = this.props

    return (
      <div className={matchStyle} onClick={() => test(d)}>
        <hr className={matchDividerStyle} />
        <div className={mobileMatchTimeStyle}>
          <MatchTime time={match.time} timezone={timezone} />
        </div>
        <div className={eventStyle}>
          {match.event} - {match.round} - {match.format}
        </div>
        <Team d={d} team={match.team} match={match} side='right'/>
        <Team d={d} team={match.team_2} match={match} side='left'/>
        <MatchStreams d={d} streams={match.streams} />
      </div>
    )
  }
}

/**
 * Match display on a landscape-style screen.
 */
class MatchDesktop extends React.Component {
  render () {
    const { d, match, timezone } = this.props

    return (
      <div className={matchStyle} onClick={() => test(d)}>
        <hr className={matchDividerStyle}/>
        <Team d={d} team={match.team} match={match} side='left'/>
        <div className={divider}>
          <MatchTime time={match.time} timezone={timezone} />
        </div>
        <Team d={d} team={match.team_2} match={match} side='right'/>
        <div className={eventStyle}>
          {match.event} - {match.round} - {match.format}
        </div>
        <MatchStreams d={d} streams={match.streams} />
      </div>
    )
  }
}

/**
 * Container for a list of matches.
 */
class MatchList extends React.Component {
  render () {
    const { d, timezone, matches } = this.props
    return (
      <Media query={mobileBreakpoint}>
        {isMobile => {
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timezone: false, filter2k: true, filterPro: true, filterUpc: true, filterEvent: false, filterPlayer: false };
  }
  
  componentDidMount() {
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
      players: await getRows('oe5g22b', 'name'),
      matches: await getRows('od6'),
      flags: await getRows('ojz6xko', 'name'),
      streamers: await getRows('o5jbq27', 'name')
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
      if(this.state.filter2k) {
        const players2k = _.values(d.players).filter((p) => ((p.rating || ' ')[0] == '2')).map((p) => p.name)
        const getRating = (p) => (parseInt(_.get(d.players, [p, 'rating'], '1600')))
        const getAverage = (arr) => (arr.reduce((x, y)=>x+y,0) / arr.length)
        
        results = results.filter((match) => 
          getAverage((match.team.split(',').map(getRating).concat(match.team_2.split(',').map(getRating)))) > 2000)
      }
    }
    
    if (this.state.filterPro) {
      // unimplemented
    }
    
    // Remove expired matches
    const expired = moment().subtract(6, 'hours')
    results = results.filter((match) => moment(new Date(match.time + ' UTC')) > expired)
    
    return results
  }

  render () {
    const d = this.props
    const matches = this.filterMatches(d)
    
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
          <FilterSwitch option_1='2k+' option_2='all' selected={this.state.filter2k} handler={(v)=>{this.setState({filter2k: v})}}/>
          <FilterSwitch option_1='pro' option_2='all' selected={this.state.filterPro} handler={(v)=>{this.setState({filterPro: v})}}/>
          <FilterSwitch option_1='upc' option_2='all' selected={this.state.filterUpc} handler={()=>alert('Support for completed games (VODs, scores, spoiler mode, etc) will be added in the next version!')}/>
        </div>
        <div className={matchFilters}>
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
        {matches.length ? (
          <MatchList
            d={d}
            timezone={this.state.timezone}
            matches={matches} />
        ) : (
          <div className={merge([matchStyle, css({textAlign: 'center'})])}>
            No matches scheduled for these filters at the moment
          </div>
        )}
        <div className={footerStyle}>
          <hr />
          <span>made by patao with love</span>
        </div>
    </div>)
  }
}


// Experiment
const test = (d) => {
    window.d = d
    window._ = _
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
        ? rows.reduce((prev, cur) => {
            // Wipe out weird $t objects that appear in empty cells, default to '' instead
            _.keys(_.pickBy(_.omit(cur, 'id'), _.isObjectLike)).map(k => _.set(cur, k, ''))
            prev[cur[keyName]] = cur
            return prev
          }, {})
        : rows.map(cur => {
            // Wipe out weird $t objects that appear in empty cells, default to '' instead
            _.keys(_.pickBy(_.omit(cur, 'id'), _.isObjectLike)).map(k => _.set(cur, k, ''))
            return cur
        })
      resolve(results)
    })
  })
}


// Media query for styles for mobile devices.
const mobileBreakpoint = '(max-width: 768px)'
const mobile = `@media ${mobileBreakpoint}`

// Styling
const general = css({
  fontFamily: 'Consolas, monaco, monospace',
  width: 80 * 12 + 'px',
  paddingLeft: 10 + 'px',
  paddingRight: 10 + 'px',
  margin: 'auto',
  color: '#333333',
  [mobile]: {
    maxWidth: '100%',
    boxSizing: 'border-box'
  }
})

const filterSelect = css({
  width: 80 * 2 + 'px',
  marginLeft: 10 + 'px',
  [mobile]: {
    display: 'block',
    marginLeft: 0,
    width: '100%',
    height: 32 + 'px',
    marginBottom: 10 + 'px'
  }
})
const filterSwitchOptionActive = css({color: '#333333',  textDecoration: 'none'})
const filterSwitchOption = css({color: '#C8C8C8', cursor: 'pointer'})
const filterSwitch = css({textAlign: 'center', display:'inline-block', margin: '0em 1em 0em 1em'})
const streamStyle = css({textAlign: 'center', marginTop: '1em'})
const dateStyle = css({fontSize: '12pt'})
const teamStyle = css({
  float: 'left',
  width: 80 * 5 + 'px',
  [mobile]: {
    width: '100%'
  }
})
const player = css({fontSize: '30pt', fontVariant: 'small-caps'})
const eloStyle = css({fontSize: '14pt', color: '#C8C8C8', marginLeft: '0.25em', marginRight: '0.25em'})
const divider = css({fontSize: '16pt', paddingTop: '2px', textAlign: 'center', float: 'left', width: 80 * 2 + 'px'})
const mobileMatchTimeStyle = merge([divider, css({ width: '100%' })])
const topNoteStyle = css({textAlign: 'center', fontSize: '10pt', fontStyle: 'italic'})
const matchStyle = css({clear: 'both', paddingTop: '2em'})
const matchDividerStyle = css({width: '100px', marginBottom: '2em'})
const eventStyle = css({clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop:'1em'})
const footerStyle = css({width: '100%', marginTop: '2em', textAlign: 'center'})
const matchFilters = css({textAlign: 'center', marginTop:'1em'})
const left = css({
  float: 'left',
  textAlign: 'right',
  width: 80 * 5 + 'px',
  [mobile]: {
    width: '100%'
  }
})
const right = css({
  float: 'right',
  textAlign: 'left',
  width: 80 * 5 + 'px',
  [mobile]: {
    width: '100%'
  }
})
const flag = css({height: '1em', paddingTop: '5px', margin: '0px 0.5em 0px 0.5em', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))'})
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
const link = css({color: 'blue', textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'})