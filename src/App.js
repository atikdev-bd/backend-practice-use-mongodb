import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  // console.log(users)

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(email, name);
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data]
        setUsers(newUser)
        console.log(data);
      })
      .catch((error) => console.log(error));
    form.reset();
    console.log(name, email);
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button>Add user</button>
      </form>

      <h1>User : {users.length}</h1>

      {users.map((user) => (
        <p key={user.id}>{`Name : ${user.name} / Email : ${user.email}`}</p>
      ))}
    </div>
  );
}

export default App;
