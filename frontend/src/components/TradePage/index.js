import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import './TradePage.css';
import Footer from '../Footer';

const TradePage = () => {

  return (
    <>
      <div className='below-nav-container'>
        <h1>Trade Page</h1>
        </div>
        <Footer />
    </>
  )
}

export default TradePage;