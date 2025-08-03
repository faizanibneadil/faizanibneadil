import { RelationshipField } from "payload";

export function IconField(overrides?: Partial<RelationshipField>): RelationshipField {
    return {
        type: 'relationship',
        relationTo: 'icons',
        name: 'icon',
        label: 'Icon',
        required: true,
        hasMany: false,
        ...(overrides || {}),
        admin: {
            appearance: 'drawer',
            allowCreate: false,
            allowEdit: false,
            ...(overrides?.admin || {})
        }
    } as RelationshipField;
}