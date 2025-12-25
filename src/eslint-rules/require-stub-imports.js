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
      unneeded: 'Component "{{name}}" is not imported in real @Component',
    },
    schema: [],
  },
  create(context) {
    const ignoreImports = ['CommonModule', 'FormsModule'];
    const filename = context.filename;
    if (!filename.endsWith('.spec.ts')) return {};

    const testedFile = filename.replace('.spec.ts', '.ts');
    let componentImports = new Set();

    // Get all imports from .ts file.
    try {
      const content = fs.readFileSync(testedFile, 'utf-8');
      const ast = parse(content, { loc: true, range: true });

      function findDecorator(node) {
        if (
          node.type === 'Decorator' &&
          node.expression.callee?.name === 'Component'
        ) {
          const arg = node.expression.arguments[0];
          if (arg?.type === 'ObjectExpression') {
            const importsProp = arg.properties.find(
              (p) => p.key?.name === 'imports'
            );
            if (importsProp?.value.type === 'ArrayExpression') {
              importsProp.value.elements.forEach((el) => {
                if (el?.type === 'Identifier') {
                  componentImports.add(el.name);
                }
              });
            }
          }
        }
        Object.values(node).forEach((val) => {
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
        if (
          node.callee?.property?.name === 'overrideComponent' &&
          node.arguments.length >= 2
        ) {
          const config = node.arguments[1];
          if (config.type !== 'ObjectExpression') return;

          const setProp = config.properties.find((p) => p.key?.name === 'set');
          if (!setProp || setProp.value.type !== 'ObjectExpression') return;

          const importsProp = setProp.value.properties.find(
            (p) => p.key?.name === 'imports'
          );
          if (!importsProp || importsProp.value.type !== 'ArrayExpression')
            return;

          const stubbed = importsProp.value.elements
            .filter((e) => e?.type === 'Identifier')
            .map((e) => e.name);
          for (const stub of stubbed) {
            const name = stub.replace(/^Stub/, '');
            if (!ignoreImports.includes(name) && !componentImports.has(name)) {
              context.report({
                node: importsProp.value,
                messageId: 'unneeded',
                data: { name },
              });
            }
          }

          for (const name of componentImports) {
            if (!ignoreImports.includes(name)) {
              const stub = `Stub${name}`;
              if (!stubbed.includes(stub)) {
                context.report({
                  node: importsProp.value,
                  messageId: 'unstubbed',
                  data: { name },
                });
              }
            }
          }

          for (const name of ignoreImports) {
            const inStubbed = stubbed.includes(name);
            const inImports = componentImports.has(name);
            if (inStubbed !== inImports) {
              if (inStubbed) {
                context.report({
                  node: importsProp.value,
                  messageId: 'unneeded',
                  data: { name },
                });
              } else {
                context.report({
                  node: importsProp.value,
                  messageId: 'unstubbed',
                  data: { name },
                });
              }
            }
          }
        }

        if (
          node.callee?.property?.name === 'configureTestingModule' &&
          node.arguments.length >= 1
        ) {
          const sourceCode = context.sourceCode;
          const tokens = sourceCode.getTokens(node.parent);
          const hasOverride = tokens.some(
            (token) =>
              token.type === 'Identifier' && token.value === 'overrideComponent'
          );

          if (!hasOverride) {
            componentImports.forEach((name) => {
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
