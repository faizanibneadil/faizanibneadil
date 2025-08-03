import { TextField } from "payload";

export function TitleField(overrides?: Partial<TextField>): TextField {
    return {
        type: 'text',
        name: 'title',
        label: 'Title',
        required: true,
        ...(overrides || {})
    } as TextField
}