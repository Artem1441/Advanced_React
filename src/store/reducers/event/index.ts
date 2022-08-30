import { EventAction, EventActionsEnum, EventState } from "./types"

const initaialState: EventState = {
    events: [],
    guests: []
}

export default function eventReducer(state = initaialState, action: EventAction): EventState {
    switch (action.type) {
        case EventActionsEnum.SET_EVENTS:
            return { ...state, events: action.payload }

        case EventActionsEnum.SET_GUESTS:
            return { ...state, guests: action.payload }

        default:
            return state
    }
}