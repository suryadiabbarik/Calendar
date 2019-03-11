import React from 'react'
import ReminderClass from '../../Utils/ReminderClass';
import uuidv1 from 'uuid/v1';
import { BlockPicker } from 'react-color';
import './styles.css'

const ColorPickStyles = {
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
}

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openedInput: false,
      openedEditInput: false,
      dayReminders: [],
      reminderToEdit: {},
      reminderObject: {},
      remindersPerMonth: '',
      reminderColor: '',
      reminderPlaceholder: '',
      displayColorPicker: false
    };
  }

  // componentDidUpdate = (prevProps, prevState) => {
    /**
     * Update warning that backup (download) has not been done
     */
    // if (this.props.reminders.reminder.length !== prevProps.reminders.reminder.length) {
    //   this.setState({
    //     downloadWarning: true
    //   })
    // }
  // }

  openInput = (e) => {
    e.preventDefault();
    this.setState({
      openedInput: true
    })
  }

  closeInput = (e) => {
    e.preventDefault();
    this.setState({
      openedInput: false
    })
  }

  openEditInput = (e, reminder) => {
    e.preventDefault();
    this.setState({
      openedEditInput: true,
      reminderToEdit: reminder
    })
  }

  closeEditInput = (e) => {
    e.preventDefault();
    this.setState({
      openedEditInput: false
    })
  }

  addReminder = (e) => {
    let id = uuidv1();
    return this.setState({
      reminderPlaceholder: e.target.value,
      reminderObject: new ReminderClass(id, this.props.monthData.shortName, e.target.value, this.props.day.dayIndex, this.state.reminderColor),
    })
  }

  editReminder = (e) => {
    this.state.dayReminders.find((reminder, index) => {
      if (reminder.id === this.state.reminderToEdit.id) {
        let remindersCopy = [...this.state.dayReminders];
        remindersCopy[index].text = e.target.value;
        remindersCopy[index].reminderColor = this.state.reminderColor;

        return this.setState({
          reminderObject: remindersCopy,
        })
      }
      return null;
    })
  }

  updateReminder = (e) => {
    let payload = this.state.reminderToEdit;
    let payloadCopy = Object.assign({}, payload, { reminderColor: this.state.reminderColor })
    this.props.editReminder(payloadCopy)

    this.state.dayReminders.find((reminder, index) => {
      if (reminder.id === this.state.reminderToEdit.id) {
        let remindersCopy = [...this.state.dayReminders];
        remindersCopy[index].text = this.state.reminderToEdit.text;
        remindersCopy[index].reminderColor = this.state.reminderColor;

        return this.setState({
          // reminderObject: remindersCopy,
          openedEditInput: false,
        })
      }
      return null;
    })
  }

  removeReminder = (e, reminderToRemove) => {
    e.preventDefault();
    this.state.dayReminders.find((reminder, index) => {
      if (reminder.id === reminderToRemove.id) {
        let remindersCopy = [...this.state.dayReminders];
        remindersCopy[index] = {};
        return this.setState({
          dayReminders: remindersCopy
        })
      }
      return null;
    })
  }

  saveReminder = (e) => {
    let payload = this.state.reminderObject;
    let payloadCopy = Object.assign({}, payload, { reminderColor: this.state.reminderColor })
    this.props.addReminder(payloadCopy)

    return this.setState({
      openedInput: false,
      dayReminders: [...this.state.dayReminders, payloadCopy],
      reminderPlaceholder: '',
      reminderColor: ''
    });
  }

  handleChangeComplete = (color) => {
    this.setState({
      reminderColor: color.hex
    });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  renderReminderInput = () => {
    if (this.state.openedInput) {
      return (
        <div>
          {this.state.reminderPlaceholder ?
            <p className="reminder--overflow" style={{
              color: this.state.reminderColor
            }}>{this.state.reminderPlaceholder}</p> : null}
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Enter Text</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength={30} onChange={this.addReminder} placeholder={this.state.reminderPlaceholder}></textarea>
            <button onClick={this.handleClick}>Pick Color</button>
            {this.state.displayColorPicker ? <div style={ColorPickStyles.popover}>
              <div style={ColorPickStyles.cover} onClick={this.handleClose} />
              <BlockPicker
                color={this.state.reminderColor}
                onChangeComplete={this.handleChangeComplete} />
            </div> : null}
            <button onClick={this.saveReminder}>save</button>
            <button onClick={this.closeInput}>close</button>
          </div>
        </div>
      )
    }
  }

  renderReminderEditInput = () => {
    if (this.state.openedEditInput) {
      return (
        <div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Edit Text</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" maxLength={30} onChange={this.editReminder} value={this.state.reminderToEdit.text}></textarea>
            <button onClick={this.handleClick}>Pick Color</button>
            {this.state.displayColorPicker ? <div style={ColorPickStyles.popover}>
              <div style={ColorPickStyles.cover} onClick={this.handleClose} />
              <BlockPicker
                color={this.state.reminderColor}
                onChangeComplete={this.handleChangeComplete} />
            </div> : null}
            <button onClick={this.updateReminder}>save</button>
            <button onClick={this.closeEditInput}>close</button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.state.dayReminders.map((reminder, index) => {
          if (reminder.arrayIndex === this.props.day.dayIndex) {
            return (
              <div key={index}>
                <p className="reminder--overflow" style={{
                  color: reminder.reminderColor
                }}>{reminder.text}</p>
                <a href='/' onClick={(e) => this.openEditInput(e, reminder)} className="edit">edit</a>
                <a href='/' onClick={(e) => this.removeReminder(e, reminder)} className="edit">delete</a>
                <br />
              </div>
            )
          }
          return null;
        })}

        <a href='/' onClick={this.openInput} className="reminder">add</a>
        {this.renderReminderInput()}
        {this.renderReminderEditInput()}
      </div>
    );
  }
}