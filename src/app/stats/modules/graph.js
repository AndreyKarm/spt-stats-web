import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { calculateDateRange } from '../utils/dateUtils';

const Graph = ({ timeRange, selectedStats }) => {
    const [chartOptions, setChartOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const dateRange = calculateDateRange(timeRange);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stat: selectedStats,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            // Check if properties exist but allow empty arrays
            console.log(JSON.stringify(data));
            if (typeof data.xAxis === 'undefined' || 
                typeof data.legend === 'undefined' || 
                typeof data.series === 'undefined') {
                throw new Error('Invalid data format received from API');
            }
            return data;
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                throw new Error('Unable to connect to the server. Please check if the server is running.');
            }
            throw error;
        }
    };

    
    const getChartOptions = (apiData) => {
        console.log(apiData.series);
        return {
            title: {
            text: 'Stats Over Time'
            },
            tooltip: {
            trigger: 'axis'
            },
            legend: {
            data: apiData.legend.data
            },
            xAxis: {
            type: 'category',
            boundaryGap: false,
            data: apiData.xAxis.data
            },
            yAxis: {
            type: 'value'
            },
            series: apiData.series.map(series => ({
                ...series,
                type: 'line',
                stack: 'Total'
            }))
        };
    };

    useEffect(() => {
        const loadChartData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchData();
                setChartOptions(getChartOptions(data));
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadChartData();
    }, [timeRange, selectedStats]);

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading">Loading...</div>
            ) : (
                chartOptions && (
                    <ReactECharts
                        option={chartOptions}
                        style={{ height: '400px', width: '100%' }}
                        className='react_for_echarts'
                    />
                )
            )}
        </>
    );
};

export default Graph;