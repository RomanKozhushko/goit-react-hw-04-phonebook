import { ContactItem } from "components/ContactItem/ContactItem";
import PropTypes from 'prop-types';

export function ContactList({ contacts, onDelete }) {

    return (
        <div>
            {contacts.map((contact, idx) => (
                <ContactItem key={contact.id} contact={contact} idx={idx} method={onDelete}/>
            ))}
        </div>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
}