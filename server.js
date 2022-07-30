const express = require('express');

const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(webRoutes);
app.use('/api', apiRoutes);


app.get("*", (req, res) => {
    res.status(404).send('page not found');
})


app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})