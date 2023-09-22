import { AxiosInstance } from "axios";
import { isNil, toNumber } from "lodash";
import moment from "moment";

import { DateFormat, UNITS } from "../constants/constants";
import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "../constants/keys";
import { Login, User } from "../redux/Slices/User/User.util";

export const logout = (): void => {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, "");
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, "");
  localStorage.setItem("expiresIn", "");
};

export const isLoggedIn = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const expiresIn = localStorage.getItem("expiresIn");

  if (!token || isNil(token) || token === "") {
    logout();
    return false;
  }

  if (expiresIn) {
    const expiresInDate = moment.unix(Number(expiresIn));

    if (!expiresInDate.isValid()) {
      logout();
      return false;
    }

    const duration = expiresInDate.diff(moment());

    if (duration < 0) {
      logout();
      return false;
    }

    return true;
  }

  logout();
  return false;
};

export const initAxios = (axiosInstance: AxiosInstance, token: any) => {
  axiosInstance.defaults.headers.common = {
    Authorization: `${
      token ? token : localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    }`,
  };
};

export const getUserData = (): User | null => {
  const temp: any = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (temp) return JSON.parse(temp);
  else return null;
};

export const saveUserData = (payload: Login) => {
  localStorage.setItem(
    LOCAL_STORAGE_USER_KEY,
    JSON.stringify({
      id: payload.id,
      full_name: payload.full_name,
      phone_number: payload.phone_number,
      role: payload.role,
      last_seen: payload.last_seen,
    })
  );

  // payload.expiresIn.toString();
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, payload.token);
  localStorage.setItem(
    "expiresIn",
    moment().add(12, "hours").unix().toString()
  );
};

export const generateRouteString = (value: string) =>
  value.toLowerCase().split(" ").join("-");

export const formatNumber = (x: string | number) => {
  if (isNil(x)) {
    return "-";
  } else {
    var val = Math.round(Number(x!) * 100) / 100;
    var parts = val.toString().split(".");
    var num =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");
    return num;
  }
};

export const InputNumberProps = () => {
  const style = { width: "100%" };

  const formatter = (value: any) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const parser = (value: any) =>
    toNumber(value ? value.replace(/\$\s?|(,*)/g, "") : "");

  return { style, formatter, parser };
};

export const SelectProps = () => {
  const style = { width: "100%" };
  const showSearch = true;
  const optionFilterProp = "children";
  const filterOption = (input: any, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return { style, showSearch, optionFilterProp, filterOption };
};

export const displayUnit = (value: string) => {
  const unit = UNITS.find((e) => e.value === value);

  if (unit) {
    return unit.name;
  } else {
    return "-";
  }
};

export const onItemChange = (
  dataAction: [any[], React.Dispatch<React.SetStateAction<any[]>>],
  key: any,
  selector: string,
  value: any
) => {
  const [data, setData] = dataAction;

  const index = data.findIndex((e) => e.key === key);

  if (index !== -1) {
    let temp = [...data];
    temp[index] = { ...temp[index], [selector]: value, updated: true };

    setData(temp);
  }
};

export const onItemRemove = (
  dataAction: [any[], React.Dispatch<React.SetStateAction<any[]>>],
  key: any
) => {
  const [data, setData] = dataAction;

  const index = data.findIndex((e) => e.key === key);

  if (index !== -1) {
    if (!isNil(data[index].id)) {
      let temp = [...data];
      temp[index].deleted = true;
      setData(temp);
    } else {
      setData(data.filter((e) => e.key !== key));
    }
  }
};

export const zeroPad = (num: any, len: number = 4): string =>
  String(num).padStart(len, "0");

export const ParseRemainingDates = (date: any) => {
  if (date) {
    const quantifier = (num: number) => (num > 1 ? "s" : "");

    const now = moment();
    const delivery_date = moment(date, DateFormat);

    const years = delivery_date.diff(now, "years");
    now.add(years, "years");

    const months = delivery_date.diff(now, "month");
    now.add(months, "months");

    const days = delivery_date.diff(now, "days");

    let strings: string[] = [];

    if (years < 0 || months < 0 || days < 0) {
      strings.push("Deadline passed by");
    } else {
      strings.push("In");
    }

    if (years !== 0)
      strings.push(`${Math.abs(years)} Year${quantifier(Math.abs(years))}`);
    if (months !== 0)
      strings.push(`${Math.abs(months)} Month${quantifier(Math.abs(months))}`);
    if (days !== 0)
      strings.push(`${Math.abs(days)} Day${quantifier(Math.abs(days))}`);

    return strings.join(" ");
  } else {
    return "";
  }
};
