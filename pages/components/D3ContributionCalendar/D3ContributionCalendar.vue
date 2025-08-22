<template>
  <div class="panel">
        <div class="container">
            <div class="calendar-content">
                <div ref="calendarContainer" class="d3-calendar-container"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as d3 from 'd3';

const calendarContainer = ref(null);

onMounted(() => {
  // 配置参数
  const config = {
    cellSize: 16,   // 每个单元格的大小
    cellGap: 2,     // 单元格间距
    title: '贡献日历图',
    margin: { top: 30, right: 20, bottom: 20, left: 30 },
    colors: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
    weekLabels: ['日', '一', '二', '三', '四', '五', '六']
  };

  // 精确计算今天之前的12个月的完整日期范围
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setFullYear(endDate.getFullYear(), endDate.getMonth() - 11, 1); // 从11个月前的1号开始
  startDate.setDate(1); // 确保从月初开始

  // 生成完整的日期数据
  const data = d3.timeDays(startDate, d3.timeMonth.offset(endDate, 1)) // 包含当前月的全部天数
    .map(date => ({
      date: d3.isoFormat(date),
      count: Math.floor(Math.random() * 10)
    }));

  // 计算准确的周数范围（解决年末周数重置问题）
  const getWeekNumber = (date) => {
    // 改用ISO周数计算（每年最多53周，且不会在12月出现0周）
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  // 计算日历宽度（基于实际周数）
  const allWeeks = data.map(d => getWeekNumber(new Date(d.date)));
  const numWeeks = Math.max(...allWeeks) - Math.min(...allWeeks) + 2; // 加2避免右侧截断
  const width = numWeeks * (config.cellSize + config.cellGap) + config.margin.left + config.margin.right;
  const height = 7 * (config.cellSize + config.cellGap) + config.margin.top + config.margin.bottom;

  // 创建SVG容器
  const svg = d3.select(calendarContainer.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${config.margin.left}, ${config.margin.top})`);

  // 添加标题
  svg.append('text')
    .attr('class', 'calendar-title')
    .attr('x', (numWeeks * (config.cellSize + config.cellGap)) / 2)
    .attr('y', -config.margin.top / 2)
    .attr('text-anchor', 'middle')
    .attr('padding', '10px')
    .text(config.title)
    .style('font-size', '16px')
    .style('font-weight', 'bold')
    .style('fill', 'var(--vp-c-text-1)');

  // 颜色比例尺
  const colorScale = d3.scaleThreshold()
    .domain([1, 4, 7, 10])
    .range(config.colors);

  // 绘制贡献格子（使用修复后的周数计算）
  const minWeek = Math.min(...allWeeks);
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'contribution-cell')
    .attr('x', d => (getWeekNumber(new Date(d.date)) - minWeek) * (config.cellSize + config.cellGap))
    .attr('y', d => new Date(d.date).getDay() * (config.cellSize + config.cellGap))
    .attr('width', config.cellSize)
    .attr('height', config.cellSize)
    .attr('fill', d => colorScale(d.count))
    .append('title')
    .text(d => `${d.date} - ${d.count} 次贡献`);

  // 生成完整的12个月标签并精确定位
  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    months.push(month);
  }

  // 计算每个月的第一周和最后一周（用于定位标签）
  const monthWeeks = months.map(month => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    return {
      month,
      firstWeek: getWeekNumber(firstDay),
      lastWeek: getWeekNumber(lastDay)
    };
  });

  // 绘制月份标签
  svg.selectAll('text.month-label')
    .data(monthWeeks)
    .enter()
    .append('text')
    .attr('class', 'month-label')
    .attr('x', d => {
      // 计算月份中间位置（修复跨年周数计算问题）
      let weekOffset;
      if (d.lastWeek < d.firstWeek) {
        // 处理跨年月份（如12月）
        weekOffset = (d.firstWeek + (52 - d.firstWeek + d.lastWeek) / 2) - minWeek;
      } else {
        weekOffset = (d.firstWeek + (d.lastWeek - d.firstWeek) / 2) - minWeek;
      }
      return weekOffset * (config.cellSize + config.cellGap);
    })
    .attr('y', -5)
    .attr('text-anchor', 'middle')
    .text(d => d3.timeFormat('%b')(d.month))
    .style('font-size', '10px')
    .style('fill', 'var(--vp-c-text-3)')
    .style('font-weight', '500');

  // 添加周几标签
  svg.selectAll('text.weekday-label')
    .data(config.weekLabels)
    .enter()
    .append('text')
    .attr('class', 'weekday-label')
    .attr('x', -5)
    .attr('y', (d, i) => i * (config.cellSize + config.cellGap) + config.cellSize / 2)
    .attr('dy', '0.3em')
    .attr('text-anchor', 'end')
    .text(d => d)
    .style('font-size', '10px')
    .style('fill', 'var(--vp-c-text-3)');
});
</script>

<style scoped>
.panel {
    margin: 20px;
}

.container {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    width: 100%;
    min-height: 32px;
    max-width: 1152px;
    margin-left: auto;
    margin-right: auto;
    transition: transform 0.3s;
}
.container:hover {
    transform: translateY(-5px);
}

.d3-calendar-container {
  padding: 10px;
  overflow-x: auto; /* 确保在小屏幕上可横向滚动 */
}

.calendar-content{
    display: flex;
    justify-content: center;
}
</style>
    