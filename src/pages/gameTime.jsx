import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const GameTime = () => {
  // Opciones de la gráfica semanal
  const weeklyOption = {
    title: {
      text: 'Tiempo de Juego Semanal',
      left: 'center',
      textStyle: {
        color: '#4715e2',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      name: 'Días de la Semana',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
      },
      axisLabel: {
        color: '#333',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Horas Jugadas',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
      },
      axisLabel: {
        color: '#333',
      },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
          color: '#ffc243',
        },
      },
    ],
  };

  // Opciones de la gráfica mensual
  const monthlyOption = {
    title: {
      text: 'Tiempo de Juego Mensual',
      left: 'center',
      textStyle: {
        color: '#4715e2',
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      name: 'Semanas del Mes',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
      },
      axisLabel: {
        color: '#333',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Horas Jugadas',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
      },
      axisLabel: {
        color: '#333',
      },
    },
    series: [
      {
        data: [300, 450, 500, 400],
        type: 'bar',
        itemStyle: {
          color: '#4715e2',
        },
      },
    ],
  };

  useEffect(() => {
    // Inicializar la gráfica semanal
    const weeklyChartDom = document.getElementById('weekly-chart');
    const weeklyChart = echarts.init(weeklyChartDom);
    weeklyChart.setOption(weeklyOption);

    // Inicializar la gráfica mensual
    const monthlyChartDom = document.getElementById('monthly-chart');
    const monthlyChart = echarts.init(monthlyChartDom);
    monthlyChart.setOption(monthlyOption);
  }, []);

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Tiempo de Juego</h1>
      <div id="weekly-chart" style={{ width: '100%', height: 400 }}></div>
      <div id="monthly-chart" style={{ width: '100%', height: 400, marginTop: '20px' }}></div>
    </div>
  );
};

export default GameTime;
