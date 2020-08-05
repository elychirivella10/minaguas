import React, { useEffect } from 'react';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min';
import "bulma-calendar/dist/css/bulma-calendar.min.css"

function Calendar({ label, guardarStateRegistro, stateRegistro }) {
  useEffect(() => {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {});

    // Loop on each calendar initialized
    calendars.forEach((calendar) => {
      // Add listener to date:selected event
      calendar.on('date:selected', (date) => {
        
      });
    });

    // To access to bulmaCalendar instance of an element
    // eslint-disable-next-line no-undef
    const element = document.querySelector('#calendar');
    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', (datepicker) => {
          const data = datepicker.data.value().split([" - "]);
          console.log(data)
          guardarStateRegistro({...stateRegistro,["tiempo_estimado_inicio"]:data[0] ,["tiempo_estimado_final"]:data[1]})
          
      });
    }
  }, []);

  return (
    <div className="field">
      <label className="label">{label}</label>
        <div className="control">
            <input id="calendar" data-display-mode="dialog" type="date"  data-is-range="true" data-date-format="YYYY-MM-DD"/>
        </div>
    </div>
  );
}


export default Calendar;