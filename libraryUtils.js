import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAllManga = async () => {
    const dirPath = path.join(__dirname, 'manga');

  try {
    const files = await fs.readdir(dirPath);
    return files;
  } catch (err) {
    console.error('Failed to read directory:', err);
    return [];
  }

}

export const getAllMangaChapters = async (mangaName) => {
    
    const mangaDir = path.join(__dirname, 'manga');

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
            const getNumber = str => parseFloat(str.replace('Episode ', ''));
            return getNumber(a) - getNumber(b);
        });

        return chapters;

    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getMangaChapterPath = async (mangaName, mangaChapter) => {
    const mangaDir = path.join(__dirname, 'manga');

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
            const getNumber = str => parseFloat(str.replace('Episode ', ''));
            return getNumber(a) - getNumber(b);
        });

        const matchedChapter = chapters.find(
            chapter => chapter.toLocaleLowerCase() == mangaChapter.toLowerCase()
        );

        if (!matchedChapter) {
            console.log('Manga chapter not found in getAllMangaChapters()');
            return [];
        }

        return path.join(matchedFolder, matchedChapter);

    } catch (err) {
        console.log(err);
        return [];
    }
}