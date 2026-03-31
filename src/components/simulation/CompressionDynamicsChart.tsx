import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ChartDataPoint } from '../../types';

interface CompressionDynamicsChartProps {
  chartData: ChartDataPoint[];
}

export const CompressionDynamicsChart: React.FC<CompressionDynamicsChartProps> = ({ chartData }) => {
  return (
    <div className="glass-panel p-4 h-[300px]">
      <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Compression Dynamics</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
          <XAxis dataKey="step" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #00000010', fontSize: '10px' }}
          />
          <Area type="step" dataKey="length" stroke="#000" fill="#00000005" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
