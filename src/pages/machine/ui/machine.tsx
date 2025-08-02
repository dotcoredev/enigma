import {
	Button,
	Flex,
	Form,
	Input,
	message,
	Space,
	Typography,
	type FormProps,
} from "antd";
import { Enigma } from "../../../features/enigma";
import styles from "../styles/machine.module.scss";
import { useState } from "react";

interface FieldType {
	key_1: string;
	key_2: string;
	key_3: string;
}

const pattern = /^(?:[1-9]|1[0-9]|2[0-6])$/;

export const EnigmaMachine = () => {
	const [key, setKey] = useState<number[]>([]);

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		const keys = [values.key_1, values.key_2, values.key_3];
		const key = keys.map((num) => (isNaN(Number(num)) ? 0 : Number(num)));
		if (key.length === 3) {
			setKey(key);
			return;
		}
		return message.error("Ключ должен состоять из 3 цифр");
	};

	return (
		<div className={styles.wrapper}>
			{key.length === 3 ? (
				<Enigma enigmaKey={key} />
			) : (
				<div className={styles.formKey}>
					<Typography.Title level={4}>
						Введите 3-значный ключ
					</Typography.Title>
					<Form
						name="basic"
						onFinish={onFinish}
						autoComplete="off"
						className={styles.form}
						variant="filled"
						size="large"
					>
						<Space>
							<Flex gap={5}>
								<Form.Item
									label={null}
									name="key_1"
									rules={[
										{
											required: true,
											pattern: pattern,
											message: "Введите код",
										},
									]}
									className={styles.item}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label={null}
									name="key_2"
									rules={[
										{
											required: true,
											pattern: pattern,
											message: "Введите код",
										},
									]}
									className={styles.item}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label={null}
									name="key_3"
									rules={[
										{
											required: true,
											pattern: pattern,
											message: "Введите код",
										},
									]}
									className={styles.item}
								>
									<Input />
								</Form.Item>
							</Flex>
						</Space>

						<Form.Item label={null} className={styles.item}>
							<Button
								type="primary"
								htmlType="submit"
								style={{ width: "100%" }}
							>
								Продолжить
							</Button>
						</Form.Item>
					</Form>
				</div>
			)}
		</div>
	);
};
