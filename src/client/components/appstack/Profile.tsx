import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import '../../scss/app';
import { Link } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { Score, Player } from '../../utils/types';
import { AuthContext } from '../providers/AuthProvider';
import Header from '../Header';

interface ProfileProps { }


export const Profile: React.FC<ProfileProps> = ({ }) => {
    const { user } = useContext(AuthContext);

    const [scores, setScores] = useState<Score[]>([]);
    const [player, setPlayer] = useState<Player>({
        firstname: null,
        lastname: null,
        index: null
    });

    const getData = async () => {
        // make api request to server to get user and scores for said user
        try {
            let player = await apiService(`/api/users/${user.userid}`);
            setPlayer(player);
            // let scores = await apiService(`/api/scores/${userid}`);
            // setScores(scores);
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
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 mb-3">
                            <div className="card profile-card shadow-lg" id="index-card">
                                <div className="card-body p-0">
                                    <div id="index-card-top">
                                        <h2 className="card-title my-3">{player.firstname} {player.lastname}</h2>
                                        <p className="card-text my-2">Index: {player.index}</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between" id="index-card-bottom">
                                        <small className="ml-4">Rev. 4-15-20</small>
                                        <Link className="btn-sm btn-primary py-0 mx-4" id="post-btn" to="/post">Post Score</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card profile-card shadow-lg" id="friend-card">
                                <div className="card-body p-0">
                                    <div>
                                        <table className="table table-sm table-light table-striped table-hover" id="table-top">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Friend</th>
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Trending</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Irving Jones</td>
                                                    <td>8.0</td>
                                                    <td>+1.2</td>
                                                </tr>
                                                <tr>
                                                    <td>Greg Pipes</td>
                                                    <td>12.5</td>
                                                    <td>-0.8</td>
                                                </tr>
                                                <tr>
                                                    <td>Tyler Windham</td>
                                                    <td>16.2</td>
                                                    <td>+1.2</td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <Link className="btn-sm btn-success py-0 mx-4" id="add-btn" to="/post">Add Friend</Link>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="shadow-lg score-container">
                                {scores.map(score => (
                                    <Link to="/" key={score.id} className="score shadow">{score.score}</Link>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    );
}

export default Profile;
