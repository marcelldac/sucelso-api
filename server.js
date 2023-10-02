const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

const userRouter = require("./router/user");
const healthRouter = require("./router/health");
const loginRouter = require("./router/login");
const teacherRouter = require("./router/teacher");
const gradeRouter = require("./router/grade");
const courseRouter = require("./router/course");
const coordinatorRouter = require("./router/coordinator");

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/health", healthRouter);
app.use("/teachers", teacherRouter);
app.use("/grades", gradeRouter);
app.use("/courses", courseRouter);
app.use("/coordinators", coordinatorRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

