import { useState } from 'react';
import { Formik, Form, } from 'formik';
import { InputItem } from './InputFormAddContacts.styled';
import PropTypes from 'prop-types';


export const InputForm = ({ onSubmit }) => {
    const { name, setName } = useState('');
    const { number, setNumber } = useState('');
    
    const handleChange = (event) => {
        const { name, value } = event.target
        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'number':
                setNumber(value)
                break;
            default:
                return
        }
    };

    const handleSubmit =  (event) => {
        event.preventDefault();
        onSubmit(name, number)
        setName('');
        setNumber('');
  }; 
         return (
            <Formik initialValues={{ name, number }} onSubmit={handleSubmit}>
                <Form><label>Name
                     <InputItem
                    value={name}
                    onChange={handleChange}                    
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                         required
                                                
                    /></label>
                     <label>Number<InputItem
                    value={number}  
                    onChange={handleChange}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                         required
                                           // onChange={this.onInput}
                    /></label>
                    <button type="submit">Add contact</button>
                </Form>
            </Formik>
        );
    }


InputForm.propTypes = {
  submitHandle: PropTypes.func,
}
    