import React, { useState }from 'react';
import { LuBarChart3 } from "react-icons/lu";
import { BiLineChart } from "react-icons/bi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import './index.css'

const Forecast = ({title,data}) => {

    const [showLineChart, setShowLineChart] = useState(true);

    const toggleChart = () => {
        setShowLineChart(!showLineChart);
      };

      console.log(data)
    
      const Data = data.map((d,index) => ({
        id:d.index,
        hour:d.title,
        temperature:d.temp.toFixed()
      }))


    {/* Custom label to display temperature on each points on the graph*/}
      const CustomLabel = ({ x, y, value }) => {  
        return (
          <text x={x} y={y} dy={-4} fill="#ffffff" fontSize={12} textAnchor="middle">
            {value}°
          </text>
        );
      };

    return (
    <div>
        <div className='forecastTop'>
            <p>{title}</p>
            <button onClick={toggleChart} className='toggleGraph'>  {/* Toggle button to toggle between Bar Graph and Line Graph */}
                {showLineChart ? <BiLineChart/> : <LuBarChart3/>}
            </button>
        </div>
        <hr className='horizontalLine'/>
        {showLineChart ? (
            <ResponsiveContainer  width="100%" height={200}>
            <LineChart data={Data}>
                <XAxis dataKey="hour"  stroke="#ffffff" />
                <YAxis  stroke="#ffffff"/>
                <Tooltip  contentStyle={{ display: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="temperature"  stroke="#ffffff" >
                <LabelList dataKey="temperature" position="top" content={<CustomLabel />} />
                </Line>
            </LineChart>
            </ResponsiveContainer>
        ) : (
            <ResponsiveContainer  width="100%" height={200}>
            <BarChart data={Data}>
            
                <XAxis dataKey="hour"  stroke="#ffffff"/>
                <YAxis  stroke="#ffffff"/>
                <Tooltip  contentStyle={{ display: 'none' }} />
                <Legend />
                <Bar dataKey="temperature" fill='#0545ab'  stroke="#ffffff">
                <LabelList dataKey="temperature" content={<CustomLabel />} />
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        )}
    </div>
    )

}

export default Forecast
