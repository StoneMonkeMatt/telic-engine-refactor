import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChartDataPoint } from '../../types';

interface TelicEvolutionChartProps {
  chartData: ChartDataPoint[];
}

export const TelicEvolutionChart: React.FC<TelicEvolutionChartProps> = ({ chartData }) => {
  return (
    <div className="glass-panel p-4 h-[350px]">
      <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">Telic & Duality Evolution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
          <XAxis dataKey="step" fontSize={10} />
          <YAxis fontSize={10} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #00000010', fontSize: '10px' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase' }} />
          <Line type="monotone" dataKey="telic" stroke="#000" strokeWidth={2} dot={false} name="Telic Score" />
          <Line type="monotone" dataKey="duality" stroke="#10b981" strokeWidth={2} dot={false} name="Duality" />
          <Line type="monotone" dataKey="curvature" stroke="#9333ea" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Curvature (κ)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
