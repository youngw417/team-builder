import React from 'react';
import MemberCard from './MemberCard';

function MemberList(props){



    return(
        <div className = 'memberList'>
           {

            props.members.map(member => (

            <MemberCard key ={member.id} member={member} />
            ))

           } 




        </div>


    );

}

export default MemberList;