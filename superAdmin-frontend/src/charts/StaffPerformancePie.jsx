'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

// =====================
// Sample data (replace with API later)
// =====================
const COLORS = ['#2563EB', '#22C55E', '#EF4444'];

export default function StaffPerformancePie({
  data = [
    { name: 'Tests Completed', value: 420 },
    { name: 'Pending Tests', value: 80 },
    { name: 'Errors', value: 20 },
  ],
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      style={{
        width: '40%',

        padding: 16,
      }}
    >
      <p
        style={{
          color: 'var(--hcolor)',
          fontFamily: 'arial',
          opacity: '0.8',
          textAlign: 'center',
        }}
      >
        Staff Performance
      </p>
      <ResponsiveContainer>
        <PieChart>
          {/* Center text */}
          <text
            x="50%"
            y="46%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fill="#6B7280"
          >
            Test Performed
          </text>

          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={16}
            fontWeight={700}
            fill="#111827"
          >
            {total}
          </text>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={47}
            outerRadius={75}
            paddingAngle={2}
            zIndex={1}
            isAnimationActive
            style={{ cursor: 'pointer' }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            {/* Percentage labels */}
            <LabelList
              dataKey="value"
              position="inside"
              formatter={value => {
                const numericValue = Number(value);
                if (!numericValue || !total) return '';
                return `${Math.round((numericValue / total) * 100)}%`;
              }}
              fill="#ffffff"
              fontSize={13}
              fontWeight={600}
              style={{ cursor: 'pointer' }}
            />
          </Pie>

          <Tooltip
            contentStyle={{
              background: 'var(--pcolor)',
              fontFamily: 'arial',
              border: 'none',
              borderRadius: '10px',
              boxShadow:
                '3px 4px 5px rgb(0,0,0,0.2),-3px -4px 5px rgb(0,0,0,0.2)',
              fontSize: '12px',
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
