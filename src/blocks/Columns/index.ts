import { Block } from "payload";
export const ColumnsBlock: Block = {
    slug: 'columns-block',
    interfaceName: 'IColumnsBlockPropsType',
    fields: [
        {
            type: 'array',
            name: 'columns',
            fields: [
                {
                    type: 'blocks',
                    name: 'blocks',
                    blocks: [],
                    blockReferences: [
                        'achievement',
                        'blogs-block',
                        'certification',
                        'code-block',
                        'contact',
                        'education',
                        'experience',
                        'formBlock',
                        'github-contributions',
                        'hackathon',
                        'license',
                        'project',
                        'publication',
                        'research',
                        'skill'
                    ]
                }
            ],
            maxRows: 3,
            minRows: 1
        }
    ]
}