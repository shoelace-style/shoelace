declare module '*.scss' {
  const styles: string;
  export default styles;
}

declare module '@popperjs/core/dist/esm' {
  export * from '@popperjs/core/lib';
}
