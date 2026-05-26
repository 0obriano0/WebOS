/** Allow importing .css files as raw strings via the Rollup raw-css plugin */
declare module '*.css' {
  const content: string;
  export default content;
}
