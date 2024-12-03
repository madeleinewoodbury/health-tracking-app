import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

/**
 * Displays a bar chart of symptoms and their counts.
 * @param {Array} data - Array of objects with symptom and count.
 * @returns {JSX.Element} Bar chart.
 */
const BarChart = ({ data }) => {
	const svgRef = useRef()

	useEffect(() => {
		if (!data || data.length === 0) return

		// Set dimensions and margins
		const margin = { top: 20, right: 30, bottom: 50, left: 60 }
		const width = 800 - margin.left - margin.right
		const height = 400 - margin.top - margin.bottom

		// Clear previous SVG
		d3.select(svgRef.current).selectAll('*').remove()

		// Append the svg object to the body of the page
		const svg = d3
			.select(svgRef.current)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

		// Set the scales
		const x = d3.scaleBand().range([0, width]).padding(0.1)
		const y = d3.scaleLinear().range([height, 0])

		// Scale the range of the data
		x.domain(data.map((d) => d.symptom))
		y.domain([0, d3.max(data, (d) => d.count)])

		// Add the bars
		svg
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d) => x(d.symptom))
			.attr('width', x.bandwidth())
			.attr('y', (d) => y(d.count))
			.attr('height', (d) => height - y(d.count))
			.attr('fill', 'steelblue')

		// Add the X Axis
		svg
			.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(x))
			.selectAll('text')
			.attr('transform', 'rotate(-45)')
			.style('text-anchor', 'end')
			.style('fill', 'white')

		// Add the Y Axis
		svg
			.append('g')
			.call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')))
			.selectAll('text')
			.style('fill', 'white')

		// Add labels
		svg
			.append('text')
			.attr(
				'transform',
				`translate(${width / 2},${height + margin.bottom - 10})`
			)
			.style('text-anchor', 'middle')
			.style('fill', 'white')
			.text('Symptom')

		svg
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 0 - margin.left + 20)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.style('fill', 'white')
			.text('Count')
	}, [data])

	return <svg ref={svgRef}></svg>
}

export default BarChart
