<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-200">Activity (last 30 days)</h3>
      <div class="flex items-center gap-4 text-xs text-gray-500">
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-gold inline-block" /> Page views</span>
        <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> Clicks</span>
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
      label: 'Page Views',
      data: props.pageViews,
      borderColor: '#C9A84C',
      backgroundColor: 'rgba(201,168,76,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
    {
      label: 'Clicks',
      data: props.clicks,
      borderColor: '#60A5FA',
      backgroundColor: 'rgba(96,165,250,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
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
      ticks: { color: '#666', maxTicksLimit: 8 },
    },
    y: {
      grid: { color: '#2A2A2A' },
      ticks: { color: '#666' },
      beginAtZero: true,
    },
  },
}
</script>
