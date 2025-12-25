import { hasGlimpseNode } from "@/utilities/hasGlimpseNode";
import { SerializedAutoLinkNode, SerializedLinkNode, SerializedParagraphNode } from "@payloadcms/richtext-lexical";
import { JSXConverters } from "@payloadcms/richtext-lexical/react";


export const paragraphNodeJSCConverter: () => JSXConverters<SerializedParagraphNode> = () => ({
    paragraph: ({ node, nodesToJSX }) => {
        const children = nodesToJSX({ nodes: node.children })

        if (!children?.length) {
            return <br />
        }

        if (hasGlimpseNode(node.children)) {
            return <div role='paragraph'>{children}</div>
        }

        if (node.children.at(0)?.type === 'text') {
            return <p>{children}</p>
        }

        return <div>{children}</div>
    }
})