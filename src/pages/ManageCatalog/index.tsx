import { useState, useEffect } from "react";
import { Button, Input, List, Modal, Typography, message } from "antd";

const { Title } = Typography;

const ManageCatalog = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  
  const saveToLocalStorage = (updatedCategories) => {
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  
  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory) {
      message.warning("Vui lòng nhập tên danh mục!");
      return;
    }
    if (categories.includes(trimmedCategory)) {
      message.error("Danh mục đã tồn tại!");
      return;
    }
    const updatedCategories = [...categories, trimmedCategory];
    saveToLocalStorage(updatedCategories);
    message.success("Thêm danh mục thành công!");
    setNewCategory("");
  };

  
  const handleDeleteCategory = (category) => {
    const updatedCategories = categories.filter((item) => item !== category);
    saveToLocalStorage(updatedCategories);
    message.success("Xóa danh mục thành công!");
  };

  
  const showEditModal = (category) => {
    setEditCategory(category);
    setEditValue(category);
    setIsModalVisible(true);
  };

  
  const handleEditCategory = () => {
    const trimmedEditValue = editValue.trim();
    if (!trimmedEditValue) {
      message.warning("Tên danh mục không được để trống!");
      return;
    }
    if (categories.includes(trimmedEditValue) && trimmedEditValue !== editCategory) {
      message.error("Danh mục đã tồn tại!");
      return;
    }
    const updatedCategories = categories.map((item) => (item === editCategory ? trimmedEditValue : item));
    saveToLocalStorage(updatedCategories);
    message.success("Cập nhật danh mục thành công!");
    setIsModalVisible(false);
    setEditCategory(null);
  };

  return (
    <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      <Title level={3}>Quản lý danh mục môn học</Title>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Input
          placeholder="Nhập danh mục môn học"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onPressEnter={handleAddCategory} // Nhấn Enter để thêm
        />
        <Button type="primary" onClick={handleAddCategory}>
          Thêm
        </Button>
      </div>

      <List
        bordered
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showEditModal(item)}>
                Sửa
              </Button>,
              <Button type="link" danger onClick={() => handleDeleteCategory(item)}>
                Xóa
              </Button>,
            ]}
          >
            {item}
          </List.Item>
        )}
      />

      {/* Modal chỉnh sửa danh mục */}
      <Modal
        title="Chỉnh sửa danh mục"
        open={isModalVisible}
        onOk={handleEditCategory}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onPressEnter={handleEditCategory} 
        />
      </Modal>
    </div>
  );
};

export default ManageCatalog;
