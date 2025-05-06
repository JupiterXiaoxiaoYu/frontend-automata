import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  ZKWasmAppRpc,
  LeHexBN,
  createCommand,
  createWithdrawCommand,
} from "zkwasm-minirollup-rpc";
import BN from "bn.js";

// Get the current URL components
const currentLocation = window.location;
const protocol = currentLocation.protocol; // e.g., 'http:' or 'https:'
const hostname = currentLocation.hostname; // e.g., 'sinka' or 'localhost'

export const fullUrl = `${protocol}//${hostname}` + ":3000";
const rpc = new ZKWasmAppRpc(fullUrl);

export async function queryConfig() {
  try {
    const state = await rpc.queryConfig();
    return state;
  } catch (error) {
    throw "QueryStateError " + error;
  }
}

export async function send_transaction(cmd: BigUint64Array, prikey: string) {
  try {
    const state = await rpc.sendTransaction(cmd, prikey);
    return state;
  } catch (error) {
    throw "SendTransactionError " + error;
  }
}

export async function query_state(prikey: string) {
  try {
    const state = await rpc.queryState(prikey);
    return state;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 500) {
        throw "QueryStateError";
      } else {
        throw "UnknownError";
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw "No response was received from the server, please check your network connection.";
    } else {
      throw "UnknownError";
    }
  }
}

function encode_modifier(modifiers: Array<bigint>) {
  let c = 0n;
  for (const m of modifiers) {
    c = (c << 8n) + m;
  }
  return c;
}

const CMD_INSTALL_PLAYER = 1n;
const CMD_INSTALL_OBJECT = 2n;
const CMD_RESTART_OBJECT = 3n;
const CMD_UPGRADE_OBJECT = 4n;
const CMD_INSTALL_CARD = 5n;
const CMD_WITHDRAW = 6n;
const CMD_DEPOSIT = 7n;
const CMD_BOUNTY = 8n;
const CMD_COLLECT_ENERGY = 9n;
const CMD_LIST_CARD = 10n;
const CMD_BID_CARD = 11n;
const CMD_SELL_CARD = 12n;

export function getInstallProgramTransactionCommandArray(
  nonce: bigint,
  programIndexes: number[],
  selectingCreatureIndex: number,
  isCreating: boolean
): BigUint64Array {
  const mslice = programIndexes.slice();
  const index = mslice.reverse().map((id) => {
    return BigInt(id);
  });
  const modifiers: bigint = encode_modifier(index);
  const objIndex = BigInt(selectingCreatureIndex);
  const command = createCommand(
    nonce,
    isCreating ? CMD_INSTALL_OBJECT : CMD_RESTART_OBJECT,
    [objIndex, modifiers]
  );
  return command;
}

export function getInsPlayerTransactionCommandArray(nonce: bigint) {
  const command = createCommand(nonce, CMD_INSTALL_PLAYER, []);
  return command;
}

export function getUpgradeBotTransactionCommandArray(
  nonce: bigint,
  selectingCreatureIndex: number,
  attrIndex: bigint
): BigUint64Array {
  const objIndex = BigInt(selectingCreatureIndex);
  const command = createCommand(nonce, CMD_UPGRADE_OBJECT, [
    objIndex,
    attrIndex,
  ]);
  return command;
}

export function getNewProgramTransactionCommandArray(
  nonce: bigint
): BigUint64Array {
  const command = createCommand(nonce, CMD_INSTALL_CARD, []);
  return command;
}

export function getWithdrawTransactionCommandArray(
  nonce: bigint,
  amount: bigint,
  account: AccountSlice.L1AccountInfo
): BigUint64Array {
  const address = account!.address.slice(2);
  const command = createWithdrawCommand(
    nonce,
    CMD_WITHDRAW,
    address,
    0n,
    amount
  );
  return command;
}

export function getRedeemTransactionCommandArray(
  nonce: bigint,
  index: number
): BigUint64Array {
  const bountyIndex = BigInt(index);
  const command = createCommand(nonce, CMD_BOUNTY, [bountyIndex]);
  return command;
}

export function getCollectEnergyTransactionCommandArray(nonce: bigint) {
  const command = createCommand(nonce, CMD_COLLECT_ENERGY, []);
  return command;
}

export function getListCardTransactionCommandArray(
  nonce: bigint,
  index: number,
  askPrice: number
): BigUint64Array {
  const command = createCommand(nonce, CMD_LIST_CARD, [
    BigInt(index),
    BigInt(askPrice),
  ]);
  return command;
}

export function getBidCardTransactionCommandArray(
  nonce: bigint,
  marketId: number,
  askPrice: number
): BigUint64Array {
  const command = createCommand(nonce, CMD_BID_CARD, [
    BigInt(marketId),
    BigInt(askPrice),
  ]);
  return command;
}

export function getSellCardTransactionCommandArray(
  nonce: bigint,
  index: number
): BigUint64Array {
  const command = createCommand(nonce, CMD_SELL_CARD, [BigInt(index)]);
  return command;
}
