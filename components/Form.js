import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const Form = ({ formId, personForm, forNewPerson = true }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        first_name: personForm.first_name,
        last_name: personForm.last_name,
    })
    const postData = async (form) => {
        const res = await fetch('/api/people', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(form),
        })

        router.push('/')
    }

    const handleChange = (e) => {
        const target = e.target
        const value = target.value
        const name = target.name
        setForm({
            ...form,
            [name]: value,
        })
    }
    const formValidate = () => {
        let err = {}
        if (!form.first_name) err.first_name = 'First name is required'
        if (!form.last_name) err.last_name = 'Last name is required'
        return err
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewPerson ? postData(form) : putData(form)
        } else {
            setErrors({ errs })
        }
    }

    return (
        <>
            <form id={formId} onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input
                    type="text"
                    maxLength="20"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="last_name">Last Name</label>
                <input
                    type="text"
                    maxLength="20"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </>
    )
}

export default Form