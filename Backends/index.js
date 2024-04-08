const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();
const { connection } = require("./db");
const { userRouter } = require("./Controller/user.routes");
const { taskRoutes } = require("./Controller/task.routes");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/tasks", taskRoutes);



app.listen(port, async (err) => {
    if (err) {
        console.log("Something is wrong server error");
    } else {
        await connection;
        console.log("server is running at port", port);
    }
});
