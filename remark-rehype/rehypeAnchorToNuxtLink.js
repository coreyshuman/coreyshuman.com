module.exports = function rehypeAnchorToNuxtLink() {
  return function traverse(tree) {
    try {
      for (let nodeIdx = 0; nodeIdx < tree.children.length; nodeIdx++) {
        const node = tree.children[nodeIdx];
        if (node.type === 'element' && ['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName) && !!node.children) {
          for (let childIdx = 0; childIdx < node.children.length; childIdx++) {
            const child = node.children[childIdx];
            if (
              child.type === 'element' &&
              child.tagName === 'a' &&
              child.properties &&
              child.properties.href &&
              child.properties.href[0] === '#'
            ) {
              child.tagName = 'nuxt-link';
              child.properties.to = child.properties.href;
            }
          }
        }
      }
    } catch (ex) {
      console.error(ex);
      console.error(tree);
    }
  };
};
