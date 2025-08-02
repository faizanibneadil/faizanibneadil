import { RelationshipField } from "payload";

export function IconField(overrides?: Partial<RelationshipField>): RelationshipField {
    return {
        type: 'relationship',
        relationTo: 'icons',
        name: 'icon',
        label: 'Icon',
        required: true,
        hasMany: false,
        admin: {
            appearance: 'drawer',
            allowCreate: false,
            allowEdit: false,
        }
    }
}