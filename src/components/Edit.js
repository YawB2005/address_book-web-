import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MyForm from './my_form'; 

const Edit = () => {
    const { id } = useParams(); // Get the document ID from the URL params
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchContact = async () => {
            if (id) {
                try {
                    const contactDocRef = doc(db, 'contacts', id);
                    const docSnap = await getDoc(contactDocRef);

                    if (docSnap.exists()) {
                        const contactData = docSnap.data();
                        setName(contactData.name || '');
                        setPhone(contactData.phone || '');
                    } else {
                        console.error("No such contact found!");
                    }
                } catch (error) {
                    console.error("Error fetching contact:", error);
                }
            }
        };

        fetchContact();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();

        const contactDocRef = doc(db, 'contacts', id); 

        try {
            await updateDoc(contactDocRef, {
                name: name,
                phone: phone,
            });
            alert("Contact updated successfully");
            navigate('/home'); 
        } catch (error) {
            console.log("Error updating contact:", error);
        }
    };

    return ( 
        <MyForm 
            submit={handleEdit} 
            name={name} 
            setName={(e) => setName(e.target.value)} 
            phone={phone} 
            setPhone={(e) => setPhone(e.target.value)} 
            topic="Edit contact here" 
        />
    );
}

export default Edit;
