import { Calendar } from "antd"
import { Moment } from "moment"
import { FC } from "react"
import { IEvent } from "../models/IEvent"
import { formatDate } from "../utils/date"

interface IEventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<IEventCalendarProps> = ({ events }) => {

    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = events.filter(event => event.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map((event, index) => <div key={index}>{event.description}</div>)}
            </div>
        );
    };

    return (
        <>
            <Calendar dateCellRender={dateCellRender} />
        </>
    )
}

export default EventCalendar