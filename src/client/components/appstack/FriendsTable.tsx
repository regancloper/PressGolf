import React from 'react';



const FriendsTable: React.FC<FriendsTableProps> = ({ friends }) => {
    return (
        <div className="container">
            <table className="table bg-white mt-3">
                <thead>
                    <tr>
                        <th scope="col" className="p-0">Golfer</th>
                        <th scope="col" className="p-0">Index</th>
                    </tr>
                </thead>
                <tbody>
                    {friends.map((friend) => (
                        <tr key={`friends-${friend.user1}`}>
                            <td>{friend.firstname} {friend.lastname}</td>
                            <td>{(friend.index || 'NI')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

interface FriendsTableProps {
    friends: Friend[];
}

interface Friend {
    user1: number;
    firstname: string;
    lastname: string;
    index: number
}

export default FriendsTable;