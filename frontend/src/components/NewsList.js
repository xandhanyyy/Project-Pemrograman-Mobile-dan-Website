import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    AppBar,
    Toolbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './NewsList.css';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredNews, setFilteredNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://192.168.195.205:5000/berita');
                setNews(response.data);
                setFilteredNews(response.data);
            } catch (error) {
                console.error('Error fetching the news data:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        setFilteredNews(
            news.filter((item) =>
                item.judul_berita?.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, news]);

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Berita Pemrograman Mobile dan Website
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ paddingTop: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search news"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {filteredNews.length > 0 ? (
                    <Grid container spacing={3}>
                        {filteredNews.map((item, index) => (
                            <Grid item xs={12} key={item.id}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                                            {item.judul_berita}
                                        </Typography>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            {item.jenis_berita}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                            {item.ringkasan}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ marginBottom: 1 }}>
                                            Hits: {item.hits} | Tanggal Post: {item.tanggal_post}
                                        </Typography>
                                        {Array.isArray(item.keywords) && (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {item.keywords.map((keyword) => (
                                                    <Chip
                                                        key={keyword}
                                                        label={keyword}
                                                        variant="outlined"
                                                        size="small"
                                                        sx={{ marginRight: 1, marginBottom: 1 }}
                                                    />
                                                ))}
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h6" align="center" color="text.secondary">
                        No news available.
                    </Typography>
                )}
            </Container>
        </div>
    );
};

export default NewsList;
