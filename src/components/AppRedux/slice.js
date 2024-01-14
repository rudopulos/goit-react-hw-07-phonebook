// src/components/AppRedux/slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://65a39e1ca54d8e805ed3c648.mockapi.io/api/v1/';


  export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    try {
      const response = await axios.get(`${baseUrl}/contacts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      console.log('Server response:', error.response); 
      throw error;
    }
  });
  export const addContact = createAsyncThunk('contacts/addContact', async (newContact) => {
    try {
      const response = await axios.post(`${baseUrl}/contacts`, newContact);
      return response.data;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  });

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  try {
    await axios.delete(`${baseUrl}/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
});

const appSlice = createSlice({
  name: 'app',
  initialState: { contacts: { items: [], isLoading: false, error: null }, filter: '' },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = appSlice.actions;

export default appSlice.reducer;
