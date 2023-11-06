const colorText = '#000001';
const colorString = '#000002';
const colorBoolean = '#000003';
const colorPunctuation = '#000004';
const colorNumber = '#000005';
const colorFunction = '#000006';
const colorAttribute = '#000007';
const colorType = '#000008';
const colorProperty = '#000009';
const colorComment = '#000008a';

const coreyTheme = {
  name: 'corey-theme',
  type: 'css',
  semanticHighlighting: true,
  settings: [
    // default
    { settings: { background: 'var(--color-highlight-background)', foreground: colorText } },
    { name: 'String', scope: 'string', settings: { foreground: colorString } },
    { name: 'Punctuation', scope: 'punctuation, constant.other.symbol', settings: { foreground: colorPunctuation } },
    {
      name: 'String Escape',
      scope: 'constant.character.escape, text.html constant.character.entity.named',
      settings: { foreground: colorText }
    },
    { name: 'Boolean', scope: 'constant.language.boolean', settings: { foreground: colorBoolean } },
    { name: 'Number', scope: 'constant.numeric', settings: { foreground: colorNumber } },
    {
      name: 'Variable',
      scope:
        'variable, variable.parameter, support.variable, variable.language, support.constant, meta.definition.variable entity.name.function, meta.function-call.arguments',
      settings: { foreground: colorText }
    },
    { name: 'Other Keyword', scope: 'keyword.other', settings: { foreground: colorNumber } },
    {
      name: 'Keyword',
      scope: 'keyword, modifier, variable.language.this, support.type.object, constant.language',
      settings: { foreground: colorPunctuation }
    },
    { name: 'Function call', scope: 'entity.name.function, support.function', settings: { foreground: colorFunction } },
    {
      name: 'Storage',
      scope: 'storage.type, storage.modifier, storage.control',
      settings: { foreground: colorAttribute }
    },
    {
      name: 'Modules',
      scope: 'support.module, support.node',
      settings: { foreground: colorProperty, fontStyle: 'italic' }
    },
    { name: 'Type', scope: 'support.type, constant.other.key', settings: { foreground: colorType } },
    {
      name: 'Type',
      scope: 'entity.name.type, entity.other.inherited-class, entity.other',
      settings: { foreground: colorType }
    },
    { name: 'Comment', scope: 'comment', settings: { foreground: colorComment, fontStyle: 'italic' } },
    {
      name: 'Comment',
      scope: 'comment punctuation.definition.comment, string.quoted.docstring',
      settings: { foreground: colorComment, fontStyle: 'italic' }
    },
    { name: 'Punctuation', scope: 'punctuation', settings: { foreground: colorPunctuation } },
    {
      name: 'Class',
      scope: 'entity.name, entity.name.type.class, support.type, support.class, meta.use',
      settings: { foreground: colorType }
    },
    {
      name: 'Class variable',
      scope: 'variable.object.property, meta.field.declaration entity.name.function',
      settings: { foreground: colorProperty }
    },
    {
      name: 'Class method',
      scope: 'meta.definition.method entity.name.function',
      settings: { foreground: colorProperty }
    },
    {
      name: 'Function definition',
      scope: 'meta.function entity.name.function',
      settings: { foreground: colorFunction }
    },
    {
      name: 'Template expression',
      scope:
        'template.expression.begin, template.expression.end, punctuation.definition.template-expression.begin, punctuation.definition.template-expression.end',
      settings: { foreground: colorPunctuation }
    },
    {
      name: 'Reset embedded/template expression colors',
      scope: 'meta.embedded, source.groovy.embedded, meta.template.expression',
      settings: { foreground: colorText }
    },
    { name: 'YAML key', scope: 'entity.name.tag.yaml', settings: { foreground: colorProperty } },
    {
      name: 'JSON key',
      scope: 'meta.object-literal.key, meta.object-literal.key string, support.type.property-name.json',
      settings: { foreground: colorProperty }
    },
    { name: 'JSON constant', scope: 'constant.language.json', settings: { foreground: colorPunctuation } },
    { name: 'CSS class', scope: 'entity.other.attribute-name.class', settings: { foreground: colorType } },
    { name: 'CSS ID', scope: 'entity.other.attribute-name.id', settings: { foreground: colorNumber } },
    { name: 'CSS tag', scope: 'source.css entity.name.tag', settings: { foreground: colorType } },
    { name: 'CSS properties', scope: 'support.type.property-name.css', settings: { foreground: colorProperty } },
    {
      name: 'HTML tag outer',
      scope: 'meta.tag, punctuation.definition.tag',
      settings: { foreground: colorPunctuation }
    },
    { name: 'HTML tag inner', scope: 'entity.name.tag', settings: { foreground: colorProperty } },
    { name: 'HTML tag attribute', scope: 'entity.other.attribute-name', settings: { foreground: colorAttribute } },
    { name: 'HTML entities', scope: 'punctuation.definition.entity.html', settings: { foreground: colorText } },
    { name: 'Markdown heading', scope: 'markup.heading', settings: { foreground: colorPunctuation } },
    {
      name: 'Markdown link text',
      scope: 'text.html.markdown meta.link.inline, meta.link.reference',
      settings: { foreground: colorProperty }
    },
    {
      name: 'Markdown list item',
      scope: 'text.html.markdown beginning.punctuation.definition.list',
      settings: { foreground: colorPunctuation }
    },
    { name: 'Markdown italic', scope: 'markup.italic', settings: { foreground: colorProperty, fontStyle: 'italic' } },
    { name: 'Markdown bold', scope: 'markup.bold', settings: { foreground: colorProperty, fontStyle: 'bold' } },
    {
      name: 'Markdown bold italic',
      scope: 'markup.bold markup.italic, markup.italic markup.bold',
      settings: { foreground: colorProperty, fontStyle: 'italic bold' }
    },
    {
      name: 'Markdown code block',
      scope: 'markup.fenced_code.block.markdown punctuation.definition.markdown',
      settings: { foreground: colorString }
    },
    { name: 'Markdown inline code', scope: 'markup.inline.raw.string.markdown', settings: { foreground: colorString } },
    { name: 'INI property name', scope: 'keyword.other.definition.ini', settings: { foreground: colorProperty } },
    {
      name: 'INI section title',
      scope: 'entity.name.section.group-title.ini',
      settings: { foreground: colorPunctuation }
    },
    { name: 'C# class', scope: 'source.cs meta.class.identifier storage.type', settings: { foreground: colorType } },
    {
      name: 'C# class method',
      scope: 'source.cs meta.method.identifier entity.name.function',
      settings: { foreground: colorProperty }
    },
    {
      name: 'C# function call',
      scope: 'source.cs meta.method-call meta.method, source.cs entity.name.function',
      settings: { foreground: colorFunction }
    },
    { name: 'C# type', scope: 'source.cs storage.type', settings: { foreground: colorType } },
    { name: 'C# return type', scope: 'source.cs meta.method.return-type', settings: { foreground: colorType } },
    { name: 'C# preprocessor', scope: 'source.cs meta.preprocessor', settings: { foreground: colorComment } },
    { name: 'C# namespace', scope: 'source.cs entity.name.type.namespace', settings: { foreground: colorText } },
    { name: 'JSX Text', scope: 'meta.jsx.children, SXNested', settings: { foreground: colorText } },
    { name: 'JSX Components name', scope: 'support.class.component', settings: { foreground: colorType } },
    {
      name: 'C-related Block Level Variables',
      scope: 'source.cpp meta.block variable.other',
      settings: { foreground: colorText }
    },
    {
      name: 'Member Access Meta',
      scope: 'source.python meta.member.access.python',
      settings: { foreground: colorProperty }
    },
    {
      name: 'Function Call',
      scope: 'source.python meta.function-call.python, meta.function-call.arguments',
      settings: { foreground: colorFunction }
    },
    { name: 'Blocks', scope: 'meta.block', settings: { foreground: colorProperty } },
    { name: 'Function Call', scope: 'entity.name.function.call', settings: { foreground: colorFunction } },
    {
      name: 'Namespaces',
      scope: 'source.php support.other.namespace, source.php meta.use support.class',
      settings: { foreground: colorText }
    },
    {
      name: 'Constant keywords',
      scope: 'constant.keyword',
      settings: { foreground: colorPunctuation, fontStyle: 'italic' }
    },
    { name: 'Entity name', scope: 'entity.name.function', settings: { foreground: colorFunction } },
    { name: 'Markup Deleted', scope: ['markup.deleted'], settings: { foreground: colorProperty } },
    { name: 'Markup Inserted', scope: ['markup.inserted'], settings: { foreground: colorString } },
    { name: 'Markup Underline', scope: ['markup.underline'], settings: { fontStyle: 'underline' } },
    {
      name: 'Keyword Control',
      scope: ['keyword.control'],
      settings: { foreground: colorPunctuation, fontStyle: 'italic' }
    },
    { name: 'Parameter', scope: ['variable.parameter'], settings: { fontStyle: 'italic' } },
    {
      name: 'Python - Self Parameter',
      scope: ['variable.parameter.function.language.special.self.python'],
      settings: { foreground: colorProperty, fontStyle: 'italic' }
    },
    {
      name: 'Python - Format Placeholder',
      scope: ['constant.character.format.placeholder.other.python'],
      settings: { foreground: colorNumber }
    },
    {
      name: 'Markdown - Blockquote',
      scope: ['markup.quote'],
      settings: { fontStyle: 'italic', foreground: colorPunctuation }
    },
    { name: 'Markdown - Fenced Language', scope: ['markup.fenced_code.block'], settings: { foreground: colorText } },
    {
      name: 'Markdown - Blockquote Punctuation',
      scope: ['punctuation.definition.quote'],
      settings: { foreground: colorBoolean }
    },
    {
      name: 'JSON Key - Level 0',
      scope: ['meta.structure.dictionary.json support.type.property-name.json'],
      settings: { foreground: colorAttribute }
    },
    {
      name: 'JSON Key - Level 1',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorType }
    },
    {
      name: 'JSON Key - Level 2',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorNumber }
    },
    {
      name: 'JSON Key - Level 3',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorProperty }
    },
    {
      name: 'JSON Key - Level 4',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorPunctuation }
    },
    {
      name: 'JSON Key - Level 5',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorFunction }
    },
    {
      name: 'JSON Key - Level 6',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorBoolean }
    },
    {
      name: 'JSON Key - Level 7',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorAttribute }
    },
    {
      name: 'JSON Key - Level 8',
      scope: [
        'meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'
      ],
      settings: { foreground: colorString }
    }
  ]
};

export { coreyTheme as default };
