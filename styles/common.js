import css, { merge } from 'next/css'

export const mobileBreakpoint = '(max-width: 768px)'
export const mobile = `@media ${mobileBreakpoint}`

// Styling
export const general = css({
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


export const miniFlag = css({display:'inline', width:'1em', marginBottom: '-0.1em', marginRight: '-0.2em'})
export const divider = css({fontSize: '16pt', paddingTop: '2px', textAlign: 'center', float: 'left', width: 80 * 2 + 'px'})
export const topNoteStyle = css({textAlign: 'center', fontSize: '10pt', fontStyle: 'italic'})
export const footerStyle = css({width: '100%', marginTop: '2em', textAlign: 'center'})
export const matchFilters = css({textAlign: 'center', marginTop:'1em'})

export const left = css({
    float: 'left',
    textAlign: 'right',
    width: 80 * 5 + 'px',
    [mobile]: {
        width: '100%'
    }
})

export const right = css({
    float: 'right',
    textAlign: 'left',
    width: 80 * 5 + 'px',
    [mobile]: {
        width: '100%'
    }
})

export const flag = css({height: '1em', paddingTop: '5px', margin: '0px 0.5em 0px 0.5em', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))'})
export const link = css({color: 'blue', textDecoration: 'underline', cursor: 'pointer', userSelect: 'none'})
export const matchStyle = css({clear: 'both', paddingTop: '2em'})
export const mobileMatchTimeStyle = merge([divider, css({ width: '100%' })])

