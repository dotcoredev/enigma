import { Alert, Input, Typography } from "antd";
import { EnigmaTuringMachine } from "../lib/enigma-turing-machine";
import { useEffect, useRef, useState, type FC } from "react";

export const EncodeEnigma: FC<{ enigmaKey: number[] }> = ({ enigmaKey }) => {
	const enigmaMachine = useRef<EnigmaTuringMachine | null>(null);
	const [encodeText, setEncodeText] = useState<string>("");

	useEffect(() => {
		enigmaMachine.current = new EnigmaTuringMachine(enigmaKey);
	}, [enigmaKey]);

	const encodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!enigmaMachine.current) return;
		const words = event.target.value;
		const lastChar = words[words.length - 1];
		if (!words) {
			setEncodeText("");
			enigmaMachine.current.clear();
			return;
		}
		const text = enigmaMachine.current.step(lastChar).getResult();
		setEncodeText((prev) => prev + text);
	};

	return (
		<>
			<Typography.Title level={2}>
				Закодировать сообщение
			</Typography.Title>
			{encodeText && <Alert message={encodeText} type="error" />}
			<Input size="large" onChange={encodeInput} />
		</>
	);
};
