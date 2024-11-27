import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AccountSliceReducer } from 'zkwasm-minirollup-browser';
import endpointReducer from "../data/endpoint";
import automataReducer from "../data/automata/automata";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'acccount/deriveL2Account/fulfilled',
          'client/sendTransaction/pending',
          'client/sendTransaction/rejected',
          'client/sendTransaction/fulfilled'
        ],
        ignoredActionPaths: ['payload.web3','payload.seed', 'payload.injector'],
        ignoredPaths: [
          "acccount/fetchAccount/fulfilled",
          "account.l1Account.web3",
          "endpoint.zkWasmServiceHelper",
          "status.config.latest_server_checksum",
          "game.preMerkleRoot",
          "game.postMerkleRoot",
          "account.l2account",
          "client.external"
        ],
      },
    }),
  reducer: {
    account: AccountSliceReducer,
    endpoint: endpointReducer,
    automata: automataReducer,
  },
  devTools: {
    serialize: {
      replacer: (_key, value) => (typeof value === "bigint" ? value.toString() : value),
    },
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
