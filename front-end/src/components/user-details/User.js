import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./style.css";


export default function User() {
    const [state, setState] = useState({});
    const [createdTime,setCreatedTime] = useState("")
    const [updatedTime, setUpdatedTime] = useState("")
    let { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8008/accounts/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setState(data[0]);
        setCreatedTime(data[0].createdAt.slice(0,10))
        setUpdatedTime(data[0].updatedAt.slice(0,10))
        return data;
      });
  }, [id]);
  
  return (
    <table>
      <tr>
        <td className="title">ID</td>
        <td>{state.id}</td>
      </tr>
      <tr>
        <td className="title">Name</td>
        <td>{state.name}</td>
      </tr>
      <tr>
        <td className="title">Owner</td>
        <td>{state.owner}</td>
      </tr>
      <tr>
        <td className="title">Created On</td>
        <td>{createdTime}</td>
      </tr>
      <tr>
        <td className="title">Updated On</td>
        <td>{updatedTime}</td>
      </tr>
    </table>
  );
}
