import { servie } from "./user";
export const eventDynamic = () => {
  return servie("/event?pagesize=20");
};
