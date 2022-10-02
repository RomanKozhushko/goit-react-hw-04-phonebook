import { useState } from 'react';
import { Formik, Form, } from 'formik';
import { InputItem } from './InputFormAddContacts.styled';
import PropTypes from 'prop-types';


export function InputForm() {
    const { name, number } = useState();
    const onSubmit = (values, action) => {
        this.props.submitHandle(values);
        action.resetForm();
    } 
        return (
            <Formik initialValues={{ name, number }} onSubmit={onSubmit}>
                <Form><label>Name
                <InputItem
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    // value={ name}
                    // onChange={this.onInput}
                /></label>
                <label>Number<InputItem
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    // value={ number}
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
    