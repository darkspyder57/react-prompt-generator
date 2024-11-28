import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Chart = ({ data, chartType = 'bar', width = 500, height = 300 }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear chart area before rendering
    d3.select(chartRef.current).selectAll('*').remove();

    // Render based on chart type
    if (chartType === 'bar') {
      renderBarChart(data, chartRef.current, width, height);
    } else if (chartType === 'line') {
      renderLineChart(data, chartRef.current, width, height);
    }
  }, [data, chartType, width, height]);

  const renderBarChart = (data, container, width, height) => {
    const svg = d3.select(container);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([chartHeight, 0]);

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Axes
    chart.append('g').call(d3.axisBottom(x).tickSize(0)).attr('transform', `translate(0,${chartHeight})`);
    chart.append('g').call(d3.axisLeft(y));

    // Bars
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.label))
      .attr('y', (d) => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => chartHeight - y(d.value))
      .attr('fill', 'steelblue');
  };

  const renderLineChart = (data, container, width, height) => {
    const svg = d3.select(container);
    // Add your line chart logic here
  };

  return <svg ref={chartRef} width={width} height={height}></svg>;
};

export default D3Chart;
