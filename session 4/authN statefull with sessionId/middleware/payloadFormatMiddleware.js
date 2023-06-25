const payloadFormatMiddleware = (_, res) => {
    const status = res.statusCode ? res.statusCode : 200
    const data = res.data

    return res.render("showData", { data })
    // res.status(status).json(
    //     {
    //         data
    //     }
    // )
}

module.exports = payloadFormatMiddleware