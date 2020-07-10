import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { apiService } from '../../utils/api';
import { AuthContext } from '../providers/AuthProvider';
import { Player } from '../../utils/types';

interface AddFriendProps { }

const AddFriend: React.FC<AddFriendProps> = ({ }) => {
    const history = useHistory();
    const { user } = useContext(AuthContext);

    const [allUsers, setAllUsers] = useState<Player[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<number>(null);

    const getAllUsers = async () => {
        try {
            let allUsers = await apiService<Player[]>(`/api/addfriend/${user.userid}`);
            if (allUsers) setAllUsers(allUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleFriendSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let friendId = Number(e.target.value);
        if (friendId === 0) setSelectedFriend(null);
        else setSelectedFriend(friendId);
    }

    // on form submit, add the userid and friendid to the friends db table 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let user1 = user.userid;
        let user2 = selectedFriend;
        if (user.userid > selectedFriend) {
            user1 = selectedFriend;
            user2 = user.userid;
        }
        // post both friend ids to the friends table
        let result = await apiService('/api/friends', 'POST', {
            user1,
            user2
        });
        if (result) history.replace('/');
    }

    return (
        <div className="container bg-light">

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Friend Name</label>
                    {/* display all users that aren't current user or a friend that already exists */}
                    <select className="form-control" onChange={handleFriendSelect}>
                        <option value='0'>--Select One--</option>
                        {allUsers.map(player => {
                            return (
                                <option key={player.id} value={player.id}>{`${player.firstname} ${player.lastname}`}</option>
                            );
                        })}
                    </select>
                </div>


                <button
                    type="submit"
                    className="btn btn-primary rounded-0"
                    disabled={selectedFriend === null}
                >
                    Add Friend
                </button>


            </form>

        </div>

    );
}

export default AddFriend;