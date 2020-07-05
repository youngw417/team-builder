import React, {useState} from 'react';
import MemberList from './MemberList';
import MemberForm from './MemberForm';

import './App.css';

function App() {

  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Young Won',
      email: 'youngw417@gmail.com',
      role: 'Web developer'
    }
  ]);

  function addMember(member) {
    setMembers([...members, member]);

  }


  return (
    <div className="App">

      
      <h1>
        My Team Member List
      </h1>

      <MemberForm addMember={addMember} />


      <MemberList members = {members} />
      
      
    </div>
  );
}

export default App;
