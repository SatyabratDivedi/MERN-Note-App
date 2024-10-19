import img from './../../assets/image-removebg-preview 1.png';
import { IoMdLock } from 'react-icons/io';
import { FaBars } from 'react-icons/fa6';
import style from './firstDashboard.module.css';
import { SliderContext } from '../../context/SliderContext';
import { useContext } from 'react';

function NoteArea() {
  const {setCloseSlider} = useContext(SliderContext);
  return (
    <>
        <div className={style.noteAreaMain}>
          <div className={style.barBTN}>
        <FaBars onClick={()=> setCloseSlider(false)} />
      </div>
          <div className={style.noNote}>
            <div className={style.imgArea}>
              <img style={{ width: '100%' }} src={img} alt="Image" />
              <div className={style.noteTXT}>Pocket Notes</div>
              <p className={style.para}>
                Send and receive messages without keeping your phone online. <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
            </div>
            <div className={style.encryptTXT}>
              <IoMdLock /> end-to-end encrypted
            </div>
          </div>
        </div>
    </>
  );
}

export default NoteArea;
