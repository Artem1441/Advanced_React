import moment, { Moment } from "moment";

export const rules = {
    required: (message: string = "required") => ({
        required: true, message
    }),
    disabledDate: (current: Moment) => {
        return current && current < moment().endOf('day');
    }
}