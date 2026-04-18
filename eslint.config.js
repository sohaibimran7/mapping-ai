import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ['dist/', 'node_modules/', '.aws-sam/', 'assets/js/', 'archive/', 'scripts/', 'src/tiptap-notes.js'],
  },
  {
    languageOptions: {
      globals: {
        // Browser globals
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        IntersectionObserver: 'readonly',
        MutationObserver: 'readonly',
        Event: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        Element: 'readonly',
        DOMRect: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        crypto: 'readonly',
        TextEncoder: 'readonly',
        confirm: 'readonly',
        AbortSignal: 'readonly',
        AbortController: 'readonly',
        // D3 loaded via CDN
        d3: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  // Lambda handlers under `api/` run on Node, not the browser. `process` +
  // `Buffer` are ambient globals there. Also: `console.log` is the standard
  // CloudWatch logging path, so we drop the `no-console` restriction.
  {
    files: ['api/**/*.ts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
)
