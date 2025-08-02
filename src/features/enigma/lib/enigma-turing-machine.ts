export class EnigmaTuringMachine {
	private enigmaKey: number[];
	private rotors: string[][]; // Роторы
	private reflector: string[]; // Рефлектор
	private rotorPosition: number[]; // Начальные позиции роторов
	private result: string[];

	constructor(enigmaKey: number[] = [0, 0, 0]) {
		this.enigmaKey = enigmaKey;
		this.result = [];

		// Роторы
		this.rotors = [
			"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
			"EKMFLGDQVZNTOWYHXUSPAIBRCJ".split(""),
			"AJDKSIRUXBLHWTMCQGZNPYFVOE".split(""),
			"BDFHJLCPRTXVZNYEIWGAKMUSQO".split(""),
		];

		// Рефлектор (отражатель)
		this.reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT".split(""); // Reflector B

		// Начальные позиции роторов (ключ шифрования)
		this.rotorPosition = [...this.enigmaKey];
	}

	clear() {
		this.rotorPosition = [...this.enigmaKey];
		this.result = [];
	}

	step(letter: string) {
		this.result = [];
		let char = letter.toUpperCase();

		// === Прямой проход через роторы ===
		for (let i = 1; i < this.rotors.length; i++) {
			const offset = this.rotorPosition[i - 1];
			const index = (this.rotors[0].indexOf(char) + offset) % 26;
			char = this.rotors[i][index];
		}

		// === Проход через отражатель ===
		const reflectorIndex = this.rotors[0].indexOf(char);
		char = this.reflector[reflectorIndex];

		// === Обратный проход через роторы (в обратном порядке) ===
		for (let i = this.rotors.length - 1; i >= 1; i--) {
			const offset = this.rotorPosition[i - 1];
			// Ищем индекс символа в роторе, учитывая смещение
			const indexInRotor = this.rotors[i].indexOf(char);
			// Смещаем индекс в обратную сторону
			const shiftedIndex = (indexInRotor - offset + 26) % 26;
			char = this.rotors[0][shiftedIndex];
		}
		// Добавляем символ в результат
		this.result.push(char);

		// Вращаем роторы
		this.rotorPosition[0]++;
		if (this.rotorPosition[0] >= 26) {
			this.rotorPosition[0] = 0;
			this.rotorPosition[1]++;
			if (this.rotorPosition[1] >= 26) {
				this.rotorPosition[1] = 0;
				this.rotorPosition[2]++;
				if (this.rotorPosition[2] >= 26) {
					this.rotorPosition[2] = 0;
				}
			}
		}

		return this;
	}

	getResult() {
		return this.result.join("");
	}
}
