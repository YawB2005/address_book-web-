import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import {signOut} from 'firebase/auth'
const Contacts = () => {
    const [contacts, setContacts] = useState([]); // State for storing contacts
    const navigate = useNavigate();

    // Function to fetch contacts from Firestore
    const fetchData = async () => {
        const user = auth.currentUser; // Check the current user
        if (user) {
            const contact_ref = collection(db, "contacts");
            const q = query(contact_ref, where("userId", "==", user.uid));

            try {
                const snap_shot = await getDocs(q); // Fetch contacts
                const contactList = snap_shot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setContacts(contactList); // Set contacts to state
            } catch (error) {
                console.log("Sorry, can't fetch any contacts", error);
            }
        }
    };

    const SignOut = async () => {
      try {
          await signOut(auth);
          console.log("User signed out successfully");
          navigate('/'); // Redirect to login page after signing out
      } catch (error) {
          console.error("Error signing out:", error);
      }
    } ;

    const deleteContact = async (id) => {
      const contact_ref = doc(db, 'contacts', id);
      try {
        await deleteDoc(contact_ref);
        setContacts(contacts.filter(contact => contact.id !== id));
        alert("Contact has been deleted successfully")
      } catch (error) {
        console.log("Erorr")
      }
    }

    // Call fetchData when the component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty array ensures it runs only once on mount

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Welcome to your address book
                    </h1>
                    <Link to="/add">
                        <button className="bg-indigo-600 text-white mx-4 my-3 px-3 py-1 rounded-lg hover:bg-indigo-700">
                            Add contact
                        </button>
                    </Link>
                    <button onClick={() => SignOut()} className="bg-red-200 text-white mx-4 my-3 px-3 py-1 rounded-lg hover:bg-indigo-700">
                            Log Out
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {contacts.length > 0 ? (
                        contacts.map((contact) => (
                            <div key={contact.id} className="p-4 border-b last:border-none flex items-center">

                                <div className="flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {contact.name}
                                    </h2>
                                    <p className="text-gray-500">{contact.phone}</p>
                                </div>
                                <Link to={`/edit/${contact.id}`}>
                                  <button  className="mx-10 text-green-300">
                                      Edit
                                  </button>
                                </Link>
                                <span>
                                    <button onClick={() => deleteContact(contact.id)} className="text-red-500">Delete</button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500">No contacts found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contacts;
