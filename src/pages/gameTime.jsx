import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './style.css'

const GameTime = () => {
  //Gráfica semanal
  const weeklyOption = {
    title: {
      text: 'Tiempo de Juego Semanal',
      left: 'center',
      textStyle: {
        color: '#4715e2',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    
      nameTextStyle: {
        color: '#5b5e76',
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
      },
      axisLabel: {
        color: '#5b5e76',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Horas Jugadas',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
      },
      axisLabel: {
        color: '#5b5e76',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    series: [
      {
        data: [1, 2, 5, 5, 2, 1, 3],
        type: 'bar',
        itemStyle: {
          color: '#ffc243',
          barBorderRadius: [15, 15, 0, 0],
        },
        barCategoryGap: '10%',
      },
    ],
  };

  //Gráfica Nivel de convivencia
  const coexistenceOption = {
    title: {
      text: 'Nivel de Convivencia',
      left: 'center',
      textStyle: {
        color: '#4715e2',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    
      nameTextStyle: {
        color: '#5b5e76',
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
      },
      axisLabel: {
        color: '#5b5e76',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    yAxis: {
      type: 'value',
      name: 'Convivencia',
      nameTextStyle: {
        color: '#4715e2',
        fontSize: 14,
        fontFamily: 'Poppins, sans-serif',
      },
      axisLabel: {
        color: '#5b5e76',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    series: [
      {
        data: [1, 2, 2, 5, 2, 1, 5],
        type: 'bar',
        itemStyle: {
          color: '#4715e2',
          barBorderRadius: [15, 15, 0, 0],
        },
        barCategoryGap: '10%',
      },
    ],
  };

  useEffect(() => {
    //Gráfica semanal
    const weeklyChartDom = document.getElementById('weekly-chart');
    const weeklyChart = echarts.init(weeklyChartDom);
    weeklyChart.setOption(weeklyOption);

    //Gráfica Convivencia
    const coexistenceChartDom = document.getElementById('coexistence-chart');
    const coexistenceChart = echarts.init(coexistenceChartDom);
    coexistenceChart.setOption(coexistenceOption);
  }, []);

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Tiempo de Juego</h1>
      <div id="weekly-chart" style={{ width: '100%', height: 400 }}></div>
      <div id="coexistence-chart" style={{ width: '100%', height: 400, marginTop: '20px' }}></div>
    </div>
  );
};

export default GameTime;
