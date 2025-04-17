const express = require('express');
const libraryUtils = require('./libraryUtils');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use('/manga', express.static(path.join(__dirname, 'manga')));

app.get('/api/manga', async (req,res) => {
    
    var files = await libraryUtils.getAllManga();

    if(files.length == 0)
    {
        res.statusCode = 404;
        res.send("Not Found");
    } else {
        res.statusCode = 200;
        res.json(files);
    }
})
app.get('/api/manga/:mangaName', async (req,res) => {
    const { mangaName } = req.params

    var files = await libraryUtils.getAllMangaChapters(mangaName);
    
    if (files.length == 0) {
        res.statusCode = 404;
        res.send('Not Found');
    } else {
        res.statusCode = 200;
        res.json(files);
    }

})
 app.get('/api/manga/:mangaName/:chapter', async (req, res) => {
    const { mangaName } = req.params
    const { chapter } = req.params

    var files = await libraryUtils.getMangaChapterPath(mangaName, chapter);

    console.log(files);

    if (files.length == 0) {
        res.statusCode = 404;
        res.send('Not Found');
    } else {
        res.statusCode = 200;
        res.json(files);
    }
});