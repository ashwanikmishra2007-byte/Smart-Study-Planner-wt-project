import express from "express";
import cors from "cors";
import db from "./db.js";
import createTable from "./table.js";
import trackTable from "./tracktable.js";
import router from "./subject.js";
import viewrouter from "./view.js";
import updateput from "./updateput.js";
import updateget from "./updateget.js";
import trackpost from "./trackpost.js";
import trackget from "./trackget.js";
import topicupdate from "./topicupdate.js";
import topicgr from "./track.js";
import schedule from "./schedule.js";
import deleteRoute from "./delete.js";

const app=express();
const PORT=3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(viewrouter);
app.use(updateput);
app.use(updateget);
app.use(trackpost);
app.use(topicupdate);
app.use(trackget);
app.use(topicgr);
app.use(schedule);
app.use(deleteRoute);

async function startserver () {
    try {
        await createTable();
        await trackTable();
        console.log("Table created successfully");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (err) {
        console.log("SERVER STARTUP ERROR:");
        console.log(err);
    }
}

startserver();