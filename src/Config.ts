import dotenv from "dotenv";
import { join, dirname } from "path";
dotenv.config({ path: join(dirname(require.main.filename), "../.env") });

export let token: string = process.env.DISCORD_TOKEN;
export let prefix: string = process.env.PREFIX;
export let owners: string[] = ["502446928303226890", "511518299201470465"];
interface Colors {
  info: string;
  error: string;
  success: string;
}
export let colors: Colors = {
  info: "#92DFF3",
  error: "#FF9AA2",
  success: "#B5EAD7",
};
