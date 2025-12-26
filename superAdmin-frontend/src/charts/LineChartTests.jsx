'use client';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function LineChartTests({ data }) {
  console.log(data);

  return (
    <div className="chart-card div5">
      <div className="chart-title">
        <FontAwesomeIcon icon={faChartLine} /> Daily Tests Performed
      </div>

      <LineChart
        style={{
          width: '100%',
          maxWidth: '700px',
          height: '100%',
          maxHeight: '70vh',
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 25,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis width="auto" dataKey="Requests" />
        <Legend />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Requests"
          stroke="var(--scolor)"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="pending" stroke="#f819e2f1" />
        <Line type="monotone" dataKey="completed" stroke="#10e461ff" />
      </LineChart>
    </div>
  );
}
