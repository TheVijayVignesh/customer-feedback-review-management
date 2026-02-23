import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Props {
  sentimentData: { name: string; value: number }[];
  colors: string[];
}

const SentimentDistribution: React.FC<Props> = ({
  sentimentData,
  colors,
}) => {
  return (
    <Card className="shadow-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">
          📉 Sentiment Distribution (5-Level Analysis)
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <PieChart width={500} height={350}>
          <Pie
            data={sentimentData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={{
              fill: "#ffffff",
              fontSize: 14,
              fontWeight: 600,
            }}
            dataKey="value"
          >
            {sentimentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>

          {/* Glass Theme Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(45, 10, 107, 0.9)", // matches your gradient theme
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              color: "#ffffff",
              backdropFilter: "blur(10px)",
            }}
            itemStyle={{ color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
          />

          {/* White Legend for Dark Background */}
          <Legend
            wrapperStyle={{
              color: "#ffffff",
              paddingTop: "20px",
              fontWeight: 500,
            }}
          />
        </PieChart>
      </CardContent>
    </Card>
  );
};

export default SentimentDistribution;
