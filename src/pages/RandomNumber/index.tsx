import { Button, Input, Typography, message } from "antd";
import { useState, useEffect } from "react";

const { Title } = Typography;

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(10);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      message.warning(" Vui lòng nhập một số hợp lệ!");
      return;
    }

    if (num < randomNumber) {
      message.info(" Bạn đoán quá thấp!");
    } else if (num > randomNumber) {
      message.info(" Bạn đoán quá cao!");
    } else {
      message.success(" Chúc mừng! Bạn đã đoán đúng!");
      return;
    }

    setAttempts(attempts - 1);
    if (attempts - 1 === 0) {
      message.error(` Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
    }
    setGuess("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Title level={2}>Random Number</Title>
      <p>Lượt còn lại: {attempts}</p>
      <Input
        size="large"
        placeholder="Nhập số"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        style={{ width: 200, marginBottom: 10 }}
        disabled={attempts === 0}
      />
      <Button
        type="primary"
        onClick={handleGuess}
        disabled={attempts === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default RandomNumber;
