import { useDevmode } from "@ibrahimstudio/react";
import CryptoJS from "crypto-js";

const useCRYpt = () => {
  const { log } = useDevmode();

  const enCRYpt = (key, obj) => {
    const crydata = CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString();
    log(`the data with key ${key} said: "you made me cry!"`);
    return crydata;
  };

  const deCRYpt = (key, crydata) => {
    const bytes = CryptoJS.AES.decrypt(crydata, key);
    const nocrydata = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    log(`the data with key ${key} is not crying anymore.`);
    return nocrydata;
  };

  return { enCRYpt, deCRYpt };
};

export default useCRYpt;
