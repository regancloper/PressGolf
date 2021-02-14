import React, { useState } from 'react';

interface PlayerScoreRowProps {
	playerName: string;
	scorecard: number[];
	inputRefs: React.MutableRefObject<HTMLInputElement>[];
	autoTab: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export const PlayerScoreRow: React.FC<PlayerScoreRowProps> = ({
	playerName,
	scorecard,
	inputRefs,
	autoTab,
}) => {
	const [frontNineTotal, setFrontNineTotal] = useState<number>(0);
	const [backNineTotal, setBackNineTotal] = useState<number>(0);
	const [score, setScore] = useState<number>(0);

	const updateScorecard = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		scorecard[index] = Number(e.target.value);
		if (index < 9) {
			let newNineTotal = scorecard.slice(0, 9).reduce((acc, cur) => acc + cur);
			setFrontNineTotal(newNineTotal);
			setScore(backNineTotal + newNineTotal);
		} else {
			let newNineTotal = scorecard.slice(9).reduce((acc, cur) => acc + cur);
			setBackNineTotal(newNineTotal);
			setScore(frontNineTotal + newNineTotal);
		}
		autoTab(e, index);
	};

	return (
		<tr>
			<th scope="row" className="align-middle">
				{playerName}
			</th>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[0]}
					onChange={e => updateScorecard(e, 0)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[1]}
					onChange={e => updateScorecard(e, 1)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[2]}
					onChange={e => updateScorecard(e, 2)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[3]}
					onChange={e => updateScorecard(e, 3)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[4]}
					onChange={e => updateScorecard(e, 4)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[5]}
					onChange={e => updateScorecard(e, 5)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[6]}
					onChange={e => updateScorecard(e, 6)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[7]}
					onChange={e => updateScorecard(e, 7)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[8]}
					onChange={e => updateScorecard(e, 8)}
				/>
			</td>
			<td className="align-middle text-center">{frontNineTotal}</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[9]}
					onChange={e => updateScorecard(e, 9)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[10]}
					onChange={e => updateScorecard(e, 10)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[11]}
					onChange={e => updateScorecard(e, 11)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[12]}
					onChange={e => updateScorecard(e, 12)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[13]}
					onChange={e => updateScorecard(e, 13)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[14]}
					onChange={e => updateScorecard(e, 14)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[15]}
					onChange={e => updateScorecard(e, 15)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[16]}
					onChange={e => updateScorecard(e, 16)}
				/>
			</td>
			<td className="align-middle text-center">
				<input
					type="number"
					ref={inputRefs[17]}
					onChange={e => updateScorecard(e, 17)}
				/>
			</td>
			<td className="align-middle text-center">{backNineTotal}</td>
			<td className="align-middle text-center">{score}</td>
		</tr>
	);
};
