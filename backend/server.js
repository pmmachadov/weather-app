const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get('URL_DE_TU_API_METEOROLOGICA');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error al obtener los datos meteorológicos');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
