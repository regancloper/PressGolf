import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import '../../scss/app';
import { Link } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { PlayerProfile } from '../../utils/types';
import { AuthContext } from '../providers/AuthProvider';
import Header from '../Header';
import ScoreTable from './ScoreTable';
import FriendsTable from './FriendsTable';
import AddFriend from './AddFriend';

interface ProfileProps { }


export const Profile: React.FC<ProfileProps> = ({ }) => {
    const { user } = useContext(AuthContext);

    const [player, setPlayer] = useState<PlayerProfile>({
        firstname: null,
        lastname: null,
        index: null
    });
    const [friends, setFriends] = useState([]);
    const [showFriends, setShowFriends] = useState(true);

    const getData = async () => {
        // make api request to server to get user and scores for said user
        try {
            let player = await apiService<PlayerProfile>(`/api/users/${user.userid}`);
            if (player) setPlayer(player);
            let friends = await apiService(`/api/friends/${user.userid}`);
            if (friends) setFriends(friends);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleAddFriendClick = () => {
        let showFriendTable = !(showFriends);
        setShowFriends(showFriendTable);
    }

    return (
        <>
            <Header color='header-dark' loggedIn={true} />
            <div className="container" id="content-container">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 mt-3">
                            <div className="card profile-card shadow-lg" id="index-card">
                                <div className="card-body p-0">
                                    <div id="index-card-top">
                                        <h2 className="card-title my-3">{player.firstname} {player.lastname}</h2>
                                        <p className="card-text my-2">Index: {player.index || 'NI'}</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between" id="index-card-bottom">
                                        <div className="h-100 w-100 d-flex align-items-stretch">
                                            <Link className="w-50 no-und btn-dark d-flex justify-content-center align-items-center" style={{ borderRadius: '0 0 0 20px' }} to="/setup">Play</Link>
                                            <Link className="w-50 no-und btn-light d-flex justify-content-center align-items-center" style={{ borderRadius: '0 0 20px 0' }} to="/post">Post Score</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 my-3">
                            <div className="card profile-card shadow" id="friend-card">
                                <div className="card-body p-0">
                                    <div className="d-flex align-items-center justify-content-between" id="friend-card-top">
                                        <div className="h-100 w-100 d-flex align-items-stretch">
                                            <button
                                                className="w-50 bg-white text-success border-0 d-flex justify-content-center align-items-center"
                                                style={{ borderRadius: '20px 0 0 0' }}
                                                onClick={handleAddFriendClick}
                                            >
                                                Friends
                                            </button>
                                            <button
                                                className="w-50 btn-success border-0 d-flex justify-content-center align-items-center"
                                                style={{ borderRadius: '0 20px 0 0' }}
                                                onClick={handleAddFriendClick}
                                            >
                                                Add Friend
                                            </button>
                                        </div>
                                    </div>

                                    {(showFriends && <FriendsTable friends={friends} />) || <AddFriend />}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div>
                        <ScoreTable userid={user.userid} />
                    </div>


                </div>
            </div>
        </>


    );
}

export default Profile;
