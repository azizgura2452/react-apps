import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import * as d3 from 'd3';
import { useEffect } from 'react';

interface DataPoint {
    label: string;
    value: number;
}

interface TimeDataPoint {
    date: string;
    value: number;
}

// Sample data
const barData: DataPoint[] = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 }
];

const lineData: TimeDataPoint[] = [
    { date: '2023-01', value: 30 },
    { date: '2023-02', value: 45 },
    { date: '2023-03', value: 35 },
    { date: '2023-04', value: 50 }
];

const histogramData = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

const pieData: DataPoint[] = [
    { label: 'Category 1', value: 30 },
    { label: 'Category 2', value: 20 },
    { label: 'Category 3', value: 25 },
    { label: 'Category 4', value: 25 }
];

const Datavisualization = () => {
    useEffect(() => {
        // Clear existing charts
        d3.selectAll('svg').remove();

        // Create tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('padding', '8px')
            .style('border', '1px solid #ddd')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0);

        // Bar Chart
        const barSvg = d3.select('#bar-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 600 400');

        barSvg.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', (d: DataPoint, i: number) => i * 120 + 80)
            .attr('y', (d: DataPoint) => 350 - d.value * 12)
            .attr('width', 80)
            .attr('height', (d: DataPoint) => d.value * 12)
            .attr('fill', '#2196f3')
            .on('mouseover', (event: MouseEvent, d: DataPoint) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`Label: ${d.label}<br/>Value: ${d.value}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        // Add labels
        barSvg.selectAll('text')
            .data(barData)
            .enter()
            .append('text')
            .text((d: DataPoint) => d.label)
            .attr('x', (d: DataPoint, i: number) => i * 120 + 120)
            .attr('y', 380)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px');

        // Line Chart  
        const lineSvg = d3.select('#line-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 600 400');

        const line = d3.line<TimeDataPoint>()
            .x((d, i) => i * 160 + 80)
            .y(d => 350 - d.value * 6);

        lineSvg.append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', '#4caf50')
            .attr('stroke-width', 3)
            .attr('d', line);

        // Add interactive points
        lineSvg.selectAll('circle')
            .data(lineData)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => i * 160 + 80)
            .attr('cy', d => 350 - d.value * 6)
            .attr('r', 8)
            .attr('fill', '#4caf50')
            .on('mouseover', (event: MouseEvent, d: TimeDataPoint) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`Date: ${d.date}<br/>Value: ${d.value}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        // Add date labels
        lineSvg.selectAll('.date-label')
            .data(lineData)
            .enter()
            .append('text')
            .attr('class', 'date-label')
            .text(d => d.date)
            .attr('x', (d, i) => i * 160 + 80)
            .attr('y', 380)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px');

        // Geographic Map
        const mapSvg = d3.select('#map-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 1200 600');

        const projection = d3.geoMercator()
            .scale(200)
            .center([0, 20])
            .translate([600, 300]);

        const pathGenerator = d3.geoPath().projection(projection);

        // Load world map data only once
        d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then((data: any) => {
                mapSvg.selectAll('path')
                    .data(data.features)
                    .enter()
                    .append('path')
                    .attr('d', pathGenerator)
                    .attr('fill', '#69b3a2')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 0.5)
                    .on('mouseover', (event: MouseEvent, d: any) => {
                        d3.select(event.currentTarget)
                            .attr('fill', '#4a7b6c');
                        tooltip.transition()
                            .duration(200)
                            .style('opacity', .9);
                        tooltip.html(d.properties.name)
                            .style('left', (event.pageX + 10) + 'px')
                            .style('top', (event.pageY - 28) + 'px');
                    })
                    .on('mouseout', (event) => {
                        d3.select(event.currentTarget)
                            .attr('fill', '#69b3a2');
                        tooltip.transition()
                            .duration(500)
                            .style('opacity', 0);
                    });
            });

        // Histogram
        const histogramSvg = d3.select('#histogram-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 600 400');

        const histogram = d3.histogram()
            .value((d) => d)
            .domain([0, 100])
            .thresholds(20);

        const bins = histogram(histogramData);

        histogramSvg.selectAll('rect')
            .data(bins)
            .enter()
            .append('rect')
            .attr('x', (d: any) => d.x0! * 5.5 + 40)
            .attr('y', (d: any) => 350 - d.length * 15)
            .attr('width', (d: any) => (d.x1! - d.x0!) * 5.5 - 1)
            .attr('height', (d: any) => d.length * 15)
            .attr('fill', '#ff9800')
            .on('mouseover', (event: MouseEvent, d: any) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`Range: ${Math.round(d.x0!)}-${Math.round(d.x1!)}<br/>Count: ${d.length}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        // Pie Chart
        const pieSvg = d3.select('#pie-chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 300 300');

        const radius = Math.min(300, 300) / 2 - 40;
        const pie = d3.pie<DataPoint>().value(d => d.value);
        const arc = d3.arc<any>()
            .innerRadius(0)
            .outerRadius(radius);

        const colorScale = d3.scaleOrdinal<string>()
            .domain(pieData.map(d => d.label))
            .range(d3.schemeCategory10);

        const pieG = pieSvg.append('g')
            .attr('transform', `translate(${300/2},${300/2})`);

        pieG.selectAll('path')
            .data(pie(pieData))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d: any) => colorScale(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .on('mouseover', (event: MouseEvent, d: any) => {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`${d.data.label}<br/>${d.data.value}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
            <Typography variant="h4" gutterBottom>Interactive Data Visualization</Typography>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Paper sx={{ p: 2, flex: '1 1 45%', minWidth: '400px' }}>
                    <Typography variant="h6" gutterBottom>Bar Chart</Typography>
                    <div id="bar-chart" style={{ width: '100%', height: '400px' }}></div>
                </Paper>

                <Paper sx={{ p: 2, flex: '1 1 45%', minWidth: '400px' }}>
                    <Typography variant="h6" gutterBottom>Line Chart</Typography>
                    <div id="line-chart" style={{ width: '100%', height: '400px' }}></div>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Paper sx={{ p: 2, flex: '1 1 100%', minWidth: '800px' }}>
                    <Typography variant="h6" gutterBottom>Geographic Map</Typography>
                    <div id="map-chart" style={{ width: '100%', height: '600px' }}></div>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Paper sx={{ p: 2, flex: '1 1 45%', minWidth: '400px' }}>
                    <Typography variant="h6" gutterBottom>Histogram</Typography>
                    <div id="histogram-chart" style={{ width: '100%', height: '400px' }}></div>
                </Paper>

                <Paper sx={{ p: 2, flex: '1 1 45%', minWidth: '400px' }}>
                    <Typography variant="h6" gutterBottom>Pie Chart</Typography>
                    <div id="pie-chart" style={{ width: '100%', height: '400px' }}></div>
                </Paper>
            </Box>
        </Box>
    )
}

export default Datavisualization