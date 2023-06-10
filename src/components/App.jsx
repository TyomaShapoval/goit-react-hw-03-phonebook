import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { WrapperContent } from './App.styled';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';


export class App extends Component {
  state = {
    contacts: [
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsLS) {
      this.setState({contacts: contactsLS});
    }
  };

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }  
}


  creatContact = ({ name, number }) => {
        const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      this.state.contacts.find(
        existingContact => existingContact.name === contact.name
      )
    ) {
      Notiflix.Notify.failure(`Contact ${contact.name} is already`);
    } else {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
      Notiflix.Notify.success(
        `Contact ${contact.name} added to  your phonebook`
      );
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;

    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtredContacts;
  };
  hadleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

 

  render() {
    return (
      <WrapperContent>
        <ContactForm creatContact={this.creatContact} />
        <Filter
          value={this.state.filter}
          onChange={this.hadleFilterChange}
        ></Filter>
        <ContactList
          deleteContact={this.deleteContact}
          contacts={this.getFiltredContacts()}
        ></ContactList>
      </WrapperContent>
    );
  }
}