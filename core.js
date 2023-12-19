import createDatabaseConnection from "./database/index.js";
import createWebServer from "./webserver/index.js";

function createCore() {
  const database = createDatabaseConnection();
  const webserver = createWebServer();

  function start() {
    console.log("[core] starting...");
    database.start();
    webserver.start();
    console.log("[core] system is running");
  }
  function stop() {
    console.log("[core] stopping...");
    webserver.stop();
    database.stop();
    console.log("[core] system is down");
  }

  return { start, stop };
}

export default createCore;
