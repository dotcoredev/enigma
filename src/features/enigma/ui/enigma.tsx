import { Divider, Flex, Space } from "antd";
import { type FC } from "react";
import { EncodeEnigma } from "../components/encode";
import { DecodeEnigma } from "../components/decode";

export const Enigma: FC<{ enigmaKey: number[] }> = ({ enigmaKey }) => {
	return (
		<Space>
			<Flex vertical gap={20}>
				<EncodeEnigma enigmaKey={enigmaKey} />
				<Divider />
				<DecodeEnigma enigmaKey={enigmaKey} />
			</Flex>
		</Space>
	);
};
