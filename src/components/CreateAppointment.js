import React, { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { ScheduleMeeting } from 'react-schedule-meeting';




const MyForm = () => {
  const [formData, setFormData] = useState({
    surgery_type: '',
    surgery_room: ''
  });

  const [formErrors, setFormErrors] = useState({
    surgery_type: '',
    surgery_room: ''
  });

  const handleTimeslotClicked = (startTimeEventEmit) => {
    startTimeEventEmit.resetDate();
    startTimeEventEmit.resetSelectedTimeState();
    alert(`Time selected: ${format(startTimeEventEmit.startTime, 'cccc, LLLL do h:mm a')}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error message when user selects an option
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if both options are selected
    if (formData.surgery_type && formData.surgery_room) {
      // Handle form submission logic here
      console.log('Form submitted with data:', formData);
      // Reset errors
      setFormErrors({
        surgery_type: '',
        surgery_room: ''
      });
    } else {
      // Set errors for unselected options
      setFormErrors({
        surgery_type: formData.surgery_type ? '' : 'Please select a surgery type',
        surgery_room: formData.surgery_room ? '' : 'Please select a surgery room'
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Surgery appointment page</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="surgery">Surgery type</label>
                  <select
                    className={`form-control ${formErrors.surgery_type ? 'is-invalid' : ''}`}
                    id="surgery"
                    name="surgery_type"
                    value={formData.surgery_type}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select surgery type.....</option>
                    <option value="brain">Brain surgery</option>
                    <option value="leg">Leg surgery</option>
                  </select>
                  {formErrors.surgery_type && (
                    <div className="invalid-feedback">{formErrors.surgery_type}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="room">Surgery room</label>
                  <select
                    className={`form-control ${formErrors.surgery_room ? 'is-invalid' : ''}`}
                    id="room"
                    name="surgery_room"
                    value={formData.surgery_room}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select surgery room......</option>
                    <option value="buildingC">Building C, room 01</option>
                    <option value="buildingA">Building A, room 02</option>
                  </select>
                  {formErrors.surgery_room && (
                    <div className="invalid-feedback">{formErrors.surgery_room}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="time">Surgery Time</label>
                  <ScheduleMeeting
                    onStartTimeSelect={handleTimeslotClicked}
                    lang_cancelButtonText="Cancel"
                    lang_confirmButtonText="Confirm"
                    lang_emptyListText="No times available"
                    lang_goToNextAvailableDayText="Next Available"
                    lang_noFutureTimesText="No future times available"
                    lang_selectedButtonText="Selected:"
                    format_nextFutureStartTimeAvailableFormatString="cccc, LLLL do"
                    format_selectedDateDayTitleFormatString="cccc, LLLL do"
                    format_selectedDateMonthTitleFormatString="LLLL yyyy"
                    format_startTimeFormatString="h:mm a"
                    locale={enUS}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Create appointment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
