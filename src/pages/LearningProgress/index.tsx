import { useState, useEffect } from "react";

const LearningProgress = () => {
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({ subject: "", date: "", time: "", duration: "", content: "", note: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [monthlyGoal, setMonthlyGoal] = useState(0); 
  const [totalHours, setTotalHours] = useState(0); 

  
  useEffect(() => {
    const storedSchedule = JSON.parse(localStorage.getItem("learningSchedule")) || [];
    const storedGoal = JSON.parse(localStorage.getItem("monthlyGoal")) || 0;
    setSchedule(storedSchedule);
    setMonthlyGoal(storedGoal);
    calculateTotalHours(storedSchedule);
  }, []);

  
  const saveToLocalStorage = (data) => {
    localStorage.setItem("learningSchedule", JSON.stringify(data));
    setSchedule(data);
    calculateTotalHours(data);
  };

  const saveGoalToLocalStorage = (goal) => {
    localStorage.setItem("monthlyGoal", JSON.stringify(goal));
    setMonthlyGoal(goal);
  };

  
  const calculateTotalHours = (data) => {
    const currentMonth = new Date().getMonth() + 1; 
    const hours = data.reduce((total, item) => {
      const itemMonth = new Date(item.date).getMonth() + 1;
      return itemMonth === currentMonth ? total + parseFloat(item.duration || 0) : total;
    }, 0);
    setTotalHours(hours);
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSave = () => {
    if (!formData.subject || !formData.date || !formData.time || !formData.duration) return alert("Nhập đủ thông tin!");

    const updatedSchedule = editIndex !== null
      ? schedule.map((item, i) => (i === editIndex ? formData : item))
      : [...schedule, formData];

    saveToLocalStorage(updatedSchedule);
    setFormData({ subject: "", date: "", time: "", duration: "", content: "", note: "" });
    setEditIndex(null);
  };

  
  const handleDelete = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    saveToLocalStorage(updatedSchedule);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Quản lý tiến độ học tập</h2>

      
      <div style={styles.goalContainer}>
        <h3> Mục tiêu học tập tháng</h3>
        <input
          type="number"
          placeholder="Nhập số giờ mong muốn"
          value={monthlyGoal}
          onChange={(e) => saveGoalToLocalStorage(parseInt(e.target.value) || 0)}
          style={styles.input}
        />
        <p> Đã học: <strong>{totalHours} giờ</strong> /  Mục tiêu: <strong>{monthlyGoal} giờ</strong></p>
        <p style={{ color: totalHours >= monthlyGoal ? "green" : "red", fontWeight: "bold" }}>
          {totalHours >= monthlyGoal ? " Đã đạt mục tiêu!" : " Cố gắng thêm nhé!"}
        </p>
      </div>

      
      <div style={styles.formContainer}>
        <input type="text" name="subject" placeholder="Môn học" value={formData.subject} onChange={handleChange} style={styles.input} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} style={styles.input} />
        <input type="time" name="time" value={formData.time} onChange={handleChange} style={styles.input} />
        <input type="number" name="duration" placeholder="Thời lượng (giờ)" value={formData.duration} onChange={handleChange} style={styles.input} />
        <input type="text" name="content" placeholder="Nội dung" value={formData.content} onChange={handleChange} style={styles.input} />
        <input type="text" name="note" placeholder="Ghi chú" value={formData.note} onChange={handleChange} style={styles.input} />
        <button onClick={handleSave} style={styles.button}>
          {editIndex !== null ? " Cập nhật" : " Thêm"}
        </button>
      </div>

      
      <ul style={styles.scheduleList}>
        {schedule.map((item, index) => (
          <li key={index} style={styles.scheduleItem}>
            <div>
              <strong>{item.subject}</strong> - {item.date} {item.time} ({item.duration} giờ)
              <p><i> {item.content || "Chưa có nội dung"}</i></p>
              <p><i> {item.note || "Không có ghi chú"}</i></p>
            </div>
            <div>
              <button style={styles.editButton} onClick={() => setEditIndex(index)}>✏️</button>
              <button style={styles.deleteButton} onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px",
  },
  goalContainer: {
    background: "#e3f2fd",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
  },
  scheduleList: {
    listStyle: "none",
    padding: "0",
    marginTop: "20px",
  },
  scheduleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ecf0f1",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  editButton: { border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#f39c12" },
  deleteButton: { border: "none", background: "none", fontSize: "18px", cursor: "pointer", color: "#e74c3c" },
};

export default LearningProgress;
