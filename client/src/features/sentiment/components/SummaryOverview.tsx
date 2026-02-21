import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  veryPositivePercent: number;
  positivePercent: number;
  neutralPercent: number;
  negativePercent: number;
  veryNegativePercent: number;
}

const SummaryOverview: React.FC<Props> = ({
  veryPositivePercent,
  positivePercent,
  neutralPercent,
  negativePercent,
  veryNegativePercent,
}) => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl text-white">
        
        {/* Header */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            📌 Summary Overview
          </CardTitle>
          <p className="text-white/70 text-sm">
            Quick sentiment breakdown of student feedback
          </p>
        </CardHeader>

        {/* Content */}
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            
            {/* Very Positive */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-white/80 font-medium">
                Very Positive
              </p>
              <p className="text-xl font-bold text-green-300">
                😍 {veryPositivePercent}%
              </p>
            </div>

            {/* Positive */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-white/80">
                Positive
              </p>
              <p className="text-xl font-bold text-green-400">
                😊 {positivePercent}%
              </p>
            </div>

            {/* Neutral */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-white/80">
                Neutral
              </p>
              <p className="text-xl font-bold text-yellow-300">
                😐 {neutralPercent}%
              </p>
            </div>

            {/* Negative */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-white/80">
                Negative
              </p>
              <p className="text-xl font-bold text-orange-300">
                😕 {negativePercent}%
              </p>
            </div>

            {/* Very Negative */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md">
              <p className="text-sm text-white/80">
                Very Negative
              </p>
              <p className="text-xl font-bold text-red-400">
                😡 {veryNegativePercent}%
              </p>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryOverview;
