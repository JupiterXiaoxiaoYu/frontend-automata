import axios from "axios";
import { CommodityModel, decodeProgram } from "../data/automata/models";

// Get the current URL components
const currentLocation = window.location;
const protocol = currentLocation.protocol; // e.g., 'http:' or 'https:'
const hostname = currentLocation.hostname; // e.g., 'sinka' or 'localhost'

const instance = axios.create({
  baseURL: `${protocol}//${hostname}` + ":3000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function getMarketList(): Promise<CommodityModel[]> {
  const res = await getRequest("/data/markets");
  const raws = res.data.map(JSON.parse);
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
      program: decodeProgram(card),
      bidPrice: bidder.bidprice,
      bidders: bidder.bidder,
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
