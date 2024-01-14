// src/components/App.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, fetchContacts, addContact, deleteContact } from './AppRedux/slice';
import { selectContacts, selectFilter } from '../components/AppRedux/selectors';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      // La încărcarea inițială, nu vrem să facem un apel suplimentar pentru contacte.
      setIsInitialLoad(false);
      return;
    }

    // Facem un apel suplimentar pentru a obține contactele filtrate.
    // Asigură-te că metoda fetchContacts acceptă parametri pentru filtru.
    dispatch(fetchContacts());
  }, [dispatch, filter, isInitialLoad]);

  const addContactHandler = (newContact) => {
    dispatch(addContact(newContact));
  };

  const deleteContactHandler = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.items.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts.items} onAddContact={addContactHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      {contacts.isLoading ? (
        <p>Loading...</p>
      ) : contacts.error ? (
        <p>Error: {contacts.error}</p>
      ) : filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ContactList contacts={filteredContacts} onDelete={deleteContactHandler} />
      )}
    </div>
  );
};

export default App;
