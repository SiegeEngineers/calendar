import React from 'react';
import CalendarIcon from '../static/icons/CalendarIcon'
import GoogleCalendarIcon from '../static/icons/GoogleCalendarIcon'
import IosCalendarIcon from '../static/icons/IosCalendarIcon'
import {dropdown, dropdownContent, dropdownItem, dropdownSvg, calendarExporText, dropDownLink} from '../styles/common'
import Link from 'next/link'
import moment from 'moment-timezone'

const GOOGLE_CALENDAR = 'Google'
const ICALENDAR = 'ICalendar'

/**
 * Component to export matches/events to calendar.
 */
export default class CalendarExporter extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        location: React.PropTypes.string.isRequired,
        startTime: React.PropTypes.any.isRequired,
        endTime: React.PropTypes.any.isRequired
    }

    _processCalendar(type, e) {
        e.preventDefault();
        switch (type) {
            case GOOGLE_CALENDAR:
                this._redirectToGoogleCalendar();
                break;
            case ICALENDAR:
                this._downloadICSFile();
                break;
            default:
                throw new Exception('Calendar [' + type + '] not supported')
        }
    }

    _redirectToGoogleCalendar() {
        const { startTime, endTime, title, content, location } = this.props;
        const dates = moment(startTime).format('YMMDD\\THHmmss\\Z') + '/' +
                      moment(endTime).format('YMMDD\\THHmmss\\Z');
        const url = "http://www.google.com/calendar/event?action=TEMPLATE&trp=false" +
               "&text=" + encodeURIComponent(title) +
               "&dates=" + encodeURIComponent(dates) +
               "&location=" + encodeURIComponent(location) +
               "&details=" + encodeURIComponent(content) +
               "&sprop=" + encodeURIComponent(location);
       window.open(url);
    }

    _buildICSFile() {
        const SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
        const { startTime, endTime, title, content, location } = this.props;
        return [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                'UID:' + new Date().getTime(),
                'CLASS:PUBLIC',
                'DESCRIPTION:' + content,
                'DTSTART;VALUE=DATE:' + moment(startTime).format('YMMDD\\THHmmss\\Z'),
                'DTEND;VALUE=DATE:' + moment(endTime).format('YMMDD\\THHmmss\\Z'),
                'LOCATION:' + location,
                'SUMMARY;LANGUAGE=en-us:' + title,
                'TRANSP:TRANSPARENT',
                'END:VEVENT',
                'END:VCALENDAR'
            ].join(SEPARATOR);
    }

    _downloadICSFile() {
        window.open("data:text/calendar;charset=utf8;file," + escape(this._buildICSFile()));
    }

    render() {
        return (
            <div>
                <div className={dropdown}>
                    <CalendarIcon className={dropdownSvg} title={'Export to calendar'} />
                    <ul className={dropdownContent}>
                      <li className={dropdownItem}>
                        <a href="/calendar" onClick={this._processCalendar.bind(this, GOOGLE_CALENDAR)} className={dropDownLink}>
                            <GoogleCalendarIcon className={dropdownSvg} />
                            <span className={calendarExporText}>Google Calendar</span>
                        </a>
                      </li>
                      <li className={dropdownItem}>
                        <a href="/calendar" onClick={this._processCalendar.bind(this, ICALENDAR)} className={dropDownLink}>
                            <IosCalendarIcon className={dropdownSvg} />
                            <span className={calendarExporText}>ICalendar</span>
                        </a>
                      </li>
                    </ul>
                </div>
            </div>
        );
    }

}
