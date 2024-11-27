import { AccountSlice } from "zkwasm-minirollup-browser";
import { ZKWasmAppRpc, LeHexBN } from "zkwasm-minirollup-rpc";
import BN from "bn.js"

const rpc = new ZKWasmAppRpc("http://localhost:3000");

export async function send_transaction(cmd: Array<bigint>, prikey: string) {
  try {
    const state = await rpc.sendTransaction(new BigUint64Array(cmd), prikey);
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

export async function query_config() {
  try {
    const state = await rpc.query_config();
    return state;
  } catch (error) {
    throw "QueryStateError " + error;
  }
}

function encode_modifier(modifiers: Array<bigint>) {
  let c = 0n;
  for (const m of modifiers) {
    c = (c << 8n) + m;
  }
  return c;
}

export function createCommand(
  nonce: bigint,
  command: bigint,
  objindex: bigint
) {
  return (nonce << 16n) + (objindex << 8n) + command;
}

const CMD_INSTALL_PLAYER = 1n;
const CMD_INSTALL_OBJECT = 2n;
const CMD_RESTART_OBJECT = 3n;
const CMD_UPGRADE_OBJECT = 4n;
const CMD_INSTALL_CARD = 5n;
const CMD_WITHDRAW = 6n;
const CMD_DEPOSIT = 7n;
const CMD_BOUNTY = 8n;

export function getInstallProgramTransactionCommandArray(
  nonce: bigint,
  programIndexes: number[],
  selectingCreatureIndex: number,
  isCreating: boolean
) {
  const mslice = programIndexes.slice();
  const index = mslice.reverse().map((id) => {
    return BigInt(id);
  });
  const modifiers: bigint = encode_modifier(index);
  const objIndex = BigInt(selectingCreatureIndex);
  const command = createCommand(
    nonce,
    isCreating ? CMD_INSTALL_OBJECT : CMD_RESTART_OBJECT,
    objIndex
  );
  return [command, modifiers, 0n, 0n];
}

export function getInsPlayerTransactionCommandArray(nonce: bigint) {
  const command = createCommand(nonce, CMD_INSTALL_PLAYER, 0n);
  return [command, 0n, 0n, 0n];
}

export function getUpgradeBotTransactionCommandArray(
  nonce: bigint,
  selectingCreatureIndex: number,
  attrIndex: bigint
) {
  const objIndex = BigInt(selectingCreatureIndex);
  const command = createCommand(nonce, CMD_UPGRADE_OBJECT, objIndex);
  return [command, attrIndex, 0n, 0n];
}

export function getNewProgramTransactionCommandArray(nonce: bigint) {
  const command = createCommand(nonce, CMD_INSTALL_CARD, 0n);
  return [command, 0n, 0n, 0n];
}

function bytesToHex(bytes: Array<number>): string  {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function getWithdrawTransactionCommandArray(
  nonce: bigint,
  amount: bigint,
  account: AccountSlice.L1AccountInfo
) {

  const address = account!.address.slice(2);
  const addressBN = new BN(address, 16);
  const addressBE = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8
  console.log("address is", address);
  console.log("address big endian is", addressBE);
  const firstLimb = BigInt('0x' + bytesToHex(addressBE.slice(0,4).reverse()));
  const sndLimb = BigInt('0x' + bytesToHex(addressBE.slice(4,12).reverse()));
  const thirdLimb = BigInt('0x' + bytesToHex(addressBE.slice(12, 20).reverse()));

  const command = createCommand(nonce, CMD_WITHDRAW, 0n);
  return [command, (firstLimb << 32n) + amount, sndLimb, thirdLimb];
}

export function getRedeemTransactionCommandArray(nonce: bigint, index: number) {
  const objIndex = BigInt(index);
  const command = createCommand(nonce, CMD_BOUNTY, 0n);
  return [command, objIndex, 0n, 0n];
}
