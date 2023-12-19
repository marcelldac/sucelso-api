import express from "express";
import cors from "cors";
/* import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" }; */
import userRouter from "./router/user.js";
/* import loginRouter from "./router/login.js";
import teacherRouter from "./router/teacher.js";
import gradeRouter from "./router/grade.js";
import courseRouter from "./router/course.js";
import coordinatorRouter from "./router/coordinator.js"; */

function createWebServer() {
  let server;

  function start() {
    const app = express();
    const PORT = process.env.PORT || 3333;
    app.use(cors());
    app.use(express.json());
    console.log("[webserver] mapping endpoints...");
    app.use("/users", userRouter);
    /* app.use("/login", loginRouter);
    app.use("/teachers", teacherRouter);
    app.use("/grades", gradeRouter);
    app.use("/courses", courseRouter);
    app.use("/coordinators", coordinatorRouter);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); */
    console.log("[webserver] finish map");
    server = app.listen(PORT);
    console.log(`[webserver] app running on ${PORT}`);
  }

  function stop() {
    console.log("[webserver] shutting down gracefully...");
    server.close(() => {
      console.log("[webserver] finished");
      process.exit(0);
    });
    console.log("[webserver] webserver is down");
  }

  return { start, stop };
}

export default createWebServer;
