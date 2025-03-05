import { useState } from "react";
import { Button, Card, Typography, List } from "antd";
import { SmileOutlined, MehOutlined, FrownOutlined, HistoryOutlined } from "@ant-design/icons";
import './index.css'


const { Title, Text } = Typography;

const choices = ["✌️", "✊", "✋"];

const getRandomChoice = () => choices[Math.floor(Math.random() * choices.length)];

const getResult = (player: string, computer: string) => {
    if (player === computer) return { text: " Hòa!", icon: <MehOutlined style={{ color: "gray" }} /> };
    if (
        (player === "Kéo" && computer === "Bao") ||
        (player === "Búa" && computer === "Kéo") ||
        (player === "Bao" && computer === "Búa")
    ) {
        return { text: " Bạn thắng!", icon: <SmileOutlined style={{ color: "green" }} /> };
    }
    return { text: " Bạn thua!", icon: <FrownOutlined style={{ color: "red" }} /> };
};

const GameStart = () => {
    const [playerChoice, setPlayerChoice] = useState<string | null>(null);
    const [computerChoice, setComputerChoice] = useState<string | null>(null);
    const [result, setResult] = useState<{ text: string; icon: JSX.Element } | null>(null);
    const [history, setHistory] = useState<{ player: string; computer: string; result: string }[]>([]);

    const handlePlayerChoice = (choice: string) => {
        const computer = getRandomChoice();
        const gameResult = getResult(choice, computer);

        setPlayerChoice(choice);
        setComputerChoice(computer);
        setResult(gameResult);
        setHistory([{ player: choice, computer, result: gameResult.text }, ...history]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-6 text-white">
            <Title level={2} className="text-white"> Trò chơi Kéo - Búa - Bao</Title>

            
            <div className="flex gap-4 mb-6">
                {choices.map((choice) => (
                    <Button
                        key={choice}
                        onClick={() => handlePlayerChoice(choice)}
                        type="primary"
                        size="large"
                        shape="round"
                        className="bg-blue-500 hover:bg-yellow-400"
                    >
                        {choice}
                    </Button>
                ))}
            </div>

            
            {playerChoice && computerChoice && (
                <Card className="w-80 text-center" hoverable>
                    <Text strong> Bạn chọn:</Text> <Text>{playerChoice}</Text> <br />
                    <Text strong> Máy chọn:</Text> <Text>{computerChoice}</Text> <br />
                    <Title level={4} className="mt-2">
                        {result?.icon} {result?.text}
                    </Title>
                </Card>
            )}

            
            <Title level={3} className="mt-6 text-white">
                <HistoryOutlined /> Lịch sử trận đấu
            </Title>
            <List
                bordered
                className="w-80 history-list bg-white text-black "
                dataSource={history}
                renderItem={(item, index) => (
                    <List.Item>
                        {item.player} vs {item.computer} ➝ {item.result}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default GameStart;
