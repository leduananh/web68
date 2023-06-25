const express = require('express');

const app = express();

const { v4: uuidv4 } = require('uuid');

const session = require('express-session');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({
    genid: req => {
        return uuidv4(); // use UUIDs for session IDs
    },
    secret: "xxx",
    resave: false,
    saveUninitialized: false,
}));

app.get("/test", async (req, res) => {
    const { name, action } = req.query
    if (action === "show") {
        const rsName = req.session.names?.[`${name}`]

        if (!rsName) {
            return res.json({
                error: "name not exists"
            })
        }

        res.status(200).json({
            name: rsName
        })

    } else if (action === "store") {
        if (!req.session.names) {
            req.session.names = new Map()
        }

        req.session.names[`${name}`] = name

        const error = await req.session.save()

        if (error) {
            return res.json({
                error: "error"
            })
        }

        res.status(200).json({
            status: "data successfully stored"
        })
    }
})

app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
});

