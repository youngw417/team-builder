import React, { useState } from 'react';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(6, "name must be at least 4 characters long.")
      .required("name is Required"),
    email: Yup
      .string()
      .email("Must be a valid email address.")
        .required("Must include email address."),
    password: Yup.string().min(6, "password must be at least 6 characters long.")
        .required("password is required"),
    // passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('required'),
    passwordConfirm: Yup.string(),
    role: Yup
        .string()
    .required('Must be selected'),
      
    toc: Yup
      .boolean()
      .oneOf([true], "You must accept Terms and Conditions")
    //   *** this is for checkbox
});



function MemberForm(props) {

    const [member, setMember] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "", 
        toc: false

    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
        password: "",

        toc: ""
    })

    
    
    


    const validate = (e) => {
        // yup's reach method is for partial validation, only for the field being entered
        // this will create Promises (asynchronous)
        Yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ''
                })

            })
            .catch(err => {
                console.log(err.errors);
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
        })
    }

    const handleChanges = (event) => {
        // when we use eventHandler in react(synthetic eventHander) in 
        // asynchronous way, we need include e.persist()
        event.persist();
        validate(event);
    
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setMember({
            ...member, [event.target.name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (member.password === member.passwordConfirm) {
            props.addMember({
            id: Date.now(),
            name: member.name,
            email: member.email,
            role: member.role
        })
        setMember({
            name: "",
            email: "",
            role: "",
            password: "",
            passwordConfirm: "",
            toc: false
        })
        } 

        
    }

    


    return(
        <form className ="form" onSubmit = {e => handleSubmit(e)} style={{display:'flex', flexDirection: 'column', width: '30%'}}>
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" value={member.name} onChange={e => handleChanges(e)} required />
            </label>
            
            {errors.name.length ? <p className='errors'>{errors.name}</p> : null}
            <label htmlFor="email">
                email
                <input id="email" type ="text" name="email" value={member.email} onChange={e => handleChanges(e)} required />
            </label>
            {errors.email.length ? <p className='errors'>{errors.email}</p> : null}
           
            <label htmlFor="password" style={{marginLeft:'-30px'}}>
                password
                <input id="password" type ="password" name="password" value={member.password} onChange={e => handleChanges(e)} required />
            </label>
            {errors.password.length ? <p className='errors'>{errors.password}</p> : null}
            <label htmlFor="passwordConfirm" style={{marginLeft:'-30px'}}>
                password Confirm
                <input id="passwordConfirm" type ="password" name="passwordConfirm" value={member.passwordConfirm} onChange={e => handleChanges(e)} required />
            </label>
            {member.password !== member.passwordConfirm ? <p className='errors'>Password does not match</p> : null}

            <label htmlFor="role">
                Role
                <select id="role" name="role" onChange={e => handleChanges(e)} value={member.role} required>
                <option></option>
                <option value = "team leader" >Team Leader</option>
                <option value = "admin" >Administrator</option>
                <option value = "subcontractor" >Subcontractor</option>
                <option value = "web developer" selected >Web Developer</option>
            </select>
            </label>
            
            {errors.role.length ? <p className='errors'>{errors.role}</p> : null}
            <label htmlFor="toc">
                Term of Condition
              <input type="checkbox" id="toc" name="toc" checked={member.toc} onChange={handleChanges}/>
                {console.log(member.toc)}
            </label>
           
            <button type ="submit">Submit</button>
 




        </form>



    )



}

export default MemberForm;