
// Auto-generated filmhub server
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (movies folder)
app.use('/movies', express.static(path.join(__dirname, 'public/movies')));

// Movies listing page
app.get('/movies', (req, res) => {
    const moviesDir = path.join(__dirname, 'public/movies');
    fs.readdir(moviesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading movies folder');
        }
        const movieFiles = files.filter(f => f.endsWith('.mp4'));
        let html = '<html><head><title>FilmHub Movies</title></head><body>';
        html += '<h1>Available Movies</h1>';
        if (movieFiles.length === 0) {
            html += '<p>No movies uploaded yet.</p>';
        } else {
            movieFiles.forEach(file => {
                html += `<div style="margin-bottom:20px;">
                            <h3>${file}</h3>
                            <video width="640" controls>
                                <source src="/movies/${file}" type="video/mp4">
                                Your browser does not support video.
                            </video>
                         </div>`;
            });
        }
        html += '</body></html>';
        res.send(html);
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to FilmHub</h1><p><a href="/movies">Go to Movies</a></p>');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
