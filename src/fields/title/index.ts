import { TextField } from "payload";

export function TitleField(): TextField {
    return {
        type: 'text',
        name: 'title',
        label: 'Title',
        required: true
    }
}