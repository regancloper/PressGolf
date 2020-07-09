import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import '../../scss/app';
import { Link } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { Score, Player } from '../../utils/types';
import { calculateIndex } from '../../utils/calculations';
import { AuthContext } from '../providers/AuthProvider';
import Header from '../Header';
import ScoreTable from './ScoreTable';

interface ProfileProps { }


export const Profile: React.FC<ProfileProps> = ({ }) => {
    const { user } = useContext(AuthContext);

    // const [scores, setScores] = useState<Score[]>([]);
    const [player, setPlayer] = useState<Player>({
        firstname: null,
        lastname: null,
        index: null
    });
    // const [index, setIndex] = useState<string | number>('NI');

    const getData = async () => {
        // make api request to server to get user and scores for said user
        try {
            let player = await apiService(`/api/users/${user.userid}`);
            setPlayer(player);
            // let scores = await apiService(`/api/scores/${user.userid}`);
            // setScores(scores);
            // const diffArray: number[] = [];
            // scores.forEach((score: Score) => {
            //     diffArray.push(score.differential);
            // });
            // let index = calculateIndex(diffArray);
            // if (typeof index === 'number') index = Math.round(index * 10) / 10;
            // setIndex(index);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" id="content-container">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 mb-3">
                            <div className="card profile-card shadow-lg" id="index-card">
                                <div className="card-body p-0">
                                    <div id="index-card-top">
                                        <h2 className="card-title my-3">{player.firstname} {player.lastname}</h2>
                                        <p className="card-text my-2">Index: 5.1</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between" id="index-card-bottom">
                                        <div className="h-100 w-100 d-flex align-items-stretch">
                                            <Link className="w-50 btn-sm btn-info d-flex justify-content-center align-items-center" style={{ borderRadius: '0 0 0 20px' }} to="/setup">Play</Link>
                                            <Link className="w-50 btn-sm btn-primary d-flex justify-content-center align-items-center" style={{ borderRadius: '0 0 20px 0' }} to="/post">Post Score</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card profile-card shadow-lg" id="friend-card">
                                <div className="card-body p-0 d-flex justify-content-center align-items-center">
                                    <div>
                                        Add Friend
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <ScoreTable userid={user.userid} />
                    </div>


                    {/* <div className="row my-3">
                        <div className="col">
                            <div className="score-container">
                                {scores.map(score => (
                                    <div key={score.id} className="score shadow">{score.score}</div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </>


    );
}

export default Profile;
