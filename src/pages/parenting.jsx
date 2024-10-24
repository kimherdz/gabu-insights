import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const Parenting = () => {
  //comentarios
  const [comments, setComments] = useState([
    { user: 'Coach1', text: 'Buen progreso en habilidades motoras.' },
    { user: 'Coach2', text: 'Debe mejorar la concentración en las tareas.' }
  ]);

  const [newComment, setNewComment] = useState('');

  //gráfica
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
          name: 'Desempeño del Niño',
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
            { value: 1, name: 'Habilidad A' },
            { value: 1, name: 'Habilidad B' },
            { value: 1, name: 'Habilidad C' },
            { value: 1, name: 'Habilidad D' },
            { value: 1, name: 'Habilidad E' }
          ]
        }
      ]
    };
    
    option && myChart.setOption(option);
  }, []);

  //Agregar un comentario
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { user: 'Coach', text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h1>Parenting</h1>
      <div id="chart" style={{ width: 400, height: 400 }}></div>
      
      <h3>Comentarios de los Coaches</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.user}:</strong> {comment.text}
          </li>
        ))}
      </ul>

      {/* Formulario para agregar comentarios */}
      <div>
        <input 
          type="text" 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)} 
          placeholder="Escribe un comentario"
        />
        <button onClick={handleAddComment}>Agregar comentario</button>
      </div>
    </div>
  );
};

export default Parenting;
