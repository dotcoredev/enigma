import { Alert, Input, Typography } from "antd";
import { EnigmaTuringMachine } from "../lib/enigma-turing-machine";
import { useEffect, useRef, useState, type FC } from "react";

export const DecodeEnigma: FC<{ enigmaKey: number[] }> = ({ enigmaKey }) => {
	const enigmaMachine = useRef<EnigmaTuringMachine | null>(null);
	const [decodeText, setDecodeText] = useState<string>("");

	useEffect(() => {
		enigmaMachine.current = new EnigmaTuringMachine(enigmaKey);
	}, [enigmaKey]);

	const decodeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!enigmaMachine.current) return;
		const words = event.target.value;
		const lastChar = words[words.length - 1];
		if (!words) {
			setDecodeText("");
			enigmaMachine.current.clear();
			return;
		}
		const text = enigmaMachine.current.step(lastChar).getResult();
		setDecodeText((prev) => prev + text);
	};
	return (
		<>
			<Typography.Title level={2}>
				Расшифровать сообщение
			</Typography.Title>
			{decodeText && <Alert message={decodeText} type="info" />}
			<Input size="large" onChange={decodeInput} />
		</>
	);
};
