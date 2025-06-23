"use client"

import React from "react"
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Cell } from "recharts"

interface SkillRadialChartProps {
  skillName: string
  proficiency: number
  color?: string
  icon?: React.ReactNode
  size?: number
}

export function SkillRadialChart({
  skillName,
  proficiency,
  color = "hsl(var(--primary))", // Default to primary magenta-like color
  icon,
  size = 150, // Default size
}: SkillRadialChartProps) {
  const data = [{ name: skillName, value: proficiency }]

  return (
    <div className="flex flex-col items-center text-center">
      <div style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={10} data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" angleAxisId={0} cornerRadius={5}>
              <Cell fill={color} />
            </RadialBar>
            {/* Text in the center */}
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-xl font-bold font-geist"
            >
              {`${proficiency}%`}
            </text>
            {icon && (
              <foreignObject x="40%" y="52%" width="20%" height="20%">
                <div className="flex h-full w-full items-center justify-center text-primary">
                  {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
                </div>
              </foreignObject>
            )}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm font-medium text-foreground font-geist-mono">{skillName}</p>
    </div>
  )
}
