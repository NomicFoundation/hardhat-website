/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', "prettier-plugin-solidity"],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
