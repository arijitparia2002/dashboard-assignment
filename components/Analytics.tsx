import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { User } from "../types";

interface AnalyticsProps {
  users: User[];
}

const Analytics: React.FC<AnalyticsProps> = ({ users }) => {
  const userChartRef = useRef<HTMLCanvasElement | null>(null);
  const groupChartRef = useRef<HTMLCanvasElement | null>(null);
  const userChartInstanceRef = useRef<Chart<"doughnut", any, string> | null>(
    null
  );
  const groupChartInstanceRef = useRef<Chart<"bar", any, string> | null>(null);

  useEffect(() => {
    if (userChartRef.current && groupChartRef.current) {
      const userCtx = userChartRef.current.getContext("2d");
      const groupCtx = groupChartRef.current.getContext("2d");

      if (userCtx && groupCtx) {
        if (userChartInstanceRef.current) {
          userChartInstanceRef.current.destroy();
        }
        if (groupChartInstanceRef.current) {
          groupChartInstanceRef.current.destroy();
        }

        const activeUsers = users.filter((user) => user.isActive).length;
        const disabledUsers = users.length - activeUsers;

        userChartInstanceRef.current = new Chart(userCtx, {
          type: "doughnut",
          data: {
            labels: ["Active Users", "Disabled Users"],
            datasets: [
              {
                data: [activeUsers, disabledUsers],
                backgroundColor: ["green", "red"],
              },
            ],
          },
        });

        const groupCounts: Record<string, number> = {};
        users.forEach((user) => {
          if (groupCounts[user.group]) {
            groupCounts[user.group]++;
          } else {
            groupCounts[user.group] = 1;
          }
        });

        groupChartInstanceRef.current = new Chart(groupCtx, {
          type: "bar",
          data: {
            labels: Object.keys(groupCounts),
            datasets: [
              {
                label: "User Distribution in Different Groups",
                data: Object.values(groupCounts),
                backgroundColor: "blue",
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1, // Set the desired step size for the Y-axis
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (userChartInstanceRef.current) {
        userChartInstanceRef.current.destroy();
      }
      if (groupChartInstanceRef.current) {
        groupChartInstanceRef.current.destroy();
      }
    };
  }, [users]);

  return (
    <div className="items-center w-full flex justify-center flex-col">
      <div className="mb-4 bg-white w-full py-4 z-10">
        <h3 className="text-blue-600 font-bold text-2xl ml-4">Analytics</h3>
      </div>
      <div className="w-2/5 flex flex-col rounded p-4">
        <div className="">
          <canvas ref={userChartRef}></canvas>
        </div>
        <div className="">
          <canvas ref={groupChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
