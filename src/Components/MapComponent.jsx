// src/components/MapComponent.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import osmtogeojson from 'osmtogeojson';

const MapComponent = () => {
    const mapRef = useRef();
    const [geoData, setGeoData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const width = 960;
        const height = 600;

        const svg = d3.select(mapRef.current)
            .attr('width', width)
            .attr('height', height);

        const projection = d3.geoMercator()
            .scale(1000000) // Ajustar la escala según sea necesario
            .center([13.3779, 52.5160]) // Centrar en las coordenadas deseadas
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        if (geoData?.features) {
            console.log("GeoData Features:", geoData.features); // Verificar las características específicas

            svg.selectAll('path').remove(); // Limpiar datos previos
            svg.selectAll('path')
                .data(geoData.features)
                .enter().append('path')
                .attr('d', path)
                .attr('fill', '#ccc')
                .attr('stroke', '#333')
                .on("mouseover", function (event, d) {
                    d3.select(this).attr('fill', '#ffcc00');
                })
                .on("mouseout", function (event, d) {
                    d3.select(this).attr('fill', '#ccc');
                });
        }
    }, [geoData]);

    const fetchData = async (bounds) => {
        setLoading(true);
        const [south, west, north, east] = bounds;
        const query = `[out:json];(node(${south},${west},${north},${east});way(${south},${west},${north},${east});relation(${south},${west},${north},${east}););out body;>;out skel qt;`;
        const url = `http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const geojson = osmtogeojson(data); // Convertir a GeoJSON
            setGeoData(geojson);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMapClick = () => {
        const bounds = [52.5160, 13.3779, 52.5206, 13.3841]; // Ajustar los límites según sea necesario
        fetchData(bounds);
    };

    return (
        <div>
            <button onClick={ handleMapClick } disabled={ loading }>Load Data</button>
            { loading && <p>Loading...</p> }
            <svg ref={ mapRef } style={ { backgroundColor: '#ddd' } }></svg>
        </div>
    );
};

export default MapComponent;
