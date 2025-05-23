import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import { PollResult } from '../../types';

interface Props {
    results: PollResult[]
}


const BarChart = ({results}: Props) => {

    console.log('bar chart results:', results)

    const svgRef = useRef<SVGSVGElement | null>(null)

    useEffect(() => {
        if (!results.length) return;

        const margin = { top: 20, right: 30, bottom: 30, left: 300}
        const width = 800 - margin.left - margin.right;
        const height = results.length * 30;

        //clear previous chart

        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)


        // Scales
        const xScale = d3.scaleLinear()
        .domain([0, d3.max(results, d => d.voteCount) ?? 0])
        .range([0, width])

        const yScale = d3.scaleBand()
        .domain(results.map(d => d.book.name))
        .range([0, height])
        .padding(0.1)

        svg.selectAll('rect')
            .data(results)
            .enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', d => yScale(d.book.name)!)
            .attr('width', d => xScale(d.voteCount || 0))
            .attr('height', yScale.bandwidth())
            .attr('fill', 'orange')
            


        // ➕ UPDATED: Add vote count labels inside or near bars
        svg.selectAll('text.vote-label')
            .data(results)
            .enter()
            .append('text')
            .attr('class', 'vote-label')
            .text(d => d.voteCount)
            .attr('x', d => xScale(d.voteCount || 0) + 5)
            .attr('y', d => yScale(d.book.name)! + yScale.bandwidth() / 1.25)
            .attr('text-anchor', 'center')
            .attr('alignment-baseline', 'center')
            .attr('fill', 'black');

        // Y axis
        const yAxis = svg.append('g')
            .call(d3.axisLeft(yScale));
        
        yAxis.selectAll('text')
            .attr('dx', '-0.5em')  // shift labels slightly left
            .attr('dy', '0.35em')  // vertically center the text
            .style('text-anchor', 'end');  // right-align text
        


    }, [results])


    return(
        <svg ref={svgRef}></svg>
    )

}

export default BarChart