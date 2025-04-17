const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`))
.catch((err) => {
    console.log(err);
})

app.use(express.static('manga'))