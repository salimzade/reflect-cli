import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createHandler } from "graphql-http/lib/use/express";
import connect from "./workers/connect";
import { RootSchema } from "./graphql";

function main() {
    try {
        require("dotenv").config();
        const app = express();
        const port = process.env.PORT || 3100;

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(express.static("public"));
        app.use(morgan("dev"));

        app.use(
            cors({
                credentials: true,
                origin: "*"
            })
        );

        app.use(
            "/graphql",
            createHandler({
                schema: RootSchema,
                context: (req) => req
            })
        );

        app.listen(port, async () => {
            console.info(`Server stated: http://localhost:${port}`);
            await connect();
        })

    } catch (e) {
        console.error("Error while running server", e)
    }
}

main();