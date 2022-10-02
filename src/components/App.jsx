import {useState, useEffect} from 'react';
import { InputForm } from 'components/InputFormAddContacts/InputFormAddContacts';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactsList/ContactsList';
import { PhonebookBox } from 'components/SectionPhoneBook/SectionPhoneBook.styled';
import { InputFormBox } from 'components/InputFormAddContacts/InputFormAddContacts.styled';
import { ContactListBox } from 'components/ContactsList/ContactsList.styled';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(() => 
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState("");

//Запис в локал сторидж
    useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
    }, [contacts]);
  
  // Підтвердження збереження контакту!
  const submitHandle = (data) => {
    //Заборони користувачеві можливість додавати контакти, імена яких вже присутні у телефонній книзі.
    const sameName = contacts.find(element => (element.name.toLowerCase() === data.name.toLowerCase()));
    // При спробі виконати таку дію виведи alert із попередженням.
    if (sameName)
      return alert(sameName.name + " is already in contacts!");

    //Присвоювання ID та запис у контакти!
    data.id = nanoid();
    setContacts(contacts => [data, ...contacts])
  }

  // Пошук необхідного контакту
  const filterChange = (event) => {
    event.preventDefault();
    setFilter(event.currentTarget.value);
  }

  // Видалення раніше збережених контактів
  const onDelete = (id) => {
    setContacts(contacts => contacts.filter(
      contact => contact.id !== id))
  }

  const normalizeFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact => (contact.name.toLowerCase().includes(normalizeFilter)));
 
    return (
      <PhonebookBox>
        <InputFormBox>
          <h1>Phonebook</h1>
          <InputForm submitHandle={submitHandle} />
        </InputFormBox>
        <ContactListBox>
          <h2>Contact List</h2>
          <Filter filter={filter} filterChange={filterChange} />
          {contacts.length ?
            <ContactList contacts={filteredContacts} onDelete={onDelete} /> :
            <p>No any contacts</p>}
        </ContactListBox>
      </PhonebookBox>
    );
  };
