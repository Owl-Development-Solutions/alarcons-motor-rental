"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartPoint } from "@/data/models";

export function DashboardBarChart({
  title,
  data,
  color = "#f97316",
}: {
  title: string;
  data: ChartPoint[];
  color?: string;
}) {
  const config = {
    value: { label: title, color },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="flex h-56 items-center justify-center text-sm text-muted-foreground">
            No data available.
          </p>
        ) : (
          <ChartContainer config={config} className="h-64 w-full">
            <BarChart
              data={data}
              accessibilityLayer
              margin={{ top: 12, left: -16, right: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              {/* <YAxis tickLine={false} axisLine={false} tickMargin={8} width={42} /> */}
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
