"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const data = [
  { time: "06:00", occupancy: 15 },
  { time: "07:00", occupancy: 45 },
  { time: "08:00", occupancy: 78 },
  { time: "09:00", occupancy: 92 },
  { time: "10:00", occupancy: 65 },
  { time: "11:00", occupancy: 48 },
  { time: "12:00", occupancy: 72 },
  { time: "13:00", occupancy: 85 },
  { time: "14:00", occupancy: 58 },
  { time: "15:00", occupancy: 42 },
  { time: "16:00", occupancy: 38 },
  { time: "17:00", occupancy: 55 },
  { time: "18:00", occupancy: 88 },
  { time: "19:00", occupancy: 95 },
  { time: "20:00", occupancy: 82 },
  { time: "21:00", occupancy: 45 },
  { time: "22:00", occupancy: 25 },
];

const chartConfig = {
  occupancy: {
    label: "Ocupação",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function OccupancyChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">
          Ocupação em Tempo Real
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Taxa de ocupação ao longo do dia
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart accessibilityLayer data={data}>
            <defs>
              <linearGradient id="fillOccupancy" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="occupancy"
              type="monotone"
              fill="url(#fillOccupancy)"
              fillOpacity={0.4}
              stroke="var(--color-chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
