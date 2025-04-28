import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5001/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("API'den görevler çekilemedi:", error));
  }, []);

  const addTask = () => {
    axios.post("http://localhost:5001/tasks", { title })
      .then(() => {
        setTasks([...tasks, { title }]);
        setTitle("");
      })
      .catch(error => console.error("Görev eklenemedi:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Görev Yönetim Uygulaması</h1>
      <input 
        type="text" 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Yeni görev girin"
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Görev Ekle
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;