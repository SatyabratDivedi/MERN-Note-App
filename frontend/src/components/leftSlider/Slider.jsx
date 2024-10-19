import {useContext, useEffect, useState} from "react";
import style from "./Slider.module.css";
import {NavLink} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {MdAdd} from "react-icons/md";
import toast from "react-hot-toast";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {SliderContext} from "../../context/SliderContext";

function Slider({setOpenWraper, openWraper}) {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [receiveData, setReceiveData] = useState();
  const {closeSlider, setCloseSlider} = useContext(SliderContext);

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
    setCloseSlider(true);
  };
  return (
    <>
      {
        <div style={{display: closeSlider ? "none" : "block"}}>
          <div className={style.slider}>
            <div onClick={crossClick} className={style.crossBTN}>
              <RxCross1 />
            </div>
            <div className={style.noteHeaderMain}>
              <NavLink onClick={()=> setCloseSlider(true)} to={"/"} className={style.noteHeader}>
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
                  <NavLink onClick={()=> setCloseSlider(true)} to={`/group/${item.groupName}`} key={index} className={({isActive}) => `${isActive && style.active} ${style.nameBox}`}>
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
