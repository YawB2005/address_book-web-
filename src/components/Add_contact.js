import { useState } from 'react';
import MyForm from './my_form';
import {collection, addDoc} from "firebase/firestore";
import {db, auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
const Add = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate()

    //Add contact funciton
    const addContact = async (e) => {
        e.preventDefault();
        if (user) {
            // Adding contact to database
            try {
                await addDoc(collection(db, "contacts"),  {
                    name: name,
                    phone: phone,
                    userId: user.uid,
                });
                navigate("/home");
                alert("Contact added successfully")
            }catch(error) {
                // Show error if there is one
                console.log("Cannot add contact");
            }
        } 
    }
    
    return ( <MyForm 
            submit={addContact}
            name = {name}
            setName={(e) => setName(e.target.value)}
            phone = {phone}
            setPhone={(e) => setPhone(e.target.value)}
            topic="Add a contact"/> );
}
 
export default Add;