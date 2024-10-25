import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import './style.css'; // Importamos el CSS

const Parenting = () => {
  // Estado para los comentarios
  const [comments, setComments] = useState([
    { user: 'Coach1', text: 'Buen progreso en es motoras.' },
    { user: 'Coach2', text: 'Debe mejorar la concentración en las tareas.' }
  ]);

  // Efecto para inicializar la gráfica
  useEffect(() => {
    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);
    
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Habilidad Adquirida',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 148, name: 'Memoria y Concentración', itemStyle: { color: '#fea55c' } }, 
            { value: 735, name: 'Resolución de Problemas', itemStyle: { color: '#ffc243' } },
            { value: 580, name: 'Toma de Decisiones', itemStyle: { color: '#fed888' } },
            { value: 484, name: 'Trabajo en Equipo', itemStyle: { color: '#4715e2' } },
            { value: 300, name: 'Creatividad', itemStyle: { color: '#533ed8' } },
            { value: 300, name: 'Perseverancia', itemStyle: { color: '#5f66cf' } }
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }, []);

  return (
    <div className="parenting-container">
      <h2 className="center-title">Parenting</h2>

      <div className="content-container">
        {/* Contenedor de la gráfica */}
        <div className="chart-container">
          <h3 className="centered-text">Habilidades Adquiridas</h3>
          <div id="chart" style={{ width: '100%', height: 450 }}></div>
        </div>

        {/* Comentarios */}
        <div className="comments-section">
          <h3 className="centered-text">Coaches Insights</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Parenting;
