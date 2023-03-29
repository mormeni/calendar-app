import React, { useState, useContext, useEffect, useRef } from 'react';
import { RiDeleteBinLine, RiNotification2Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { AppContext } from './../App';
import DeleteEvent from './DeleteEvent';
import EditEvent from './EditEvent';
import ShowEventPopUp from './ShowEventPopUp';
function EventCard() {
  const { holidayList, deleteEventPopUp, setDeleteEventPopUp } =
    useContext(AppContext);

  const [currentEventID, setCurrentEventID] = useState(0);

  //Calls an event delete pop up and assigns its id to a state
  const deleteEventMethod = (id) => {
    setDeleteEventPopUp(!deleteEventPopUp);
    setCurrentEventID(id);
  };

  //state that determines the view state of an event details
  const currentEventRef = useRef();
  const [clickedEvent, setClickedEvent] = useState(false);
  const clickedEventHandler = (id) => {
    setClickedEvent(!clickedEvent);
    setCurrentEventID(id);
  };

  //Edit event handler
  const [showEditEvent, setShowEditEvent] = useState(false);
  const editEventHandler = (id) => {
    setShowEditEvent(!showEditEvent);
    setCurrentEventID(id);
  };

  return (
    <div className=''>
      {holidayList.map((holiday) => {
        return (
          <div
            className='flex flex-col bg-bg-color-white mt-1.5 mx-4 md:mx-7 p-4 md:p-6 hover:bg-gray-50 hover:cursor-pointer shadow-md select-none'
            style={{ borderLeft: `8px solid ${holiday.color}` }}
            key={holiday.id}
            ref={currentEventRef}
            onClick={() => clickedEventHandler(holiday.id)}
          >
            <div className='flex justify-between mb-2'>
              <span className='flex flex-row w-auto items-center'>
                <h6 className='font-bold text-lg'>{holiday.eventTitle}</h6>
                <span className='hoverRoundedGray ml-4 '>
                  <RiNotification2Line className='text-xl hover:cursor-pointer text-primary-color' />
                </span>
              </span>
              <span className='flex flex-row w-auto items-center'>
                <span
                  className='hoverRoundedGray mr-1'
                  onClick={() => editEventHandler(holiday.id)}
                >
                  <FiEdit2 className='text-xl text-primary-color' />
                </span>
                <span
                  className='hoverRoundedGray'
                  onClick={() => deleteEventMethod(holiday.id)}
                >
                  <RiDeleteBinLine className='text-xl hover:cursor-pointer text-primary-color' />
                </span>
              </span>
            </div>
            <p className='text-sm' style={{ color: holiday.color }}>
              {holiday.allDay
                ? 'All Day'
                : `${holiday.startTime} - ${holiday.endTime}`}
            </p>
            <p className='font-bold text-sm' style={{ color: holiday.color }}>
              {holiday.description}
            </p>
          </div>
        );
      })}
      {<EditEvent theEventID={currentEventID} />}
      {clickedEvent && (
        <ShowEventPopUp
          theKey={currentEventID}
          id={currentEventID}
          theState={clickedEvent}
        ></ShowEventPopUp>
      )}
      {
        <DeleteEvent
          theEventID={currentEventID}
          trigger={deleteEventPopUp}
          theKey={currentEventID}
        ></DeleteEvent>
      }
    </div>
  );
}

export default EventCard;
