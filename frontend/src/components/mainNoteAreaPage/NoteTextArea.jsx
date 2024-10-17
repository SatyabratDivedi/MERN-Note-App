import  { useEffect, useState } from "react";
import style from "./noteTextArea.module.css";
import {  useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { openHandler } from "../../reduxStore/slice.js";
import toast from "react-hot-toast";

function NoteTextArea() {
  const dispatch = useDispatch();
  const params = useParams();
  const [edit, setEdit] = useState("");
  const [groupData, setGroupData] = useState();
  const currentGroupData = groupData?.find((item) => item.groupName === params.groupName) || [];
  const editChangeHandler = (e) => {
    setEdit(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("https://mern-note-app-backend.vercel.app/api/allGroupsData");
      const data = await res.json();
      setGroupData(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [params]);

  const savePostHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Saving post...");
    try {
      const res = await fetch("https://mern-note-app-backend.vercel.app/api/savePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postText: edit, groupId: currentGroupData._id }),
      });
      if (res.ok) {
        setEdit("");
        const data = await res.json();
        toast.success(data.msg, { id: toastId });
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg, { id: toastId });
    }
  };

  const oneDataDelete = async (index) => {
    await fetch("https://mern-note-app-backend.vercel.app/api/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: currentGroupData?.posts[index]._id }),
    });

    const updatedData = currentGroupData?.posts?.filter((_, i) => i !== index);
    const updatedGroupData = groupData?.map((item) => {
      if (item.groupName === currentGroupData.groupName) {
        item.posts = updatedData;
      }
      return item;
    });
    setGroupData(updatedGroupData);
  };

  // const groupDelete = (groupName) => () => {
  //   const updatedData = groupData?.filter((item) => item.groupName !== groupName);
  //   setGroupData(updatedData);
  //   dispatch(addData(updatedData));
  //   navigate("/");
  // };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
    return formattedDate.replace(",", " •");
  };

  return (
    <>
      {currentGroupData?.groupName === params.groupName && (
        <div className={style.textAreaContainer}>
          <div className={style.headerArea}>
            <div onClick={() => dispatch(openHandler(true))} className={style.barBTN}>
              <FaBars />
            </div>
            <div className={style.groupSortName} style={{ background: `${currentGroupData?.color}` }}>
              {currentGroupData?.groupName
                .split(" ")
                .map((word) => word[0]?.toUpperCase())
                .join("")}
            </div>
            <div className={style.groupName}>{currentGroupData.groupName}</div>
            {/* <span onClick={groupDelete(currentGroupData?.groupName)} className={style.headerDeleteBotton} style={{ transform: "translateY(1px)" }}>
              <MdDelete />
            </span> */}
          </div>
          <div className={style.textStoreArea}>
            <div className={style.textStoreAreaBoxMain}>
              {currentGroupData?.posts?.map((item, i) => (
                <div key={i} className={style.textStoreAreaBox}>
                  <div>{item?.description}</div>
                  <div className={style.dateArea}>{formatDate(item.createdAt)}</div>
                  <div className={style.deleteArea}>
                    <span onClick={() => oneDataDelete(i)} style={{ transform: "translateY(1px)" }}>
                      <MdDelete />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={savePostHandler} className={style.footerArea}>
            <input onChange={editChangeHandler} type='text' name='edit' value={edit} id='' placeholder='Enter your text here......' />
            <button type="submit" disabled={edit.length === 0} className={style.sentBox}>
              <IoSend style={{ fontSize: "40px", color: edit.length > 0 ? "black" : "gray", cursor: edit.length > 0 ? "pointer" : "not-allowed" }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default NoteTextArea;
