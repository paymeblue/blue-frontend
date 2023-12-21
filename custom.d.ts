// custom.d.ts
/* eslint-disable-next-line no-unused-vars */
interface Window {
  flutter_inappwebview?: {
    callHandler: (handlerName: string, ...args: any[]) => void;
    // Add other properties if needed
  };
}
