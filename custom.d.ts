// custom.d.ts
/* eslint-disable-next-line no-unused-vars */
interface Window {
  Close: {
    postMessage: (message: string, param: string) => void;
    // Add other properties/methods if needed
  };
}
