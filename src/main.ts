import App from './App.svelte';

// choose random favicon
const faviconFileNames = [
    'favicon_brick.svg',
    'favicon_lumber.svg',
    'favicon_ore.svg',
    'favicon_grain.svg',
    'favicon_wool.svg',
];
const randomFaviconFileName = faviconFileNames[Math.floor(Math.random() * faviconFileNames.length)];
const randomFaviconURL = './assets/' + randomFaviconFileName;

// set random favicon
const faviconLink = document.getElementById('faviconLink');
faviconLink.setAttribute('href', randomFaviconURL);

const app = new App({
    target: document.body,
});

export default app;