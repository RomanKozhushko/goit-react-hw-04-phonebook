import { Component } from 'react';
import { InputForm } from 'components/InputFormAddContacts/InputFormAddContacts';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactsList/ContactsList';
import { PhonebookBox } from 'components/SectionPhoneBook/SectionPhoneBook.styled';
import { InputFormBox } from 'components/InputFormAddContacts/InputFormAddContacts.styled';
import { ContactListBox } from 'components/ContactsList/ContactsList.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }
//Запис в локал сторидж
    componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== this.state) {
      localStorage.setItem("Contacts", JSON.stringify(this.state.contacts))
    }
  }
//Парс з локал сториджа
  componentDidMount() {
    const contactsList = localStorage.getItem("Contacts");
    const parsedContactsList = JSON.parse(contactsList);
    if (parsedContactsList) {
      this.setState({ contacts: parsedContactsList });
    }
  }

  // Підтвердження збереження контакту!
  submitHandle = (data) => {

    //Заборони користувачеві можливість додавати контакти, імена яких вже присутні у телефонній книзі.
    const sameName = this.state.contacts.find(element => (element.name.toLowerCase() === data.name.toLowerCase()));
    // При спробі виконати таку дію виведи alert із попередженням.
    if (sameName)
      return alert(sameName.name + " is already in contacts!");

    //Присвоювання ID та запис у контакти!
    data.id = nanoid();
    this.setState(prev => ({ contacts: [data, ...prev.contacts] }))
  }

  // Пошук необхідного контакту
  filterChange = (event) => {
    event.preventDefault();
    this.setState({ filter: event.currentTarget.value });
  }

  // Видалення раніше збережених контактів
  onDeleted = (id) => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(
        contact => contact.id !== id)
    }))
  }
  
  render() {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => (contact.name.toLowerCase().includes(normalizeFilter)));

    return (
      <PhonebookBox>
        <InputFormBox>
          <h1>Phonebook</h1>
          <InputForm submitHandle={this.submitHandle} />
        </InputFormBox>
        <ContactListBox>
          <h2>Contact List</h2>
          <Filter filter={filter} filterChange={this.filterChange} />
          {contacts.length ?
            <ContactList contacts={filteredContacts} onDelete={this.onDeleted} /> :
            <p>No any contacts</p>}
        </ContactListBox>
      </PhonebookBox>
    );
  };
}