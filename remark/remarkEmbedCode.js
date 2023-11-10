module.exports = function remarkEmbedCode() {
  const lastTag = [];
  return function process(tree) {
    for (let nodeIdx = 0; nodeIdx < tree.children.length; nodeIdx++) {
      const node = tree.children[nodeIdx];

      if (node.type === 'paragraph' && !!node.children) {
        const parts = parseString(node.children[0].value);
        if (parts.filter((p) => p.isTag).length > 0) {
          for (const idx in parts) {
            const part = parts[idx];
            tree.children.splice(nodeIdx++, Number(idx) === 0 ? 1 : 0, {
              type: part.isTag ? 'html' : 'paragraph',
              value: part.isTag ? getTag(part) : undefined,
              children: part.isTag ? undefined : getChild(part)
            });
          }
        }
      }
    }
  };

  function getTag(part) {
    let el = '';
    if (part.value.trim() === '::') {
      if (lastTag.length === 0) {
        return;
      }
      el = `</${lastTag.pop()}>`;
    } else {
      let tag = part.value.substring(2).trim();
      el = `<${tag}>`;
      const spaceIndex = tag.indexOf(' ');
      if (spaceIndex > 0) {
        tag = tag.substring(0, spaceIndex);
      }
      lastTag.push(tag);
    }
    return el;
  }

  function getChild(part) {
    return [
      {
        type: 'text',
        value: part.value
      }
    ];
  }

  function parseString(val) {
    const result = [];
    let isNewLine = true;
    let isTag = false;
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
              isTag,
              value: val.substring(startIdx, i)
            });
            startIdx = i;
          }
          isTag = true;
          i++;
        }
        isNewLine = false;
      }

      if (c === '\n') {
        if (isTag) {
          result.push({
            isTag,
            value: val.substring(startIdx, i + 1)
          });
          isTag = false;
          startIdx = i + 1;
        }
        isNewLine = true;
      }
    }

    // flush remaining
    if (startIdx < val.length) {
      result.push({
        isTag,
        value: val.substring(startIdx, val.length + 1)
      });
    }

    return result;
  }
};
