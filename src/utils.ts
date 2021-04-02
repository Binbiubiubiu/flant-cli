import path from "path";
import { warn } from "./log";

export const localFile = (name: string) => path.join(process.cwd(), name);

export const errorCatch = () => {
  process.on("unhandledRejection", (reason, p) => {
    warn(`${reason}`);
  });

  process.on("uncaughtException", (err: string, origin: string) => {
    warn(`${err}`);
  });
};
