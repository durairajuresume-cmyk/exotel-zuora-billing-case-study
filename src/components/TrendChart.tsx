import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendPoint } from '../types';

interface TrendChartProps {
  data: TrendPoint[];
  dataKey: keyof TrendPoint;
  color: string;
  label: string;
  suffix?: string;
}

export function TrendChart({ data, dataKey, color, label, suffix = '' }: TrendChartProps) {
  return (
    <div className="h-56 w-full">
      <div className="text-xs font-medium text-text-muted mb-1">{label}</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id={`grad-${String(dataKey)}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#232c3d" vertical={false} />
          <XAxis dataKey="period" stroke="#5c6779" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#5c6779"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            width={50}
            domain={['auto', 'auto']}
            tickCount={4}
            tickFormatter={(v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2))}
          />
          <Tooltip
            contentStyle={{ background: '#161d2b', border: '1px solid #2c3648', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#8b96a8' }}
            formatter={(value) => [`${value}${suffix}`, label]}
          />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${String(dataKey)})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
