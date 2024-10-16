import { query_config, send_transaction, query_state } from './rpc';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SERVER_TICK_TO_SECOND = 5;

interface GetConfigRes {
    redeemCostBase: number;
    redeemRewardBase: number;
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
    currentCost: number;
    redeemInfo: number[];
}

interface QueryStateParams {
    prikey: string;
}

export const getConfig = createAsyncThunk<
    GetConfigRes,
    Record<string, never>,
    { rejectValue: string }
    >(
        'client/getConfig',
        async () => {
            const res: any = await query_config();
            const data = JSON.parse(res.data);
            console.log("(Data-Config)", data);
            const { bounty_cost_base: redeemCostBase, bounty_reward_base: redeemRewardBase} = data;
            return {
                redeemCostBase,
                redeemRewardBase,
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
                const res: any = await send_transaction(cmd, prikey);
                console.log("(Data-Transaction)", res);
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
        async (params: {prikey: string }, { rejectWithValue }) => {
            try {
                const { prikey } = params;
                const res: any = await query_state(prikey);
                const datas = JSON.parse(res.data);
                console.log("(Data-QueryState)", datas);
                const nonce = datas.player.nonce.toString();
                const serverTick = datas.state;
                const { energy, cost_info, current_cost: currentCost, objects, local, cards, redeem_info: redeemInfo } = datas.player.data;
                return {
                    nonce,
                    player: local,
                    creatures: objects,
                    cards,
                    globalTimer: serverTick * SERVER_TICK_TO_SECOND,
                    currentCost,
                    redeemInfo,
                };

            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);
