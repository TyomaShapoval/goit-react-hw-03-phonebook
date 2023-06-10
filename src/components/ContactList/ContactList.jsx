import { ContactsList, ListItem, DeleteBtn, Title } from './ContactList.styled';
import PropTypes from 'prop-types';

export default function  ContactList ({ contacts, deleteContact }) {
  return (
    <>
      <Title>Contacts</Title>
      <ContactsList>     
        {contacts.length ?
          contacts.map(({ name, number, id }) => (
            <ListItem key={id}>
              <p>
                {name}: {number}
              </p>
              <DeleteBtn onClick={() => deleteContact(id)} type="button">
                Delete
              </DeleteBtn>
            </ListItem>
          ))
          : <p>
            Not contact              
            </p>}
      </ContactsList>
    </>
  );
};

ContactList.propTypes = {
	contacts:PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
	deleteContact: PropTypes.func.isRequired
}