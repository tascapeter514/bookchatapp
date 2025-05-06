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

        const margin = { top: 20, right: 30, bottom: 30, left: 100}
        const width = 600 - margin.left - margin.right;
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
            


        // Add labels
        svg.selectAll('text')
        .data(results)
        .enter()
        .append('text')
        .text(d => d.voteCount)
        .attr('x', d => {
            const barWidth = xScale(d.voteCount || 0)
            return barWidth < 20 ? barWidth + 5 : barWidth - 5;
        })
        .attr('text-anchor', d => {
            return xScale(d.voteCount || 0) < 20 ? 'start' : 'end';
        })
        .attr('y', d => yScale(d.book.name)! + yScale.bandwidth() / 2)
        .attr('alignment-baseline', 'middle')
        .attr('fill', 'black');


        // Y axis

        svg.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('.tick text')
        .call(text => {
            text.each(function() {
                const self = d3.select(this);
                const words = self.text().split(/\s+/);
                self.text(null);
                words.forEach((word, i) => {
                    self.append('tspan')
                        .text(word)
                        .attr('x', 0)
                        .attr('dy', i === 0 ? 0 : '1.1em');
                });
            });
        });



    }, [results])


    return(
        <svg ref={svgRef}></svg>
    )

}

export default BarChart