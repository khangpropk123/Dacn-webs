module.exports = function (app, path) {

    app.post('/web-api/get-mark', (request, response) => {
        response
            .status(200)
            .json(
                {
                    "ok": true,
                }
            )
    })

}