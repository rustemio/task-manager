// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Genel");
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (title.trim() === "") return;
    const newTask = { title, category, completed: false };
    setTasks([...tasks, newTask]);
    setTitle("");
    axios.post("http://localhost:5001/tasks", newTask).catch(err => console.error(err));
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const exportPDF = () => {
    const input = document.getElementById("taskList");
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("gorev-listesi.pdf");
    });
  };

  const formattedDate = time.toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const styles = {
    outerWrapper: {
      minHeight: "100vh",
      backgroundColor: darkMode ? "#121212" : "#e0e0e0",
      transition: "background-color 0.3s",
      padding: 20,
    },
    container: {
      maxWidth: 700,
      margin: "30px auto",
      padding: 20,
      borderRadius: 10,
      backgroundColor: darkMode ? "#1e1e1e" : "#fff",
      color: darkMode ? "#fff" : "#000",
      fontFamily: "sans-serif",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    toggle: {
      cursor: "pointer",
      padding: "5px 10px",
      border: "1px solid",
      borderRadius: 6,
    },
    form: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: 16,
      borderRadius: 4,
      border: "1px solid #ccc",
    },
    select: {
      padding: 10,
      borderRadius: 4,
    },
    addButton: {
      padding: "10px 20px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: 4,
    },
    listItem: {
      backgroundColor: darkMode ? "#333" : "#f4f4f4",
      padding: 10,
      borderRadius: 5,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: "#e53935",
      color: "white",
      border: "none",
      padding: "6px 10px",
      borderRadius: 4,
      cursor: "pointer",
    },
    categoryTag: {
      fontSize: 12,
      marginLeft: 10,
      fontStyle: "italic",
      color: darkMode ? "#ccc" : "#666",
    },
    exportButton: {
      marginTop: 20,
      padding: "10px 20px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
    },
    outerWrapper: {
      minHeight: "100vh",
      backgroundColor: darkMode ? "#121212" : "#e0e0e0",
      backgroundImage: `url(${darkMode ? "/night.jpg" : "/day.jpg"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "background 0.5s ease-in-out, background-color 0.5s ease-in-out",
      padding: 20,
    },
  };

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <strong>{formattedDate}</strong> — Hava: 🌤 22°C (Ankara)
          </div>
          <div style={styles.toggle} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Aydınlık" : "🌙 Karanlık"}
          </div>
        </div>

        <h2>📝 Görev Yönetim Uygulaması</h2>

        <div style={styles.form}>
          <input
            style={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Yeni görev girin"
          />
          <select style={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Genel">Genel</option>
            <option value="İş">İş</option>
            <option value="Okul">Okul</option>
            <option value="Kişisel">Kişisel</option>
          </select>
          <button style={styles.addButton} onClick={addTask}>Ekle</button>
        </div>

        <div id="taskList">
          {tasks.map((task, index) => (
            <div
              key={index}
              style={{
                ...styles.listItem,
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  style={{ marginRight: 10 }}
                />
                {task.title}
                <span style={styles.categoryTag}>[{task.category}]</span>
              </div>
              <button style={styles.deleteButton} onClick={() => deleteTask(index)}>Sil</button>
            </div>
          ))}
        </div>

        <button style={styles.exportButton} onClick={exportPDF}>📥 PDF olarak dışa aktar</button>
      </div>
    </div>
  );
}

export default App;