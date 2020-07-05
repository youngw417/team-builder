import React, {useState} from 'react';




function MemberForm(props) {

    const [member, setMember] = useState({
        name: "",
        email: "",
        role: ""
    })

    const handleChanges = (event) => {

        setMember({
            ...member, [event.target.name]:event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addMember({
            id: Date.now(),
            name: member.name,
            email: member.email,
            role: member.role
        })
        setMember({
            name: "",
            email: "",
            role: ""
        })
    }
    return(
        <form className ="form" onSubmit = {handleSubmit} style={{display:'flex', width: '60%'}}>
            <label htmlFor="name">Name</label>
            <input id="name" type ="text" name="name" value={member.name} onChange={handleChanges} required />
            <label htmlFor="email">email</label>
            <input id="email" type ="text" name="email" value={member.email} onChange={handleChanges} required />
            <label htmlFor="role">Role</label>
            <select id="role" name="role" onChange={handleChanges} value={member.role} required>
                <option></option>
                <option value = "team leader" >Team Leader</option>
                <option value = "admin" >Administrator</option>
                <option value = "subcontractor" >Subcontractor</option>
                <option value = "web developer" selected >Web Developer</option>
            </select>

            <button type ="submit">Submit</button>
 




        </form>



    )



}

export default MemberForm;