// src/components/ContactForm/ContactForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from '../AppRedux/slice';

const ContactForm = ({ contacts, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (isDuplicate) {
      alert(`${name} is already in the contacts.`);
      return;
    }
    if (!number.trim()) {
      alert('Please enter a valid phone number.');
      return;
    }

    dispatch(addContact({ id: new Date().getTime().toString(), name, number }));

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ marginBottom: '10px', textAlign: 'left' }}>
          Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
      </div>
      <div>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
