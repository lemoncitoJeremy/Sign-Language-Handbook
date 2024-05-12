import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { calc_color } from '../utilities/color-coding';

/* Used only in Model Performance */
function DoubleTimeChart(props: any){
    return(
        <LineChart
            width={props.width}
            height={props.height}
            data={props.data}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="current"/>
            <XAxis dataKey="current" xAxisId="top-axis" orientation='top'/>
            <YAxis dataKey="prev"/>
            <YAxis dataKey="prev" yAxisId="right-axis"
                orientation="right" />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="current" stroke="#FF8E25" activeDot={{ r: 8 }}/>
            <Line type="linear" dataKey="prev" stroke="#2A82BB" activeDot={{ r: 8 }}/>
        </LineChart>
        
    )
}

function HalfCircularProgress(props: any){
  const percentage = Math.round((props.percentage / props.max) * 100);

  return(
    
    <CircularProgressbar
      value={percentage}
      text={percentage + '%'}
      circleRatio={0.7}
      styles={{
          trail:{
            strokeLinecap: "butt",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
          },
          path: {
            strokeLinecap: "butt",
            transform: "rotate(-126deg)",
            transformOrigin: "center center",
            stroke: calc_color(percentage, 0, 120)
          },
          text: {
            fontSize: "15px",
            fill: "black"
          }
      }}
      strokeWidth={10}
  />

  )
};

function TimeChart(props: any){
  return(
    <AreaChart
      width={props.width}
      height={props.height}
      data={props.data}
      margin={{
        top: 10, right: 30, left: 30, bottom: 0 
      }}
    >
       <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#04A5FF" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#04A5FF" stopOpacity={0}/>
        </linearGradient>
      </defs>

      <XAxis dataKey="Month" tickLine={false} axisLine={false}/>
      <Area type="monotone" dataKey="UserCount" stroke="#1E88E5" strokeWidth={10} fill="url(#colorUv)" />
    </AreaChart>
  )
}

export {DoubleTimeChart, HalfCircularProgress, TimeChart};