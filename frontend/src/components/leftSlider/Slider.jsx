import {useEffect, useState} from "react";
import style from "./Slider.module.css";
import {NavLink} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {MdAdd} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {openHandler} from "../../reduxStore/slice";
import toast from "react-hot-toast";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

function Slider({setOpenWraper, openWraper}) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [receiveData, setReceiveData] = useState();
  const dispatch = useDispatch();
  const recieveIsOpen = useSelector((state) => state.openReducer.isOpen);
  console.log('recieveIsOpen: ', recieveIsOpen);

  const fetchData = async () => {
    try {
      const res = await fetch("https://mern-note-app-backend.vercel.app/api/allGroupsData");
      const data = await res.json();
      setReceiveData(data?.data);
      setShowSkeleton(false);
    } catch (error) {
      toast.error(error.msg);
    }
  };
  useEffect(() => {
    fetchData();
  }, [openWraper]);

  const addNoteHandler = (e) => {
    e.stopPropagation();
    setOpenWraper(true);
  };

  const crossClick = () => {
    dispatch(openHandler(false));
  };

  return (
    <>
    {
      recieveIsOpen &&   <div>
      <div className={style.slider}>
        <div onClick={crossClick} className={style.crossBTN}>
          <RxCross1 />
        </div>
        <div className={style.noteHeaderMain}>
          <NavLink to={"/"} onClick={()=>  dispatch(openHandler(false))} className={style.noteHeader}>
            Pocket Notes
          </NavLink>
        </div>
        <div className={style.nameArea}>
          {showSkeleton ? (
            <SkeletonTheme baseColor="#dcdcdc">
              <Skeleton count={10} height={70} borderRadius={20} />
            </SkeletonTheme>
          ) : (
            receiveData?.map((item, index) => (
              <NavLink onClick={()=> (window.innerWidth < 800) && dispatch(openHandler(false)) } to={`/group/${item.groupName}`} key={index} className={({isActive}) => `${isActive && style.active} ${style.nameBox}`}>
                <div className={style.groupSortName} style={{background: `${item.color}`}}>
                  {item?.groupName
                    .split(" ")
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
                </div>
                <div className={style.groupName}>{item.groupName}</div>
              </NavLink>
            ))
          )}
        </div>
      </div>
      <div onClick={addNoteHandler} className={style.addGroupName}>
        <MdAdd className={style.addNots} />
      </div>
    </div>
    }
    </>
  );
}

export default Slider;
