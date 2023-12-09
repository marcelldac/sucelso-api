const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRouter = require("./router/user");
const loginRouter = require("./router/login");
const teacherRouter = require("./router/teacher");
const gradeRouter = require("./router/grade");
const courseRouter = require("./router/course");
const coordinatorRouter = require("./router/coordinator");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/teachers", teacherRouter);
app.use("/grades", gradeRouter);
app.use("/courses", courseRouter);
app.use("/coordinators", coordinatorRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
