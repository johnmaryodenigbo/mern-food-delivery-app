import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({ name: "", position: "", level: "" });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();                  // reads :id from the address, if any
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;
    if (!id) return;                           // /create → stay empty
    setIsNew(false);                           // /edit/:id → load that employee
    async function fetchData() {
      const response = await fetch(`/record/${id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const record = await response.json();
      if (!record) { navigate("/"); return; }
      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { name: form.name, position: form.position, level: form.level };
    try {
      let response;
      if (isNew) {
        response = await fetch("/record", {                 // Create
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`/record/${params.id}`, {    // Update
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(person),
        });
      }
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      navigate("/");
    } catch (error) {
      console.error("A problem occurred adding or updating a record: ", error);
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">{isNew ? "Create" : "Update"} Employee Record</h3>
      <form onSubmit={onSubmit} className="border rounded-lg p-4 flex flex-col gap-4 max-w-md">
        <label>Name
          <input className="border rounded w-full p-2" value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })} />
        </label>
        <label>Position
          <input className="border rounded w-full p-2" value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })} />
        </label>
        <fieldset>
          <legend>Level</legend>
          {["Intern", "Junior", "Senior"].map((lvl) => (
            <label key={lvl} className="mr-4">
              <input type="radio" name="level" value={lvl}
                checked={form.level === lvl}
                onChange={(e) => updateForm({ level: e.target.value })} /> {lvl}
            </label>
          ))}
        </fieldset>
        <input type="submit" value="Save Employee Record" className="border rounded p-2 cursor-pointer" />
      </form>
    </>
  );
}
