// Type declaration to resolve ethereum type conflicts
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
