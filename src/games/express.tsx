import axios from "axios";
import {
  Bid,
  decodeProgram,
  MarketTabData,
  ProgramModel,
} from "../data/automata/models";
import { fullUrl } from "./request";

const instance = axios.create({
  baseURL: fullUrl,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

function getProgramList(raws: any): ProgramModel[] {
  const decodeCard = (
    marketid: number,
    object: { duration: number; attributes: number }
  ) => {
    const value = BigInt(object.attributes);
    const attributes = [];
    for (let i = 0; i < 8; i++) {
      const shift = BigInt(i * 8);
      const byte = Number((value >> shift) & 0xffn);
      const signed = byte >= 128 ? byte - 256 : byte;
      attributes.push(signed);
    }
    console.log(attributes);
    return {
      duration: object.duration,
      attributes: attributes,
      marketid,
    };
  };
  const programList: ProgramModel[] = raws.map(
    ({
      marketid,
      askprice,
      sysprice,
      object,
      owner,
      bidder,
    }: {
      marketid: number;
      askprice: number;
      sysprice: number;
      object: { duration: number; attributes: number };
      owner: number[];
      bidder: Bid;
    }) =>
      decodeProgram(
        decodeCard(Number(marketid), object),
        0,
        Number(askprice ?? 0),
        Number(sysprice ?? 0),
        owner,
        bidder
      )
  );

  return programList;
}

export const getSellingAsync = async (
  skip: number,
  limit: number,
  pid1: string,
  pid2: string
): Promise<MarketTabData> => {
  const res = await getRequest(
    `/data/sell/${pid1}/${pid2}?skip=${skip}&limit=${limit}`
  );
  const raws = res.data;
  console.log("getSelling", raws);
  return { programs: getProgramList(raws), programCount: res.count };
};

export const getAuctionAsync = async (
  skip: number,
  limit: number
): Promise<MarketTabData> => {
  const res = await getRequest(`/data/markets?skip=${skip}&limit=${limit}`);
  const raws = res.data;
  console.log("getAuction", res, skip, limit);
  return { programs: getProgramList(raws), programCount: res.count };
};

export const getLotAsync = async (
  skip: number,
  limit: number,
  pid1: string,
  pid2: string
): Promise<MarketTabData> => {
  const res = await getRequest(
    `/data/bid/${pid1}/${pid2}?skip=${skip}&limit=${limit}`
  );
  const raws = res.data;
  console.log("getLot", raws);
  return { programs: getProgramList(raws), programCount: res.count };
};

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
