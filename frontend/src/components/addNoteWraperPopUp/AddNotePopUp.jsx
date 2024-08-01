import { useEffect, useState } from "react";
import style from "./addNotePopUp.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const colors = [{ color: "#b38bfa" }, { color: "#ff79f2" }, { color: "#43e6fc" }, { color: "#f19576" }, { color: "#0047ff" }, { color: "#6691ff" }];

function AddNoteWraper({ setOpenWraper }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState({ groupName: "", color: "" });

  const changeHandler = (e) => {
    setEdit({
      ...edit,
      groupName: e.target.value,
    });
  };

  const colorClkHandler = (color) => {
    setEdit((prevEdit) => ({ ...prevEdit, color: color }));
  };

  const createHandler = async () => {
    if (edit.groupName === "" && edit.color === "") {
      return toast.error("Please fill the group name and color both", { duration: 1500 });
    } else if (edit.groupName === "") {
      return toast.error("Please fill the group name ", { duration: 1500 });
    } else if (edit.color === "") {
      return toast.error("Please fill the group color", { duration: 1500 });
    }
    const res = await fetch("https://mern-note-app-backend.vercel.app/api/createGroup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    });
    const data = await res.json();
    console.log(data.msg);

    setOpenWraper(false);
    navigate(`/${edit.groupName}`);
  };

  useEffect(() => {
    const windowClickHandler = (e) => {
      if (e.target.className !== style.mainBox) {
        setOpenWraper(false);
      }
    };

    window.addEventListener("click", windowClickHandler);

    return () => {
      window.removeEventListener("click", windowClickHandler);
    };
  }, []);

  const inClickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={style.addNoteWraper}>
        <div onClick={inClickHandler} className={style.mainBox}>
          <div style={{ fontSize: "2.5rem", fontWeight: "500" }}>Create New group</div>
          <label className={style.groupInp}>
            Group Name
            <input onChange={(e) => changeHandler(e)} name='edit' value={edit.groupName} type='text' placeholder='Enter group name' autoFocus />
          </label>
          <div className={style.colorBox}>
            <div>Choose Color</div>
            <div className={style.colorBox}>
              {colors.map((color, index) => (
                <div key={index}>
                  <div onClick={() => colorClkHandler(color.color)} style={{ background: color.color }} className={style.colorCircle}></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={(e) => createHandler(e)}
              style={{ cursor: "pointer", fontSize: "2rem", width: "14rem", background: "#001F8B", color: "white", padding: "7px", border: "none", borderRadius: "9px" }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNoteWraper;
