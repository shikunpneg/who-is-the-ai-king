// assets/charts.js — All chart initialization for the LLM research report
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 2.1: Model Parameter Comparison (log scale bar chart) ---
  var chartParams = echarts.init(document.getElementById('chart-params'), null, { renderer: 'svg' });
  chartParams.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var result = params[0].name + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + ': ' + p.value + ' B<br/>';
        });
        return result;
      }
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['DeepSeek V4-Pro', 'Kimi K2.6', 'GLM-5.2', 'ERNIE 5.0', 'Llama 4 Behemoth', 'Gemma 3 300B', 'Mistral Large 2', 'GPT-5.5（估）'],
      axisLabel: { color: ink, fontSize: 11, rotate: 20 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'log',
      name: '总参数量（B，对数刻度）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '总参数量（B）',
        type: 'bar',
        data: [1600, 1000, 744, 2400, 2000, 300, 123, 100],
        itemStyle: {
          color: accent,
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: '50%',
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 11,
          formatter: function(p) { return p.value + 'B'; }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chartParams.resize(); });

  // --- Chart 3.1: Attention Mechanism Comparison ---
  var chartAttnCompare = echarts.init(document.getElementById('chart-attn-compare'), null, { renderer: 'svg' });
  chartAttnCompare.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + ': ' + p.value + (p.seriesName === 'KV Cache 相对大小' ? '' : '/10') + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['KV Cache 相对大小', '推理速度评分', '模型质量评分'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['MHA', 'MQA', 'GQA', 'MLA'],
      axisLabel: { color: ink, fontSize: 13, fontWeight: 600 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '评分（1-10）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: 'KV Cache 相对大小',
        type: 'bar',
        data: [100, 17, 33, 8],
        itemStyle: { color: '#ef4444', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 11 }
      },
      {
        name: '推理速度评分',
        type: 'bar',
        data: [4, 8, 6.5, 9.5],
        itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 11 }
      },
      {
        name: '模型质量评分',
        type: 'bar',
        data: [9.5, 6.5, 8.5, 9],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 11 }
      }
    ]
  });
  window.addEventListener('resize', function() { chartAttnCompare.resize(); });

  // --- Chart 3.2: Position Encoding Extrapolation Comparison ---
  var chartPosEncoding = echarts.init(document.getElementById('chart-pos-encoding'), null, { renderer: 'svg' });
  chartPosEncoding.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + ': ' + p.value + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['外推能力评分', '计算效率评分', '实现复杂度（反向）'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['Absolute PE', 'Sinusoidal', 'RoPE', 'ALiBi', 'YaRN', 'NoPE'],
      axisLabel: { color: ink, fontSize: 11, rotate: 15 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '评分（1-10）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '外推能力评分',
        type: 'bar',
        data: [2, 5, 7, 9, 10, 3],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 10 }
      },
      {
        name: '计算效率评分',
        type: 'bar',
        data: [8, 10, 9, 10, 9, 10],
        itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 10 }
      },
      {
        name: '实现复杂度（反向）',
        type: 'bar',
        data: [8, 6, 5, 8, 3, 10],
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink, fontSize: 10 }
      }
    ]
  });
  window.addEventListener('resize', function() { chartPosEncoding.resize(); });

  // --- Chart 3.3: Architecture Paradigm Comparison ---
  var chartArchCompare = echarts.init(document.getElementById('chart-arch-compare'), null, { renderer: 'svg' });
  chartArchCompare.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['上下文理解', '生成能力', '训练效率', '推理速度', '多语言支持'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    radar: {
      center: ['50%', '55%'],
      radius: '65%',
      indicator: [
        { name: '上下文理解', max: 10 },
        { name: '生成能力', max: 10 },
        { name: '训练效率', max: 10 },
        { name: '推理速度', max: 10 },
        { name: '多语言支持', max: 10 }
      ],
      axisName: { color: muted, fontSize: 11 },
      splitArea: { areaStyle: { color: ['rgba(37,99,235,0.05)', 'rgba(124,58,237,0.05)'] } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        name: 'Encoder-only（BERT）',
        type: 'radar',
        data: [{ value: [9, 3, 7, 6, 8], name: 'Encoder-only（BERT）' }],
        itemStyle: { color: '#16a34a' },
        areaStyle: { color: 'rgba(22,163,74,0.15)' }
      },
      {
        name: 'Decoder-only（GPT）',
        type: 'radar',
        data: [{ value: [7, 10, 8, 8, 9], name: 'Decoder-only（GPT）' }],
        itemStyle: { color: accent },
        areaStyle: { color: 'rgba(37,99,235,0.15)' }
      },
      {
        name: 'Encoder-Decoder（T5）',
        type: 'radar',
        data: [{ value: [8, 8, 6, 5, 9], name: 'Encoder-Decoder（T5）' }],
        itemStyle: { color: accent2 },
        areaStyle: { color: 'rgba(124,58,237,0.15)' }
      }
    ]
  });
  window.addEventListener('resize', function() { chartArchCompare.resize(); });

  // --- Chart 3.5: Architecture Evolution Timeline ---
  var chartArchEvolution = echarts.init(document.getElementById('chart-arch-evolution'), null, { renderer: 'svg' });
  chartArchEvolution.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['Encoder-only', 'Decoder-only', 'Encoder-Decoder', 'MoE', 'SSM/RNN'],
      textStyle: { color: ink, fontSize: 11 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      axisLabel: { color: muted, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '影响力/采用度',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: 'Encoder-only',
        type: 'line',
        data: [9, 8, 7, 6, 5, 4, 3, 2, 2],
        lineStyle: { color: '#16a34a', width: 2 },
        itemStyle: { color: '#16a34a' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'Decoder-only',
        type: 'line',
        data: [1, 3, 5, 7, 9, 10, 10, 10, 10],
        lineStyle: { color: accent, width: 3 },
        itemStyle: { color: accent },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'Encoder-Decoder',
        type: 'line',
        data: [7, 7, 6, 5, 4, 4, 3, 3, 3],
        lineStyle: { color: '#9333ea', width: 2 },
        itemStyle: { color: '#9333ea' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'MoE',
        type: 'line',
        data: [0, 0, 0, 1, 3, 5, 7, 8, 9],
        lineStyle: { color: '#f59e0b', width: 2 },
        itemStyle: { color: '#f59e0b' },
        symbol: 'diamond',
        symbolSize: 7
      },
      {
        name: 'SSM/RNN',
        type: 'line',
        data: [0, 0, 0, 0, 0, 1, 3, 5, 7],
        lineStyle: { color: '#ec4899', width: 2 },
        itemStyle: { color: '#ec4899' },
        symbol: 'triangle',
        symbolSize: 6
      }
    ]
  });
  window.addEventListener('resize', function() { chartArchEvolution.resize(); });

  // --- Chart 3.6: Attention Mechanism Evolution Timeline ---
  var chartAttnTimeline = echarts.init(document.getElementById('chart-attn-timeline'), null, { renderer: 'svg' });
  chartAttnTimeline.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['MHA', 'MQA', 'GQA', 'MLA'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
      axisLabel: { color: muted, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'value',
      name: '采用度/影响力',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: 'MHA',
        type: 'line',
        data: [10, 10, 9, 8, 7, 5, 3, 2, 1],
        lineStyle: { color: '#6366f1', width: 3 },
        itemStyle: { color: '#6366f1' },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'MQA',
        type: 'line',
        data: [0, 0, 0, 0, 1, 3, 5, 6, 5],
        lineStyle: { color: '#8b5cf6', width: 2 },
        itemStyle: { color: '#8b5cf6' },
        symbol: 'diamond',
        symbolSize: 6
      },
      {
        name: 'GQA',
        type: 'line',
        data: [0, 0, 0, 0, 0, 1, 6, 9, 9],
        lineStyle: { color: accent, width: 3 },
        itemStyle: { color: accent },
        symbol: 'circle',
        symbolSize: 6
      },
      {
        name: 'MLA',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0, 2, 8],
        lineStyle: { color: '#ec4899', width: 3 },
        itemStyle: { color: '#ec4899' },
        symbol: 'triangle',
        symbolSize: 7
      }
    ]
  });
  window.addEventListener('resize', function() { chartAttnTimeline.resize(); });

  // --- Chart 4.1: User Estimation Methods Diagram ---
  var chartEstimation = echarts.init(document.getElementById('chart-estimation-methods'), null, { renderer: 'svg' });
  chartEstimation.setOption({
    title: { show: false },
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [{
      type: 'sankey',
      left: '10%',
      right: '20%',
      top: '5%',
      bottom: '10%',
      nodeWidth: 20,
      nodeGap: 12,
      layoutIterations: 32,
      data: [
        { name: '官方披露', value: 15 },
        { name: 'SimilarWeb', value: 25 },
        { name: 'Sensor Tower', value: 20 },
        { name: 'OpenRouter', value: 18 },
        { name: 'GitHub/HF', value: 12 },
        { name: '云平台流量', value: 10 },
        { name: '用户数估算', value: 100 }
      ],
      links: [
        { source: '官方披露', target: '用户数估算', value: 15 },
        { source: 'SimilarWeb', target: '用户数估算', value: 25 },
        { source: 'Sensor Tower', target: '用户数估算', value: 20 },
        { source: 'OpenRouter', target: '用户数估算', value: 18 },
        { source: 'GitHub/HF', target: '用户数估算', value: 12 },
        { source: '云平台流量', target: '用户数估算', value: 10 }
      ],
      lineStyle: {
        color: 'gradient',
        curveness: 0.5,
        opacity: 0.6
      },
      itemStyle: {
        borderRadius: 4,
        borderColor: rule,
        borderWidth: 1
      },
      label: { color: ink, fontSize: 12 }
    }]
  });
  // --- Chart 3.7: Model Family Parameter Evolution (log scale line chart) ---
  var chartFamilyParams = echarts.init(document.getElementById('chart-family-params'), null, { renderer: 'svg' });
  chartFamilyParams.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          if (p.value !== null) {
            result += p.marker + ' ' + p.seriesName + ': ' + p.value + ' B<br/>';
          }
        });
        return result;
      }
    },
    legend: {
      data: ['GPT', 'Claude', 'Gemini', 'Llama', 'Qwen', 'DeepSeek', 'Mistral', 'Grok'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      axisLabel: { color: ink, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'log',
      name: '总参数量（B，对数刻度）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: 'GPT',
        type: 'line',
        data: [0.117, 1.5, 17.5, 17.5, 17.5, 1800, 2000, 5500, 7600],
        smooth: true,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Claude',
        type: 'line',
        data: [null, null, null, null, null, null, null, null, null],
        smooth: true,
        itemStyle: { color: '#8b5cf6' },
        lineStyle: { width: 2, type: 'dashed' },
        tooltip: { value: '未公开' }
      },
      {
        name: 'Gemini',
        type: 'line',
        data: [null, null, null, null, null, null, null, null, null],
        smooth: true,
        itemStyle: { color: '#f59e0b' },
        lineStyle: { width: 2, type: 'dashed' },
        tooltip: { value: '未公开' }
      },
      {
        name: 'Llama',
        type: 'line',
        data: [null, null, null, null, null, 65, 405, 2000, 2000],
        smooth: true,
        itemStyle: { color: '#3b82f6' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Qwen',
        type: 'line',
        data: [null, null, null, null, null, 14, 72, 235, null],
        smooth: true,
        itemStyle: { color: '#ef4444' },
        lineStyle: { width: 2 }
      },
      {
        name: 'DeepSeek',
        type: 'line',
        data: [null, null, null, null, null, 67, 2360, 6710, 10000],
        smooth: true,
        itemStyle: { color: '#f97316' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Mistral',
        type: 'line',
        data: [null, null, null, null, null, 73, 1230, 1410, null],
        smooth: true,
        itemStyle: { color: '#06b6d4' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Grok',
        type: 'line',
        data: [null, null, null, null, null, 3140, 3140, null, null],
        smooth: true,
        itemStyle: { color: '#ec4899' },
        lineStyle: { width: 2 }
      }
    ]
  });
  window.addEventListener('resize', function() { chartFamilyParams.resize(); });

  // --- Chart 3.8: Model Family Context Window Evolution (log scale line chart) ---
  var chartFamilyContext = echarts.init(document.getElementById('chart-family-context'), null, { renderer: 'svg' });
  chartFamilyContext.setOption({
    title: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
      formatter: function(params) {
        var result = params[0].axisValue + '<br/>';
        params.forEach(function(p) {
          if (p.value !== null) {
            result += p.marker + ' ' + p.seriesName + ': ' + p.value + ' tokens<br/>';
          }
        });
        return result;
      }
    },
    legend: {
      data: ['GPT', 'Claude', 'Gemini', 'Llama', 'Qwen', 'DeepSeek', 'Mistral', 'Grok'],
      textStyle: { color: ink, fontSize: 12 },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
      axisLabel: { color: ink, fontSize: 12 },
      axisLine: { lineStyle: { color: rule } }
    },
    yAxis: {
      type: 'log',
      name: '上下文窗口（tokens，对数刻度）',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: 'GPT',
        type: 'line',
        data: [512, 1024, 2048, 2048, 4096, 8192, 128000, 128000, 256000],
        smooth: true,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Claude',
        type: 'line',
        data: [null, null, null, null, null, 9000, 200000, 1000000, 1000000],
        smooth: true,
        itemStyle: { color: '#8b5cf6' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Gemini',
        type: 'line',
        data: [null, null, null, null, null, 32000, 1000000, 1000000, 1000000],
        smooth: true,
        itemStyle: { color: '#f59e0b' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Llama',
        type: 'line',
        data: [null, null, null, null, null, 2048, 128000, 10000000, 10000000],
        smooth: true,
        itemStyle: { color: '#3b82f6' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Qwen',
        type: 'line',
        data: [null, null, null, null, null, 2048, 32768, 32768, 131072],
        smooth: true,
        itemStyle: { color: '#ef4444' },
        lineStyle: { width: 2 }
      },
      {
        name: 'DeepSeek',
        type: 'line',
        data: [null, null, null, null, null, 4096, 128000, 128000, 256000],
        smooth: true,
        itemStyle: { color: '#f97316' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Mistral',
        type: 'line',
        data: [null, null, null, null, null, 4096, 128000, 128000, 256000],
        smooth: true,
        itemStyle: { color: '#06b6d4' },
        lineStyle: { width: 2 }
      },
      {
        name: 'Grok',
        type: 'line',
        data: [null, null, null, null, null, 8192, 128000, 256000, 512000],
        smooth: true,
        itemStyle: { color: '#ec4899' },
        lineStyle: { width: 2 }
      }
    ]
  });
  window.addEventListener('resize', function() { chartFamilyContext.resize(); });

  window.addEventListener('resize', function() { chartEstimation.resize(); });

  // Resize all charts on window resize
  window.addEventListener('resize', function() {
    chartParams.resize();
    chartAttnCompare.resize();
    chartPosEncoding.resize();
    chartArchCompare.resize();
    chartArchEvolution.resize();
    chartAttnTimeline.resize();
    chartFamilyParams.resize();
    chartFamilyContext.resize();
    chartEstimation.resize();
  });
})();