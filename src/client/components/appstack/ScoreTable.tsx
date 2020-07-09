import React, { useEffect, useState } from 'react';
import { apiService } from '../../utils/api';
import moment from 'moment';

const ScoreTable: React.FC<ScoreTableProps> = ({ userid }) => {

    const [scores, setScores] = useState<Array<TableScore>>([]);

    const getScoreData = async () => {
        try {
            let scores = await apiService(`/api/scores/${userid}`);
            setScores(scores);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getScoreData();
    }, []);

    return (
        <div style={{ lineHeight: '0.2rem' }}>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {/* <th scope="col">#</th> */}
                        <th scope="col" className="pl-0">Course</th>
                        <th scope="col">Score</th>
                        <th scope="col" className="pl-0">Diff.</th>
                        <th scope="col" className="pl-0">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((scoreDTO, index) => (
                        <tr key={`scoretable-${index}`}>
                            {/* <th scope="row">{(index + 1)}</th> */}
                            <td className="align-middle">{scoreDTO.clubname}</td>
                            <td className="align-middle">{scoreDTO.score}</td>
                            <td className="align-middle">{scoreDTO.differential}</td>
                            <td className="align-middle">{moment(scoreDTO._created).utc().format("MMM. D, YYYY")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface ScoreTableProps {
    userid: number;
}

interface TableScore {
    id: number;
    userid: number;
    courseid: number;
    teeName: string;
    teeGender: string;
    score: number;
    differential: number;
    _created: string;
    clubname: string;
}

export default ScoreTable;