export function hasGlimpseNode(nodes: any[]): boolean {
    return nodes.some((node) => {
        if (node.type === 'link' && node.fields?.linkStyle === 'GlimpseStyle') {
            return true;
        }
        if (node.children && Array.isArray(node.children) && node.children?.length) {
            return hasGlimpseNode(node.children);
        }
        return false;
    });
};