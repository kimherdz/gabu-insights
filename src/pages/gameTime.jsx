import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './style.css';

const GameTime = () => {
  const [hoursData, setHoursData] = useState([]);
  const [coexistenceData, setCoexistenceData] = useState([]);

  // Función para obtener horas de juego
  const fetchHoursData = async () => {
    try {
      const response = await fetch('http://localhost:3001/game/hours');
      const data = await response.json();
      const formattedData = data.map((item) => ({
        date: new Date(item.fecha).toLocaleDateString('en-US', { weekday: 'short' }),
        value: item.horas_juego,
      }));
      setHoursData(formattedData);
    } catch (error) {
      console.error('Error al obtener horas de juego:', error);
    }
  };

  // Función para obtener datos de convivencia
  const fetchCoexistenceData = async () => {
    try {
      const response = await fetch('http://localhost:3001/game/coexistence');
      const data = await response.json();
      const formattedData = data.map((item) => ({
        date: new Date(item.fecha).toLocaleDateString('en-US', { weekday: 'short' }),
        value: item.convivencia,
      }));
      setCoexistenceData(formattedData);
    } catch (error) {
      console.error('Error al obtener datos de convivencia:', error);
    }
  };

  useEffect(() => {
    fetchHoursData();
    fetchCoexistenceData();
  }, []);

  useEffect(() => {
    if (hoursData.length > 0) {
      const weeklyChartDom = document.getElementById('weekly-chart');
      const weeklyChart = echarts.init(weeklyChartDom);

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
          data: hoursData.map((item) => item.date),
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
            data: hoursData.map((item) => item.value),
            type: 'bar',
            itemStyle: {
              color: '#ffc243',
              barBorderRadius: [15, 15, 0, 0],
            },
            barCategoryGap: '10%',
          },
        ],
      };

      weeklyChart.setOption(weeklyOption);
    }
  }, [hoursData]);

  useEffect(() => {
    if (coexistenceData.length > 0) {
      const coexistenceChartDom = document.getElementById('coexistence-chart');
      const coexistenceChart = echarts.init(coexistenceChartDom);

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
          data: coexistenceData.map((item) => item.date),
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
            data: coexistenceData.map((item) => item.value),
            type: 'bar',
            itemStyle: {
              color: '#4715e2',
              barBorderRadius: [15, 15, 0, 0],
            },
            barCategoryGap: '10%',
          },
        ],
      };

      coexistenceChart.setOption(coexistenceOption);
    }
  }, [coexistenceData]);

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Tiempo de Juego</h1>
      <div id="weekly-chart" style={{ width: '100%', height: 400 }}></div>
      <div id="coexistence-chart" style={{ width: '100%', height: 400, marginTop: '20px' }}></div>
    </div>
  );
};

export default GameTime;
