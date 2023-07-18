import clientPromise from "../lib/mongodb";
export default function Users({ users }) {
    return (
        <div>
            <h1>Testing User List</h1>
            <ul>
                {users.map((user) => (
                    <li>
                        <h2>{user.first_name} {user.last_name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("myFirstDatabase");

        const users = await db
            .collection("people")
            .find({})
            .sort({ name: -1 })
            .limit(20)
            .toArray();

        return {
            props: {users: JSON.parse(JSON.stringify(users))},
        };
    } catch (e) {
        console.error(e);
    }
}
