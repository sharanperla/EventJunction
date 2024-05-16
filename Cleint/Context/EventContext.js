import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [eventData, setEventData] = useState({});
  const [globalError, setGlobalError] = useState(null);

  const createEventStart = () => {
    setIsEventLoading(true);
  };

  const createEventSuccess = (value) => {
    setIsEventLoading(false);
    setEventData(value);
  };

  const createEventFailure = (error) => {
    console.log('err',error)
    setIsEventLoading(false);
    setGlobalError(error);
    setEventData(null);
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
        createEventFailure
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
