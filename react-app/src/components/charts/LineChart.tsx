import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LineChart = ({ data }) => {
	const svgRef = useRef()

	useEffect(() => {
		if (!data || data.length === 0) return

		// Set dimensions and margins
		const margin = { top: 20, right: 30, bottom: 50, left: 60 }
		const width = 800 - margin.left - margin.right
		const height = 400 - margin.top - margin.bottom

		// Parse the date / time
		const parseDate = d3.timeParse('%Y-%m-%d')

		// Set the ranges
		const x = d3.scaleTime().range([0, width])
		const y = d3.scaleLinear().range([height, 0])

		// Define the line
		const valueline = d3
			.line()
			.x((d) => x(parseDate(d.date)))
			.y((d) => y(d.uniqueUsers))

		// Clear previous SVG
		d3.select(svgRef.current).selectAll('*').remove()

		// Append the svg object to the body of the page
		const svg = d3
			.select(svgRef.current)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

		// Scale the range of the data
		x.domain(d3.extent(data, (d) => parseDate(d.date)))
		y.domain([0, d3.max(data, (d) => d.uniqueUsers)])

		// Add the valueline path
		svg
			.append('path')
			.data([data])
			.attr('class', 'line')
			.attr('d', valueline)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-width', 2)

		// Add the scatterplot points
		svg
			.selectAll('dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('cx', (d) => x(parseDate(d.date)))
			.attr('cy', (d) => y(d.uniqueUsers))
			.attr('r', 4)
			.attr('fill', 'steelblue')

		// Add the X Axis
		svg
			.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(x).tickFormat(d3.timeFormat('%m-%d'))) // Format date as MM-DD
			.selectAll('text')
			.attr('transform', 'rotate(-45)')
			.style('text-anchor', 'end')
			.style('fill', 'white') // Make text white

		// Add the Y Axis
		svg
			.append('g')
			.call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d'))) // Add ticks for better readability
			.selectAll('text')
			.style('fill', 'white') // Make text white

		// Add labels
		svg
			.append('text')
			.attr('transform', `translate(${width / 2},${height + margin.bottom})`)
			.style('text-anchor', 'middle')
			.style('fill', 'white') // Make text white
			.text('Date')

		svg
			.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('y', 10 - margin.left)
			.attr('x', 0 - height / 2)
			.attr('dy', '1em')
			.style('text-anchor', 'middle')
			.style('fill', 'white')
			.text('Number of Users')
	}, [data])

	return <svg ref={svgRef}></svg>
}

export default LineChart
