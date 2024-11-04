"use client"

import { BarChart } from "@/components/BarChart"
import { Card, CardTitle } from "@/components/ui/card"

const chartdata = [
    {
        hour: "00:00",
        "4xx": 40,
        "5xx": 22,
    },
    {
        hour: "01:00",
        "4xx": 38,
        "5xx": 16,
    },
    {
        hour: "02:00",
        "4xx": 50,
        "5xx": 12,
    },
    {
        hour: "03:00",
        "4xx": 28,
        "5xx": 10,
    },
    {
        hour: "04:00",
        "4xx": 60,
        "5xx": 12,
    },
    {
        hour: "05:00",
        "4xx": 92,
        "5xx": 32,
    },
    {
        hour: "06:00",
        "4xx": 89,
        "5xx": 48,
    },
    {
        hour: "07:00",
        "4xx": 90,
        "5xx": 51,
    },
    {
        hour: "08:00",
        "4xx": 84,
        "5xx": 44,
    },
    {
        hour: "09:00",
        "4xx": 83,
        "5xx": 47,
    },
    {
        hour: "10:00",
        "4xx": 85,
        "5xx": 46,
    },
    {
        hour: "11:00",
        "4xx": 145,
        "5xx": 98,
    },
    {
        hour: "12:00",
        "4xx": 193,
        "5xx": 155,
    },
    {
        hour: "13:00",
        "4xx": 290,
        "5xx": 258,
    },
    {
        hour: "14:00",
        "4xx": 95,
        "5xx": 54,
    },
    {
        hour: "15:00",
        "4xx": 93,
        "5xx": 63,
    },
    {
        hour: "16:00",
        "4xx": 88,
        "5xx": 38,
    },
    {
        hour: "17:00",
        "4xx": 79,
        "5xx": 45,
    },
    {
        hour: "18:00",
        "4xx": 86,
        "5xx": 31,
    },
    {
        hour: "19:00",
        "4xx": 94,
        "5xx": 52,
    },
    {
        hour: "20:00",
        "4xx": 91,
        "5xx": 43,
    },
    {
        hour: "21:00",
        "4xx": 96,
        "5xx": 35,
    },
    {
        hour: "22:00",
        "4xx": 92,
        "5xx": 49,
    },
    {
        hour: "23:00",
        "4xx": 88,
        "5xx": 53,
    }
]

export const ErrorsChart = () => (
    <Card className="p-4">
        <CardTitle className="font-medium">
            <h1 className="text-lg">Erros em aplicações</h1>
        </CardTitle>
        <BarChart
            data={chartdata}
            index="hour"
            type="stacked"
            categories={["4xx", "5xx"]}
            valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
            }
            onValueChange={(v) => console.log(v)}
            colors={["yellow", "red"]}
        />
    </Card>
)