import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import MyForm from './my_form'; // Assuming this is your form component

const Edit = () => {
    const { id } = useParams(); // Get the document ID from the URL params
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    // Fetch the contact data by ID from Firestore when the component mounts
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

    // Handle form submission and update Firestore
    const handleEdit = async (e) => {
        e.preventDefault();

        const contactDocRef = doc(db, 'contacts', id); // Get reference to the specific document

        try {
            await updateDoc(contactDocRef, {
                name: name,
                phone: phone,
            });
            console.log("Contact updated successfully");
            navigate('/home'); // Redirect after successful update
        } catch (error) {
            console.log("Error updating contact:", error);
        }
    };

    return ( 
        <MyForm 
            submit={handleEdit} // Submit function
            name={name} // Pre-filled name
            setName={(e) => setName(e.target.value)} // Update name
            phone={phone} // Pre-filled phone
            setPhone={(e) => setPhone(e.target.value)} // Update phone
            topic="Edit contact here" // Form title or topic
        />
    );
}

export default Edit;
