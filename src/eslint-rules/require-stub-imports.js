import fs from 'fs';
import { parse } from '@typescript-eslint/typescript-estree';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce that all component imports are stubbed in tests',
    },
    messages: {
      unstubbed: 'Component "{{name}}" from @Component imports must be stubbed',
    },
    schema: [],
  },
  create(context) {
    const ignoreImports = ["CommonModule", "FormsModule"];
    const filename = context.filename;
    if (!filename.endsWith('.spec.ts')) return {};

    const testedFile = filename.replace('.spec.ts', '.ts');
    let componentImports = new Set();

    // Get all imports from .ts file.
    try {
      const content = fs.readFileSync(testedFile, 'utf-8');
      const ast = parse(content, { loc: true, range: true });

      function findDecorator(node) {
        if (node.type === 'Decorator' && node.expression.callee?.name === 'Component') {
          const arg = node.expression.arguments[0];
          if (arg?.type === 'ObjectExpression') {
            const importsProp = arg.properties.find(p => p.key?.name === 'imports');
            if (importsProp?.value.type === 'ArrayExpression') {
              importsProp.value.elements.forEach(el => {
                if (el?.type === 'Identifier') {
                  componentImports.add(el.name);
                }
              });
            }
          }
        }
        Object.values(node).forEach(val => {
          if (val && typeof val === 'object') {
            if (Array.isArray(val)) val.forEach(findDecorator);
            else findDecorator(val);
          }
        });
      }

      findDecorator(ast);
    } catch (e) {
      return {};
    }

    return {
      CallExpression(node) {
        // Check if inside describe('Full Component Testing'
        let current = node;
        while (current) {
          if (
            current.type === 'CallExpression' &&
            current.callee?.name === 'describe' &&
            current.arguments[0]?.type === 'Literal' &&
            typeof current.arguments[0]?.value === 'string' &&
            current.arguments[0]?.value.includes('Full Component Testing')
          ) {
            return; // Skip validation
          }
          current = current.parent;
        }

        // Check that all imports from .ts file are stubbed in .spec.ts.
        if (node.callee?.property?.name === 'overrideComponent' && node.arguments.length >= 2) {
          const config = node.arguments[1];
          if (config.type !== 'ObjectExpression') return;

          const setProp = config.properties.find(p => p.key?.name === 'set');
          if (!setProp || setProp.value.type !== 'ObjectExpression') return;

          const importsProp = setProp.value.properties.find(p => p.key?.name === 'imports');
          if (!importsProp || importsProp.value.type !== 'ArrayExpression') return;

          const stubbed = new Set(
            importsProp.value.elements
              .filter(e => e?.type === 'Identifier')
              .map(e => e.name.replace(/^Stub/, ''))
          );

          componentImports.forEach(name => {
            if (ignoreImports.includes(name)) return;

            if (!stubbed.has(name)) {
              context.report({
                node: importsProp.value,
                messageId: 'unstubbed',
                data: { name },
              });
            }
          });
        }

        if (node.callee?.property?.name === 'configureTestingModule' && node.arguments.length >= 1) {
          const sourceCode = context.sourceCode;
          const tokens = sourceCode.getTokens(node.parent);
          const hasOverride = tokens.some(
            token => token.type === 'Identifier' && token.value === 'overrideComponent'
          );

          if (!hasOverride) {
            componentImports.forEach(name => {
              if (ignoreImports.includes(name)) return;

              context.report({
                node,
                messageId: 'unstubbed',
                data: { name },
              });
            });
          }
        }
      },
    };
  },
};