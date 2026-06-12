<template>
  <div class="card">
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-sm font-semibold text-gray-200">Analytics Overview</h3>
        <p class="text-xs text-gray-500 mt-0.5">Last 7 days</p>
      </div>
      <div class="flex items-center gap-4 text-xs text-gray-400">
        <span class="flex items-center gap-1.5">
          <span class="w-5 h-0.5 bg-gold inline-block rounded" />
          Views
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-5 h-0.5 bg-blue-400 inline-block rounded" />
          Clicks
        </span>
      </div>
    </div>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" class="max-h-56" />
    <div v-else class="h-40 flex items-center justify-center">
      <div class="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const props = defineProps<{
  labels: string[]
  pageViews: number[]
  clicks: number[]
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Views',
      data: props.pageViews,
      borderColor: '#C9A84C',
      backgroundColor: 'rgba(201,168,76,0.18)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#C9A84C',
      borderWidth: 2,
    },
    {
      label: 'Clicks',
      data: props.clicks,
      borderColor: '#60A5FA',
      backgroundColor: 'rgba(96,165,250,0.06)',
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#60A5FA',
      borderWidth: 2,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: { legend: { display: false }, tooltip: { mode: 'index' as const, intersect: false } },
  scales: {
    x: {
      grid: { color: '#2A2A2A' },
      ticks: { color: '#555', font: { size: 11 } },
    },
    y: {
      grid: { color: '#2A2A2A' },
      ticks: { color: '#555', font: { size: 11 } },
      beginAtZero: true,
    },
  },
}
</script>
