module.exports = function remarkEmbedCodeDirective() {
  const lastTag = [];
  return function traverse(tree) {
    try {
      for (let nodeIdx = 0; nodeIdx < tree.children.length; nodeIdx++) {
        const node = tree.children[nodeIdx];
        if (node.type === 'paragraph' && !!node.children) {
          const newNodes = splitStringIntoParagraphsAndDirectives(node.children[0].value);
          if (newNodes.filter((p) => p.isDirective).length > 0) {
            for (const idx in newNodes) {
              const part = newNodes[idx];
              if (idx > 0) {
                nodeIdx++;
              }
              tree.children.splice(nodeIdx, Number(idx) === 0 ? 1 : 0, {
                type: part.isDirective ? 'html' : 'paragraph',
                value: part.isDirective ? getDirectiveFormatted(part) : undefined,
                children: part.isDirective ? undefined : getChild(part)
              });
            }
          }
        }
      }
    } catch (ex) {
      console.error(ex);
      console.error(tree);
    }
  };

  function getDirectiveFormatted(node) {
    let el = '';
    if (node.value.trim() === '::') {
      if (lastTag.length === 0) {
        return el;
      }
      el = `</${lastTag.pop()}>`;
    } else {
      let tag = node.value.substring(2).trim();
      el = `<${tag}>`;
      const spaceIndex = tag.indexOf(' ');
      if (spaceIndex > 0) {
        tag = tag.substring(0, spaceIndex);
      }
      lastTag.push(tag);
    }
    return el;
  }

  function getChild(node) {
    return [
      {
        type: 'text',
        value: node.value
      }
    ];
  }

  function splitStringIntoParagraphsAndDirectives(val) {
    const result = [];
    let isNewLine = true;
    let isDirective = false;
    let startIdx = 0;

    if (typeof val !== 'string' || val.length === 0) {
      return result;
    }

    for (let i = 0; i < val.length; i++) {
      const c = val[i];

      if (c === ':' && isNewLine) {
        // peak ahead
        if (i + 1 < val.length && val[i + 1] === ':') {
          // found tag
          // save last text, if exists
          if (i - startIdx > 0) {
            result.push({
              isTag: isDirective,
              value: val.substring(startIdx, i)
            });
            startIdx = i;
          }
          isDirective = true;
          i++;
        }
        isNewLine = false;
      }

      if (c === '\n') {
        if (isDirective) {
          result.push({
            isDirective,
            value: val.substring(startIdx, i + 1)
          });
          isDirective = false;
          startIdx = i + 1;
        }
        isNewLine = true;
      }
    }

    // flush remaining
    if (startIdx < val.length) {
      result.push({
        isDirective,
        value: val.substring(startIdx, val.length + 1)
      });
    }

    return result;
  }
};
