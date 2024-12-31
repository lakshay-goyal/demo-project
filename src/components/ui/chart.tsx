import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Pie, PieChart as RechartsPieChart, Cell, Legend } from 'recharts'

interface ChartProps {
  data: { [key: string]: number }
}

export function BarChart({ data }: ChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function PieChart({ data }: ChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

