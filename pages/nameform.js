import Form from '../components/Form'

const NewPerson = () => {
  const personForm = {
    first_name: '',
    last_name: '',
  }

  return <Form formId="add-person-form" personForm={personForm} />
}

export default NewPerson
