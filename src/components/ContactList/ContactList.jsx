import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://65a39e1ca54d8e805ed3c648.mockapi.io/api/v1/contacts');
        setContacts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <p>Name: {contact.name}</p>
            <p>Phone: {contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
