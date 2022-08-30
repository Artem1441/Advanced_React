import { Button, DatePicker, Form, Input, Row, Select } from "antd"
import { FC, useState } from "react"
import { IUser } from "../models/IUser"
import { IEvent } from "../models/IEvent"
import { rules } from "../utils/rules"
import moment, { Moment } from "moment"
import { formatDate } from "../utils/date"
import { useTypedSelector } from "../hooks/useTypedSelector"

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: ""
    } as IEvent)

    const { user } = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) })
        }
    }

    const submitForm = () => {
        submit({ ...event, author: user.username })
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
            </Form.Item>

            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                    disabledDate={rules.disabledDate}
                />
            </Form.Item>

            <Form.Item
                label="Event guests"
                name="guests"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {
                        guests.map((guest, index) => <Select.Option value={guest.username} key={index}>{guest.username}</Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm