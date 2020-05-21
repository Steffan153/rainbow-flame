import { ConnectionManager } from "typeorm";
import { dbName } from "../Config";

import { Warn } from "../models/Warn";
import { Giveaway } from "../models/Giveaway";

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
  name: dbName,
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Warn, Giveaway],
});
export default connectionManager;
