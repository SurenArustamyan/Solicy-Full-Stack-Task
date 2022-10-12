import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Users({ data }) {
  return (
    <div className="container">
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created On</th>
          <th>Owner</th>
          <th>Action</th>
        </tr>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.createdAt.slice(0,10)}</td>
              <td>{item.owner}</td>
              <td>
                <Link to={`/accounts/${item.id}`} className="my-link">
                  View
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
