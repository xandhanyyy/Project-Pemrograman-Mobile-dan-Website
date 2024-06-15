const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Buat koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_pemweb' 
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Tambah Berita
router.post('/add', (req, res) => {
    const newBerita = {
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        keywords: req.body.keywords
    };
    const sql = 'INSERT INTO berita SET ?';
    db.query(sql, newBerita, (err, result) => {
        if (err) throw err;
        res.send('Berita added...');
    });
});

// Dapatkan Semua Berita
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM berita';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update Berita
router.put('/update/:id', (req, res) => {
    const updatedBerita = {
        title: req.body.title,
        category: req.body.category,
        summary: req.body.summary,
        keywords: req.body.keywords
    };
    const sql = `UPDATE berita SET ? WHERE id = ${req.params.id}`;
    db.query(sql, updatedBerita, (err, result) => {
        if (err) throw err;
        res.send('Berita updated...');
    });
});

// Hapus Berita
router.delete('/delete/:id', (req, res) => {
    const sql = `DELETE FROM berita WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Berita deleted...');
    });
});

module.exports = router;
