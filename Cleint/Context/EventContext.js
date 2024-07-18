import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {

  const [isEventLoading, setIsEventLoading] = useState(false);
  const [eventData, setEventData] = useState({});
  const [globalError, setGlobalError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const createEventStart = () => {
    setIsEventLoading(true);

  };

  const createEventSuccess = (value) => {
    setIsEventLoading(false);
    setEventData(value);
    setGlobalError(null)
  };

  const createEventFailure = (error) => {
    console.log('err',error)
    setIsEventLoading(false);
    setGlobalError(error);
    setEventData(null);
  };

  const editEventStart=()=>{
    setIsEventLoading(true);
    setGlobalError(null);
    setUpdateSuccess(false)
  }
  const editEventSuccess = (value) => {
    setIsEventLoading(false);
    setGlobalError(null)
    setUpdateSuccess(true)
  };

  const editEventFailure = (error) => {
    console.log('err',error)
    setIsEventLoading(false);
    setGlobalError(error);
    setUpdateSuccess(false)
  };

  return (
    <EventContext.Provider
      value={{
        isEventLoading,
        setIsEventLoading,
        eventData,
        globalError,
        createEventStart,
        createEventSuccess,
        createEventFailure,
        editEventStart,
        editEventFailure,
        editEventSuccess,
        updateSuccess,
        setUpdateSuccess
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
