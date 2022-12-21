import React, { useState, useContext } from "react";
import "./hotel.css";
import Navbar from "./../../components/navbar/Navbar";
import Header from "./../../components/header/Header";
import MailList from "./../../components/mailList/MailList";
import Footer from "./../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "./../../hooks/useFetch";
import { SearchContext } from "./../../context/Searchcontext";
import { AuthContext } from "./../../context/Authcontext";
import Reserve from "../../components/reserve/Reserve";
const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(
    `http://localhost:4000/api/hotels/find/${id}`
  );

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 100060 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <i
                  className="fa-solid fa-circle-xmark close"
                  onClick={() => setOpen(false)}
                ></i>
                <i
                  className="fa-solid fa-arrow-left arrow"
                  onClick={() => handleMove("l")}
                ></i>
                <div className="sliderWrapper">
                  <img
                    src={data?.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <i
                  className="fa-solid fa-arrow-right arrow"
                  onClick={() => handleMove("r")}
                ></i>
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now</button>
              <h1 className="hotelTitle">{data?.name}</h1>

              <div className="hotelAddress">
                <i className="fa-solid fa-location-dot"></i>
                <span>{data?.address}</span>
              </div>

              <span className="hotelDistance">
                Excellent location - {data?.distance}m from center
              </span>

              <span className="hotelPriceHighlight">
                Book a stay ${data?.cheapestPrice} at this property and get a
                free airport taxi
              </span>

              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>

              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data?.title}</h1>
                  <p className="hotelDesc">{data?.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
