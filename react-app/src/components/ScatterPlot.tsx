import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({ data }) => {
	const svgRef = useRef()

	useEffect(() => {
		if (!data || data.length === 0) return

		// Dimensions
		const width = 800
		const height = 400
		const margin = { top: 20, right: 30, bottom: 40, left: 50 }

		// Clear previous SVG
		d3.select(svgRef.current).selectAll('*').remove()

		// Create SVG
		const svg = d3
			.select(svgRef.current)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('preserveAspectRatio', 'xMidYMid meet')
			.classed('svg-content-responsive', true)

		// Scales
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.location))
			.range([margin.left, width - margin.right])
			.padding(0.5)

		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.symptoms)])
			.nice()
			.range([height - margin.bottom, margin.top])

		const colorScale = d3
			.scaleOrdinal(d3.schemeCategory10)
			.domain(data.map((d) => d.cluster))

		// Axes
		const xAxis = d3.axisBottom(xScale).tickFormat((d) => d.split(', ')[1])
		const yAxis = d3.axisLeft(yScale)

		svg
			.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(xAxis)
			.selectAll('text')
			.attr('transform', 'rotate(-45)')
			.style('text-anchor', 'end')
			.style('fill', 'white')

		svg
			.append('g')
			.attr('transform', `translate(${margin.left},0)`)
			.call(yAxis)
			.selectAll('text')
			.style('fill', 'white')

		// Scatter points
		svg
			.append('g')
			.selectAll('circle')
			.data(data)
			.join('circle')
			.attr('cx', (d) => xScale(d.location) + xScale.bandwidth() / 2)
			.attr('cy', (d) => yScale(d.symptoms))
			.attr('r', 8)
			.attr('fill', (d) => colorScale(d.cluster))
			.attr('stroke', 'white')
			.attr('stroke-width', 1)

		// Labels
		svg
			.append('text')
			.attr('x', width / 2)
			.attr('y', height - margin.bottom / 2)
			.attr('text-anchor', 'middle')
			.text('Location')
			.style('fill', 'white')

		svg
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', margin.left / 2)
			.attr('text-anchor', 'middle')
			.text('Total Symptoms')
			.style('fill', 'white')
	}, [data])

	return <svg ref={svgRef} style={{ width: '100%', height: 'auto' }}></svg>
}

export default ScatterPlot
