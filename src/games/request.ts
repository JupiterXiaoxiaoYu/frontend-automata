import { queryConfig, query_state, send_transaction } from './rpc';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const SERVER_TICK_TO_SECOND = 5;

interface GetConfigRes {
    redeemCostBase: number;
    redeemRewardBase: number;
}

interface SendTransactionRes {
    success: boolean;
    jobid: any;
}

interface SendTransactionParams {
    cmd: BigUint64Array;
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
    level: number;
    exp: number;
    energy: number;
    lastRedeemEnergy: number;
    interest: number;
    bountyPool: number;
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
            const res: any = await queryConfig();
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
        async (params: {cmd: BigUint64Array, prikey: string }, { rejectWithValue }) => {
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
                const serverTick = datas.state.counter;
                const serverTickBn = BigInt(serverTick);
                const { level, exp, energy, cost_info, current_cost: currentCost, objects, local, cards, last_interest_stamp: interestInfo, redeem_info: redeemInfo, last_check_point: lastRedeemEnergy, bounty_pool: bountyPool } = datas.player.data;
                const balance = BigInt(interestInfo) >> 32n;
                const lastInterestStamp = BigInt(interestInfo) & 0xFFFFFFFFn;
                const delta = serverTickBn - lastInterestStamp;
                const interest = Number(BigInt(level) * balance * delta / (10000n * 17280n));
                return {
                    nonce,
                    player: local,
                    creatures: objects,
                    cards,
                    globalTimer: serverTick * SERVER_TICK_TO_SECOND,
                    currentCost,
                    redeemInfo,
                    level,
                    exp,
                    energy,
                    lastRedeemEnergy,
                    interest,
                    bountyPool,
                };

            } catch (err: any) {
                return rejectWithValue(err);
            }
        }
);
