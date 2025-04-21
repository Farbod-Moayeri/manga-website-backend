import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllManga = async () => {
    const dirPath = path.join(__dirname, 'public/manga');

  try {
    const files = await fs.readdir(dirPath);
    return files;
  } catch (err) {
    console.error('Failed to read directory:', err);
    return [];
  }

}

export const getAllMangaChapters = async (mangaName) => {
    
    const mangaDir = path.join(__dirname, 'public/manga');

    try {
        const seriesFolders = await fs.readdir(mangaDir);

        const matchedFolder = seriesFolders.find(
            folder => folder.toLowerCase() === mangaName.toLowerCase()
        );

        if (!matchedFolder) {
            console.log('Manga not found in getAllMangaChapters()');
            return [];
        }

        const chapterPath = path.join(mangaDir, matchedFolder);
        let chapters = await fs.readdir(chapterPath);

        chapters = chapters.sort((a, b) => {
            const getNumber = (str) => {
              const match = str.match(/[\d.]+/); 
              return match ? parseFloat(match[0]) : 0; 
            };
          
            return getNumber(a) - getNumber(b);
        });

        return chapters;

    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getMangaChapterPages = async (mangaName, mangaChapter) => {
    const mangaDir = path.join(__dirname, 'public/manga');

    try {
        const seriesFolders = await fs.readdir(mangaDir);

        const matchedFolder = seriesFolders.find(
            folder => folder.toLowerCase() === mangaName.toLowerCase()
        );

        if (!matchedFolder) {
            console.log('Manga not found in getAllMangaChapters()');
            return [];
        }

        const chapterPath = path.join(mangaDir, matchedFolder);
        let chapters = await fs.readdir(chapterPath);

        chapters = chapters.sort((a, b) => {
            const getNumber = (str) => {
              const match = str.match(/[\d.]+/); 
              return match ? parseFloat(match[0]) : 0; 
            };
          
            return getNumber(a) - getNumber(b);
        });

        const matchedChapter = chapters.find(
            chapter => chapter.toLocaleLowerCase() == mangaChapter.toLowerCase()
        );

        if (!matchedChapter) {
            console.log('Manga chapter not found in getAllMangaChapters()');
            return [];
        }

        const pagesPath = path.join(mangaDir, matchedFolder, matchedChapter);
        let pages = await fs.readdir(pagesPath);

        pages = pages.sort((a, b) => {
            const getNumber = (str) => {
              const match = str.match(/[\d.]+/); 
              return match ? parseFloat(match[0]) : 0; 
            };
          
            return getNumber(a) - getNumber(b);
        });


        return pages;

    } catch (err) {
        console.log(err);
        return [];
    }
}
export const getMangaChapterPageURL = async (mangaName, mangaChapter, page) => {
    
    const mangaDir = path.join(__dirname, `public/manga/${mangaName}`);
    try {
        const seriesFolders = await fs.readdir(mangaDir);
    } catch (err) {
        return [];
    }

    const chapterDir = path.join(__dirname, `public/manga/${mangaName}/${mangaChapter}`);
    try {
        const chapterFolders = await fs.readdir(chapterDir);
    } catch (err) {
        return [];
    }

    const pageFile = path.join(__dirname, `public/manga/${mangaName}/${mangaChapter}/${page}`);
    try {
        const mangaFile = await fs.readFile(pageFile);
    } catch (err) {
        return [];
    }
    
    const pageURL = `http://localhost:${process.env.PORT || 3000}/public/manga/${mangaName}/${mangaChapter}/${page}`;
    

    return pageURL;
}