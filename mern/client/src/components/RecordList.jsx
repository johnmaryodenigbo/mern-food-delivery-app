import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Row({ record, deleteRecord }) {
  return (
    <tr className="border-b">
      <td className="p-3">{record.name}</td>
      <td className="p-3">{record.position}</td>
      <td className="p-3">{record.level}</td>
      <td className="p-3 flex gap-2">
        <Link className="border rounded px-3 py-1" to={`/edit/${record._id}`}>Edit</Link>
        <button className="border rounded px-3 py-1" onClick={() => deleteRecord(record._id)}>Delete</button>
      </td>
    </tr>
  );
}

export default function RecordList() {
  const [records, setRecords] = useState([]);              // memory for the list

  useEffect(() => {                                        // runs once on load
    async function getRecords() {
      const response = await fetch(`/record/`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      setRecords(await response.json());                   // React redraws the table
    }
    getRecords();
  }, []);

  async function deleteRecord(id) {
    await fetch(`/record/${id}`, { method: "DELETE" });
    setRecords(records.filter((r) => r._id !== id));       // drop the row from memory
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-3">Name</th><th className="p-3">Position</th>
            <th className="p-3">Level</th><th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <Row key={record._id} record={record} deleteRecord={deleteRecord} />
          ))}
        </tbody>
      </table>
    </>
  );
}