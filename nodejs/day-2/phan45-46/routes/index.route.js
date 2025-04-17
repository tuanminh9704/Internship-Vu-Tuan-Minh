export const routes = (app) => {
    app.get('/', (req, res) => {
        res.send("OK");
    })
}