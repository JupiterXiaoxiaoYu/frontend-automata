import { query_config, send_transaction, query_state } from './rpc';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SERVER_TICK_TO_SECOND = 5;

interface GetConfigRes {
    objectCostExp: number;
    upgradeCostExp: number;
}

interface SendTransactionRes {
    success: boolean;
    jobid: string | undefined;
}

interface SendTransactionParams {
    cmd: Array<bigint>;
    prikey: string;
}

interface QueryStateRes {
    nonce: string;
    player: any;
    creatures: any;
    cards: any;
    globalTimer: any;
}

interface QueryStateParams {
    cmd: Array<bigint>;
    prikey: string;
}

export const getConfig = createAsyncThunk<
    GetConfigRes,
    Record<string, never>,
    { rejectValue: string }
    >(
        'client/getConfig',
        async () => {
            const res = await query_config();
            const data = JSON.parse(res.data);
            console.log("(Data-Config)", data);
            const { object_cost_exp: objectCostExp, upgrade_cost_exp: upgradeCostExp} = data;
            return {
                objectCostExp,
                upgradeCostExp,
            };
        }
)

export const sendTransaction = createAsyncThunk<
    SendTransactionRes,
    SendTransactionParams,
    { rejectValue: string }
    >(
        'client/sendTransaction',
        async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
            try {
                const { cmd, prikey } = params;
                const res = await send_transaction(cmd, prikey);
                return res;
            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);

export const queryState = createAsyncThunk<
    QueryStateRes,
    QueryStateParams,
    { rejectValue: string }
    >(
        'client/queryState',
        async (params: {cmd: Array<bigint>, prikey: string }, { rejectWithValue }) => {
            try {
                const { cmd, prikey } = params;
                const res = await query_state(cmd, prikey);
                const datas = JSON.parse(res.data);
                console.log("(Data-QueryState)", datas);
                const nonce = datas[0].nonce.toString();
                const serverTick = datas[1];
                const { energy, cost_info, current_cost, objects, local, cards } = datas[0].data;
                return {
                    nonce,
                    player: local,
                    creatures: objects,
                    cards,
                    globalTimer: serverTick * SERVER_TICK_TO_SECOND,
                };

            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);