import { Component } from 'react';
import { Form } from './Form/Form';
import Section from './Section/Section';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const contactKey = '';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    if (localStorage.getItem(contactKey)) {
      const savedContacts = JSON.parse(localStorage.getItem(contactKey));
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem(contactKey, JSON.stringify(contacts));
    }
  }

  addUserData = contact => {
    const { contacts } = this.state;
    if (
      contacts.some(
        obj => obj.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`Sorry, ${contact.name} is already in contacts`);
    } else if (contacts.some(obj => obj.number === contact.number)) {
      alert(`Sorry, ${contact.number} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  handlerFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => id !== contact.id),
    });
  };

  render() {
    return (
      <div>
        <Section title="Phonebook">
          <Form addContact={this.addUserData}> </Form>
        </Section>

        <Section title="Contacts">
          <Filter
            filter={this.state.filter}
            handlerFilter={this.handlerFilter}
          />
          <ContactList
            contacts={this.filterContacts()}
            onDelete={this.onDelete}
          />
        </Section>
      </div>
    );
  }
}