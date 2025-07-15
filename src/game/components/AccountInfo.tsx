import React from "react";
import "./AccountInfo.css";
import account_info from "../images/backgrounds/account_info.png";
import { useAppSelector } from "../../app/hooks";
import { useWalletContext } from "zkwasm-minirollup-browser";
import { addressAbbreviation } from "../../utils/address";

const AccountInfo = () => {
  const { l1Account, l2Account } = useWalletContext();

  return (
    <div className="account-info-container">
      <img src={account_info} className={"account-info-background"}></img>
      <p
        className={"account-info-account-text"}
      >{`Account  : ${addressAbbreviation(l1Account?.address ?? "", 12)}`}</p>
      <p className={"account-info-key-text"}>{`Player ID: ${addressAbbreviation(
        l2Account?.pubkey.toString(16) ?? "",
        12
      )}`}</p>
    </div>
  );
};

export default AccountInfo;
