"use client"

import { ComboChart } from "@/components/ComboChart"
import { Card, CardTitle } from "@/components/ui/card"

const chartdata = [
  {
    hour: "00:00",
    Requests: 245,
    TPM: 4.1,
  },
  {
    hour: "01:00",
    Requests: 210,
    TPM: 3.5,
  },
  {
    hour: "02:00",
    Requests: 182,
    TPM: 3.0,
  },
  {
    hour: "03:00",
    Requests: 156,
    TPM: 2.6,
  },
  {
    hour: "04:00",
    Requests: 128,
    TPM: 2.1,
  },
  {
    hour: "05:00",
    Requests: 142,
    TPM: 2.4,
  },
  {
    hour: "06:00",
    Requests: 156,
    TPM: 2.6,
  },
  {
    hour: "07:00",
    Requests: 312,
    TPM: 5.2,
  },
  {
    hour: "08:00",
    Requests: 468,
    TPM: 7.8,
  },
  {
    hour: "09:00",
    Requests: 680,
    TPM: 11.3,
  },
  {
    hour: "10:00",
    Requests: 892,
    TPM: 14.9,
  },
  {
    hour: "11:00",
    Requests: 824,
    TPM: 13.7,
  },
  {
    hour: "12:00",
    Requests: 756,
    TPM: 12.6,
  },
  {
    hour: "13:00",
    Requests: 800,
    TPM: 13.3,
  },
  {
    hour: "14:00",
    Requests: 845,
    TPM: 14.1,
  },
  {
    hour: "15:00",
    Requests: 762,
    TPM: 12.7,
  },
  {
    hour: "16:00",
    Requests: 678,
    TPM: 11.3,
  },
  {
    hour: "17:00",
    Requests: 606,
    TPM: 10.1,
  },
  {
    hour: "18:00",
    Requests: 534,
    TPM: 8.9,
  },
  {
    hour: "19:00",
    Requests: 462,
    TPM: 7.7,
  },
  {
    hour: "20:00",
    Requests: 389,
    TPM: 6.5,
  },
  {
    hour: "21:00",
    Requests: 344,
    TPM: 5.7,
  },
  {
    hour: "22:00",
    Requests: 298,
    TPM: 5.0,
  },
  {
    hour: "23:00",
    Requests: 272,
    TPM: 4.5,
  },
]

export const CostChart = () => (
  <Card className="p-4">
    <CardTitle className="font-medium">
      <h1 className="text-lg">Transações</h1>
    </CardTitle>
    <ComboChart
      data={chartdata}
      index="hour"
      enableBiaxial={true}
      barSeries={{
        categories: ["Requests"],
        yAxisLabel: "Total de Requisições",
        colors: ["emerald"],
      }}
      lineSeries={{
        categories: ["TPM"],
        showYAxis: true,
        yAxisLabel: "Transações por Minuto",
        colors: ["lime"],
        yAxisWidth: 80,
      }}
    />
  </Card>
)