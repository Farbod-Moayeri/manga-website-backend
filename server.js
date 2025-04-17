const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path')
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//app.use('/manga', express.static())


app.get('/api/manga', (req,res) => {
    const dirPath = path.join(__dirname, 'manga');
    
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(err);

            return;
        }
        
        res.json(files);
    }) 
})
app.get('/api/manga/:mangaName', (req,res) => {
    const { mangaName } = req.params

    const dirPath = path.join(__dirname, 'manga');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(err);

            return;
        }
        
        files.forEach((file) => {
            if (file.toLowerCase() == mangaName.toLowerCase())
            {
                const chapterPath = path.join(__dirname, 'manga', file);

                fs.readdir(chapterPath, (err, files) => {
                    if (err) {
                        console.log(err);
            
                        return;
                    }
                    
                    files = files.sort((a, b) => {
                        const getNumber = str => parseFloat(str.replace("Episode ", ""));
                        return getNumber(a) - getNumber(b);
                    });
                    
                    res.statusCode = 200;
                    res.json(files);
                })

            }
        })
    }) 

    if (res.statusCode != 200) {
        res.statusCode = 404;
        res.send('Not Found');
    }

})
 app.get('/api/manga/:mangaName/:chapter', (req, res) => {
     const { mangaName } = req.params
     const { chapter } = req.params
});