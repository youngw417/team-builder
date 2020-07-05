import React from "react";

function MemberCard(props) {
  return (
    <div classNmae="memberCard">
      <div classNmae="member">
        <h2>Member Name: {props.member.name}</h2>
        <p>Member id: {props.member.id}</p>
        <p>Member email: {props.member.email}</p>
        <p>Member role: {props.member.role}</p>
      </div>
    </div>
  );
}

export default MemberCard;
