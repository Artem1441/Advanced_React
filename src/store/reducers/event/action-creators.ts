import axios from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { EventActionsEnum, SetEventsAction, SetGuestsAction } from "./types";

export const EventActionCreator = {
    setGuests: (guests: IUser[]): SetGuestsAction => ({ type: EventActionsEnum.SET_GUESTS, payload: guests }),
    setEvents: (events: IEvent[]): SetEventsAction => ({ type: EventActionsEnum.SET_EVENTS, payload: events }),
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const guests = await UserService.getUsers()
            dispatch(EventActionCreator.setGuests(guests.data))
        }
        catch (err) {
            console.log(err)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]"
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreator.setEvents(json))
            localStorage.setItem("events", JSON.stringify(json))
        }
        catch (err) {
            console.log(err)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || "[]"
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(event => event.author === username || event.guest === username)
            dispatch(EventActionCreator.setEvents(currentUserEvents))
        }
        catch (err) {
            console.log(err)
        }
    },
}