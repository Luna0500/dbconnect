export default function Form() {
    return (
        <div>
        <form onsubmit="submitForm()">
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" name="first" required />

            <label htmlFor="last">Last Name</label>
            <input type="text" id="last" name="last" required />

            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export async function submitForm() {
    const client = await clientPromise;
    const db = client.db("test_db");
    const collec = db.collection("name");

    const formData = {
        "first": first
    }
    const result = await collec.insertOne(formData);
}
