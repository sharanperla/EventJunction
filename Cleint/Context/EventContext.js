import React,{createContext, useState} from "react";


export const EventContext=createContext();

export const EventProvider =({children})=>{
    const [isEventLoading,setIsEventLoading]=useState(false)
    const [eventData,setEventData]=useState({})
    const [globalError,setGlobalError]=useState(null);



    createEventStart=()=>{
        setIsEventLoading(true);
    }
    createEventSucess=(value)=>{
        setIsEventLoading(false);
        setEventData(value);   
    }
    createEventFailure=(error)=>{
        console.log('err',error)
        setIsEventLoading(false);
        setGlobalError(error)
        setEventData(null);
    }
    return (
        <EventContext.Provider value={{isEventLoading,setIsEventLoading,eventData,globalError,createEventStart,createEventSucess,createEventFailure}}>
            {children}
        </EventContext.Provider>
    )

}