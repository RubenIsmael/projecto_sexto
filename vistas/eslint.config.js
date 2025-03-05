/**
 * Configuración de ESLint
 * Define las reglas de linting para el proyecto
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // Ignora la carpeta dist
  { ignores: ['dist'] },
  {
    // Extiende configuraciones recomendadas
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // Archivos a los que se aplican las reglas
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // Plugins de ESLint
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // Reglas específicas
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);