import React from 'react'
import Reminder from '../containers/ReminderContainer';
import styled from 'styled-components'

const Cell = styled.div`
  border: black 1px solid;
`;

export default class CalendarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remindersForMonth: [],
      downloadWarning: false
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.reminders.reminder.length !== prevProps.reminders.reminder.length) {
      this.setState({
        downloadWarning: true
      })
    }
  }

  render() {
    return (
      <main className="container">
        <section className="row">          
          <article className="col-md-12">
          <div className="row">
          <div style={{textAlign:'left', paddingLeft:'0px'}} className="col-md-4">
            <br />
            <button onClick={this.props.getPrevMonthOnClick}>prev</button>
          </div>
          <div style={{textAlign:'center'}} className="col-md-4">
          <h3>Calendar</h3>
        <h5>{`${this.props.monthData.month}, ${this.props.monthData.year}`}</h5>
          </div>
          <div style={{textAlign:'right'}} className="col-md-4">
          <br />
          <button onClick={this.props.getNextMonthOnClick}>next</button>
          </div>
          </div>
            <div style={{textAlign:'center'}} className="row">
              {this.props.weekDays.map((day, index) => {
                return (
                  <Cell key={index} style={{ width: '14%' }}>
                    <div>{day}</div>
                  </Cell>
                )
              })
              }
            </div>
            <div className="row">
              {this.props.monthData.startArray.map((day, index) => {
                return (
                  <Cell key={index} style={{ width: '14%' }}>
                    <div style={{ visibility: 'hidden' }}>{day}</div>
                  </Cell>
                )
              })
              }
              {this.props.monthData.daysArray.map((day, index) => {
                return (
                  <Cell key={index} style={{ width: '14%' }}>
                    <div style={day.currentDay ? { color: "red", fontWeight:"bold" } : null}>{day.dayNumber}</div>
                    <Reminder daysArray={this.props.monthData.daysArray} dayIndex={index} day={day} remindersForMonth={this.props.remindersForMonth} />
                  </Cell>
                )
              })
              }
            </div>
          </article>
        </section>
      </main>
    )
  }
}
