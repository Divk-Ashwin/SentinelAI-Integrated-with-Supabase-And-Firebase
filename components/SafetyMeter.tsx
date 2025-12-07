'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { SafetyMeterProps } from '@/types'

export default function SafetyMeter({ score, status }: SafetyMeterProps) {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ]

  const getColor = () => {
    if (status === 'safe') return '#22c55e'
    if (status === 'caution') return '#eab308'
    return '#ef4444'
  }

  const getStatusText = () => {
    if (status === 'safe') return 'Safe to Consume'
    if (status === 'caution') return 'Use Caution'
    return 'Unsafe - Do Not Consume'
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              <Cell fill={getColor()} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-bold" style={{ color: getColor() }}>
            {score}
          </p>
          <p className="text-sm text-gray-500">Safety Score</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xl font-semibold" style={{ color: getColor() }}>
          {getStatusText()}
        </p>
      </div>
    </div>
  )
}
