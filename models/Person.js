import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide a first name.'],
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name."],
    },
})

export default mongoose.models.Person || mongoose.model('Person', PersonSchema)