// Type declaration to resolve ethereum type conflicts
declare global {
  interface Window {
    ethereum?: any;
  }
}

export {};
