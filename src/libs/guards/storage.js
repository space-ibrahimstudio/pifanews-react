import { useDevmode } from "@ibrahimstudio/react";
import useCRYpt from "./cry";

const useLocStorage = () => {
  const { log } = useDevmode();
  const { enCRYpt, deCRYpt } = useCRYpt();

  const setL = (key, value) => {
    const item = { value: value, expiry: "never" };
    const cry = enCRYpt(key, item);
    localStorage.setItem(key, cry);
    log(`${key} saved to local storage.`, cry);
  };

  const getL = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      log(`item for ${key} not found.`);
      return null;
    }
    const item = deCRYpt(key, itemStr);
    if (item) {
      log(`here comes the ${key}:`, item.value);
      return item.value;
    } else {
      log(`data with key ${key} not found.`);
      return null;
    }
  };

  const rmvL = (key) => {
    localStorage.removeItem(key);
    log(`data with key ${key} has been removed manually.`);
  };

  const setLWithExp = (key, value, ttl = 3600000) => {
    const now = new Date();
    const item = { value: value, expiry: now.getTime() + ttl };
    const cry = enCRYpt(key, item);
    localStorage.setItem(key, cry);
    log(`${key} saved to local storage for ${ttl}ms.`, cry);
  };

  const getLWithExp = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      log(`item for ${key} not found.`);
      return null;
    }
    const item = deCRYpt(key, itemStr);
    const now = new Date();
    if (item) {
      if (item.expiry === "never") {
        log(`data with key ${key} has never get expired.`);
        return null;
      } else {
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          log(`data with key ${key} has been removed because its expired.`);
          return null;
        } else {
          log(`here comes the ${key}:`, item.value);
          return item.value;
        }
      }
    } else {
      log(`data with key ${key} not found.`);
      return null;
    }
  };

  return { setL, getL, rmvL, setLWithExp, getLWithExp };
};

// setWithExpiry("userSession", { username: "user1" }, 3600000);
// const sessionData = getWithExpiry("userSession");
// console.log(sessionData);

export default useLocStorage;
