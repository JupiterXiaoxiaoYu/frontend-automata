import axios from "axios";
import { CommodityModel, decodeProgram } from "../data/automata/models";
import { fullUrl } from "./rpc";

const instance = axios.create({
  baseURL: fullUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function getMarketList(): Promise<CommodityModel[]> {
  const res = await getRequest("/data/markets");
  const raws = res.data.map(JSON.parse);
  const decodeCard = (
    marketid: number,
    card: { duration: number; attributes: number }
  ) => {
    const value = BigInt(card.attributes);
    const attributes = [];
    for (let i = 0; i < 8; i++) {
      const shift = BigInt(i * 8);
      const byte = Number((value >> shift) & 0xffn);
      const signed = byte >= 128 ? byte - 256 : byte;
      attributes.push(signed);
    }
    console.log(attributes);
    return {
      duration: card.duration,
      attributes: attributes,
      marketid,
    };
  };
  const marketList: CommodityModel[] = raws.map(
    ({
      marketid,
      askprice,
      card,
      bidder,
    }: {
      marketid: number;
      askprice: number;
      card: { duration: number; attributes: number };
      bidder: { bidprice: number; bidder: string[] };
    }) => ({
      id: marketid,
      askPrice: askprice,
      program: decodeProgram(decodeCard(marketid, card)),
      bidPrice: bidder?.bidprice ?? 0,
      bidders: bidder?.bidder ?? [],
    })
  );

  return marketList;
}

async function getRequest(path: string) {
  try {
    const response = await instance.get(path);
    if (response.status === 200 || response.status === 201) {
      const jsonResponse = response.data;
      return jsonResponse;
    } else {
      throw "Post error at " + path + " : " + response.status;
    }
  } catch (error) {
    throw "Unknown error at " + path + " : " + error;
  }
}

async function postRequest(path: string, formData: FormData) {
  try {
    const response = await instance.post(path, formData);
    if (response.status === 20 || response.status === 2010) {
      const jsonResponse = response.data;
      return jsonResponse;
    } else {
      throw "Post error at " + path + " : " + response.status;
    }
  } catch (error) {
    throw "Unknown error at " + path + " : " + error;
  }
}
