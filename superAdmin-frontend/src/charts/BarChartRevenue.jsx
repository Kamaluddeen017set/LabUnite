import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function BarChartRevenue({ data }) {
  return (
    <div className="chart-card div6">
      <div className=" chart-title">
        <FontAwesomeIcon icon={faChartBar} /> Revenue Per Day
      </div>
      <BarChart
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
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="day" />
        <YAxis width="auto" dataKey="Revenue" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Revenue"
          fill="var(--scolor)"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="expensices"
          fill="maroon"
          activeBar={<Rectangle fill="gold" stroke="pink" />}
        />
      </BarChart>
    </div>
  );
}
