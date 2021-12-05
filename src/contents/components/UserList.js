import React from 'react';

import './UserList.css';

import UserCard from './UserCard';
import Card from '../../shared/components/UIElements/Card';

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center-item'>
        <Card className='no_user_card'>
          <p>There are no users yet.</p>
        </Card>
      </div>
    );
  }

  return (
    <ul className='user-list'>
      {/* props.items include all user datas */}
      {props.items.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
