import './ListUser.scss'
import { useState, useEffect } from 'react'

export const ListUser = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://680ef6d867c5abddd1936c54.mockapi.io/api/v1/user")
        .then(response => response.json())
        .then(users => setData(users))
    }, [])
    // console.log(data);

    return (
        <div className="list-user">
          {data.map((user) => (
            <div className="box-user" key={user.id}>
              <img className="image" src={user.avatar} alt={user.name} />
              <p className="name">{user.name}</p>
            </div>
          ))}
        </div>
      );
}