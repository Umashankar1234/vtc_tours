/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useContext } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import ReactPannellum, { getConfig } from "react-pannellum";
import { APIURL, APIPath, HomePageUrl } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../CommonMethods/Authentication";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Parllel from "../images/pause-btn-parallax.png";
import playbtn from "../images/playbtn-parallax.png";
import playicon from "../images/playicon.png";
import banner1 from "../images/banner1.jpg";
import zoomIcon from "../images/zoomicon.png";
import headerLogo from "../images/header-logo.jpg";
import zoom from "../images/zoom1.png";
import vtcLogo from "../images/VTC-logo.png";
import patternbg1 from "../images/patternbg1.jpg";
import title1 from "../images/title1.png";
import title2 from "../images/title2.png";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import ReactImageZoom from "react-image-zoom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { useRef } from "react";
const APIGetUserData = APIURL() + "user-details";

const APIGetTourInfo = APIURL() + "get-Tourinfo";
const APIGetMortgageCalculator = APIURL() + "get-Mortgage-Calculator";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
const APIGetContactAgent = APIURL() + "get-Contact-Agent";
const APIGetScheduleAppointment = APIURL() + "get-scheduleMail";
const options = {
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: false,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 1000,
  nav: true,
  dots: false,
  navText: [
    "<i class='far fa-chevron-left sp'></i>",
    "<i class='far fa-chevron-right sp'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 2,
    },

    1024: {
      items: 3,
    },

    1366: {
      items: 3,
    },
  },
};
const options3 = {
  lazyLoad: true,
  loop: true,
  margin: 20,
  responsiveClass: true,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  autoplay: true,
  autoplayTimeout: 20000,
  autoplayHoverPause: false,
  mouseDrag: true,
  touchDrag: true,
  smartSpeed: 10000,
  nav: true,
  dots: false,
  navText: [
    "<i class='far fa-chevron-left sp'></i>",
    "<i class='far fa-chevron-right sp'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },

    600: {
      items: 1,
    },

    1024: {
      items: 1,
    },

    1366: {
      items: 1,
    },
  },
};

const initialMorgageData = {
  length: "",
  rate: "",
  price: "",
  downpayment: "",
};
export default function Themetemplate1(props) {
  const AgnetID = props.AgentId;
  const threeDs = props.threeDs;
  const documents = props.documents;
  const mls = props.mls;
  const strict = props.strict;
  const ThemeId = props.ThemeId;
  const tourid = props.tourid;
  const agentProfile = props.agentProfile;
  const amenities = props.amenities;
  const music = props.music;
  const tourData = props.tourData;
  const statename = props.statename;
  const category = props.category;
  const panoSetting = props.panoSetting;
  const slideSetting = props.slideSetting;
  const coAgentData = props.coAgentData;

  const features = useRef(null);
  const photos = useRef(null);
  const panorama = useRef(null);
  const videos = useRef(null);
  const location = useRef(null);
  const presentedBy = useRef(null);
  const contact = useRef(null);
  const floorPlans = useRef(null);
  const ThreeD = useRef(null);

  const size = useWindowSize();
  const [mobileClass, setMobileClass] = useState("small-screen");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (size.width <= 768) {
      console.log("Adding mobileClass");
      setMobileClass("small-screen");
      setShow(false);
    } else {
      console.log("removing mobileClass");
      setMobileClass("");
      setShow(true);
    }
  }, [size]);
  useEffect(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSocialIconLink, obj).then((res) => {
      if (res.data[0].response.status === "success") {
        //setIconData(res.data[0].response);
        setFacebookLink(res.data[0].response.data[2].link);
        setTwitterLink(res.data[0].response.data[0].link);
        setYoutubeLink(res.data[0].response.data[1].link);
      }
    });
  }, []);
  const scrollToElement = (e, elementRef) => {
    e.preventDefault();
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // const AgnetID = props.match.params.id;
  // const ThemeId = props.match.params.themeid;
  // const AgnetID = 7686;
  // const ThemeId = 4388002;
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  // const agentId = props.match.params.agentId;
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 500,
      color: "#fff",
    },
  }));
  const { dispatch } = useContext(AuthContext);
  const classes = useStyles();
  // const [coAgentData, setCoAgentData] = useState([]);
  // const [statename, setstatename] = useState(false);

  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openPanoromaModal, setOpenPanoromaModal] = useState(false);
  const [largeWidth, setLargeWidth] = React.useState("lg");
  const [tourDetailsData, setTourDetailsData] = useState({});
  const [openAgentinfo, setopenAgentInfo] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [openHouseModal, setOpenHouseModal] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [openContactinfo, setopenContactInfo] = useState(false);
  const [openAppointment, setopenAppointment] = useState(false);
  const [openMortagage, setOpenMortgage] = useState(false);
  const [amenityData, setAmenityData] = useState({});
  const [openAmenties, setOpenAmenties] = useState(false);
  const [openPropertyInformation, setOpenProertyInfromation] = useState(false);
  const [mortgageData, setMortgageData] = useState({ initialMorgageData });
  const [resultData, setResultData] = useState({});
  const [panoromaData, setPanromaData] = useState([]);
  const [panoUrl, setPanoUrl] = useState("");
  const [openWalkScore, setOpenWalkScore] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [TwitterLink, setTwitterLink] = useState("");
  const [youTubeLink, setYoutubeLink] = useState("");
  const [sendMail, setSendMail] = useState({});
  const [floorPlanData, setFloorPlandata] = useState([]);
  const [open, setOpen] = useState(false);
  // const [agentProfile, setAgentProfile] = useState("");
  // const [amenities, setAmenities] = useState({});
  // const [music, setMusic] = useState("");
  // const [tourData, setTourData] = useState({});
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [mortgageResult, setMortgageResult] = useState({});

  // const [category, setCategory] = useState("");
  // const [panoSetting, setPanoSetting] = useState({});
  // const [slideSetting, setSlideSetting] = useState({});
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: AgnetID,
    };
    postRecord(APIGetUserData, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setCurrentUser(res.data[0].response.data.agent_profile);
        // setAgentProfile(res.data[0].response.data.agent_profile.profile_img);
      }
    });
  }, [AgnetID]);

  // useEffect(() => {
  //   const objusr = {
  //     authenticate_key: "abcd123XYZ",
  //     agentId: AgnetID,
  //     tourid: tourid,
  //   };
  //   postRecord(APIGetTourDetails, objusr).then((res) => {
  //     console.log(res.data[0].response);
  //     if (res.data[0].response.status === "success") {
  //       setAgentProfile(res.data[0].response.agentDetails);
  //       setCoAgentData(res.data[0].response.coAgentData);
  //       setAmenities(res.data[0].response.amenities);
  //       setMusic(res.data[0].response.music);
  //       setstatename(res.data[0].response.state);
  //       setTourData(res.data[0].response.tourdetails);
  //       setCategory(res.data[0].response.category);
  //       setPanoSetting(res.data[0].response.panorama);
  //       setSlideSetting(res.data[0].response.slideshow);
  //     }
  //   });
  // }, [AgnetID, ThemeId]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgnetID,
      tourid: tourid,
    };
    postRecord(APIGetTourInfo, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        //console.log(res.data[0].response.dataDetails)
        setImageData(res.data[0].response.dataDetails.dataProvider);
        setVideoData(res.data[0].response.dataDetails.dataProvider2);
        setPanromaData(res.data[0].response.dataDetails.dataProvider3);
        //console.log(res.data[0].response.dataDetails.dataProvider3);
        setTourDetailsData(res.data[0].response.dataDetails.tourdetails);
        setFloorPlandata(res.data[0].response.dataDetails.dataProvider4);
        // console.log(res.data[0].response.dataDetails.dataProvider4)
      }
    });
  }, [AgnetID, ThemeId]);
  const listItems1 = floorPlanData.map((number) => (
    <li>
      <img src={number.imageurl}></img>
    </li>
  ));
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  // <script type="text/javascript">
  //     $("#cssmenu").menumaker({
  //         title: "",
  //     format: "multitoggle"
  //     });
  // </script>

  function togglePlay() {
    var track = document.getElementById("track2");
    if (track.paused) {
      track.load();
      track.play();
      document.getElementById("button").src = Parllel;
      document
        .querySelectorAll(".bar-c .bar")
        .forEach((n) => n.classList.remove("noAnim"));
    } else {
      track.load();
      track.pause();
      document.getElementById("button").src = playbtn;
      document
        .querySelectorAll(".bar-c .bar")
        .forEach((n) => n.classList.add("noAnim"));
    }
  }
  const onBeforeSlide = (detail) => {
    const { index, prevIndex } = detail;
  };
  const options2 = {
    lazyLoad: true,
    loop: true,
    margin: 20,
    responsiveClass: true,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    autoplay: true,
    autoplayTimeout:
      Object.keys(slideSetting).length > 0
        ? slideSetting.transduration * 1000
        : 3500,
    autoplayHoverPause: false,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    smartSpeed:
      Object.keys(slideSetting).length > 0
        ? slideSetting.transspeed * 1000
        : 2500,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },

      600: {
        items: 1,
      },

      1024: {
        items: 1,
      },

      1366: {
        items: 1,
      },
    },
  };
  const config = {
    type:
      Object.keys(panoSetting).length > 0
        ? panoSetting.panotype
        : "equirectangular",
    hfov: Object.keys(panoSetting).length > 0 ? panoSetting.hfov : 100,
    vaov: Object.keys(panoSetting).length > 0 ? panoSetting.vaov : 180,
    touchPanSpeedCoeffFactor:
      Object.keys(panoSetting).length > 0 ? panoSetting.panospeed : 1,
    maxLevel: Object.keys(panoSetting).length > 0 ? panoSetting.maxzoom : 100,
    showZoomCtrl:
      Object.keys(panoSetting).length > 0 && panoSetting.maxzoom === 1
        ? true
        : false,
    keyboardZoom:
      Object.keys(panoSetting).length > 0 && panoSetting.isKeyboardZoom === 1
        ? true
        : false,
    mouseZoom:
      Object.keys(panoSetting).length > 0 && panoSetting.isMouseZoom === 1
        ? true
        : false,
    autoRotate: -2,
    autoLoad: true,
    width: "60px",
    height: "400px",
    background: "#000000",
  };
  // const click = () => {
  //     console.log(getConfig());
  // }
  const amenityHandleChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setMortgageData({ ...mortgageData, [name]: value });
  };
  const CalculateMortgage = () => {
    mortgageData.authenticate_key = "abcd123XYZ";
    mortgageData.tourId = tourid;
    console.log(mortgageData);
    postRecord(APIGetMortgageCalculator, mortgageData).then((res) => {
      if (res.data[0].response.status === "success") {
        setMortgageResult(res.data[0].response.data);
      } else {
        setMortgageResult({});
      }
    });
  };

  const MortgageCalclulator = () => {
    CalculateMortgage();
  };
  const viewFlyer = () => {
    window.open(HomePageUrl() + "site/flyer/" + tourid, "_blank");
  };

  const setPanoModal = (pano) => {
    setOpenPanoromaModal(true);
    setPanoUrl(pano);
  };
  const ListingPage = () => {
    window.open(APIPath() + "agent-my-listing/" + AgnetID, "_blank");
  };
  // const setVideoModal = (video) => {
  //     setOpenVideoModal(true);
  //     setVideoUrl(video);
  // }
  const AreaSchool = () => {
    window.open(
      "https://nces.ed.gov/globallocator/index.asp?search=1&State=BC&zipcode=&School=1&PrivSchool=1&miles=10&CS=240931FB",
      "_blank"
    );
  };
  const handleSvgLink = () => {
    window.location.href =
      "https://www.walkscore.com/score/dfds?utm_source=walkscore.com&utm_medium=score-badge&utm_campaign=ws_score_widget";
  };
  const ImageModal = (image) => {
    setOpenImageModal(true);
    setImageUrl(image);
  };
  const propsimg = {
    width: 500,
    height: 450,
    zoomPosition: "original",
    zoomWidth: 500,
    zoomStyle: "z-index:9999;",
  };
  const handleInputMailChange = (event) => {
    const { name, value } = event.target;
    setSendMail({ ...sendMail, [name]: value });
  };
  const sendMailAgent = () => {
    setOpen(true);
    sendMail.authenticate_key = "abcd123XYZ";
    sendMail.tourId = tourid;
    sendMail.agentId = AgnetID;
    postRecord(APIGetContactAgent, sendMail).then((res) => {
      if (res.data[0].response.status === "success") {
        setOpen(false);
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(false);
      } else {
        setMessage(res.data[0].response.message);
        setOpen(false);
        setOpenError(true);
        setSync(false);
      }
      setSync(true);
    });
  };
  const amenityHandleDateChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const amenityHandleTImeChange = (event) => {
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const scheduleAppointment = () => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.tourId = tourid;
    setOpen(true);
    postRecord(APIGetScheduleAppointment, amenityData).then((res) => {
      console.log(res);
      if (res.data[0].response.status === "success") {
        setOpen(false);
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(false);
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setSync(false);
      }
      setSync(true);
    });
  };
  // const floors = floorPlanData.map(res => {

  //         <li>

  //         </li>
  // })
  // console.log(floors);
  // const listItems1 = floorPlanData.map((number) => <li>
  //     <img src={number.imageurl}></img>
  // </li>);
  // console.log(listItems1);
  const setVideoModal = (video) => {
    setOpenVideoModal(true);
    setVideoUrl(video);
  };
  const handleWebsite = () => {
    window.open("http://" + agentProfile.company_details.website, "_blank");
  };
  const downloadDoc = (fileLink, name) => {
    const link = document.createElement("a");
    link.href = fileLink;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
  };

  // =============responsive navbar=======================================

  // ====================-----------------------------======================

  return (
    <>
      <div class="leftpan_fix theme-two">
        <img src={headerLogo} alt="" />
        <nav id="cssmenu" className={`head_btm_menu ${mobileClass}`}>
          <div id="menu-button" onClick={() => setShow(!show)}></div>
          <ul style={{ display: show ? "block" : "" }}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#" onClick={(e) => scrollToElement(e, features)}>
                Features
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => scrollToElement(e, photos)}>
                Photos
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => scrollToElement(e, panorama)}>
                Panorama
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => scrollToElement(e, videos)}>
                Videos
              </a>
            </li>
            {!strict && (
              <li>
                <a href="#" onClick={(e) => scrollToElement(e, location)}>
                  Location
                </a>
              </li>
            )}
            <li>
              <a href="#" onClick={(e) => scrollToElement(e, floorPlans)}>
                Floor Plans
              </a>
            </li>
            {!mls && !strict && (
              <li>
                <a href="#" onClick={(e) => scrollToElement(e, presentedBy)}>
                  Presented By
                </a>
              </li>
            )}
            <li>
              <a href="#">Details</a>
              <ul>
                <li>
                  <a
                    href="javascript:void()"
                    onClick={() => setOpenProertyInfromation(true)}
                  >
                    Property Information
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void()"
                    onClick={() => setOpenAmenties(true)}
                  >
                    Amenities
                  </a>
                </li>
                <li>
                  <a href="javascript:void()" onClick={viewFlyer}>
                    Printable Flyer
                  </a>
                </li>
              </ul>
            </li>
            {!mls && !strict && (
              <>
                <li>
                  <a href="#" onClick={(e) => scrollToElement(e, presentedBy)}>
                    Contact
                  </a>
                  <ul>
                    <li>
                      <a
                        href="javascript:void()"
                        onClick={() => setopenAgentInfo(true)}
                      >
                        Agent Info
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void()"
                        onClick={() => setopenAppointment(true)}
                      >
                        Schedule Appointment
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void()" onClick={ListingPage}>
                        My Listings
                      </a>
                    </li>
                    <li>
                      <a href={facebookLink} target="_blank">
                        Facebook Link
                      </a>
                    </li>
                    <li>
                      <a href={TwitterLink} target="_blank">
                        Twitter Link
                      </a>
                    </li>
                    <li>
                      <a href={youTubeLink} target="_blank">
                        Youtube Link
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Tools</a>
                  <ul>
                    <li>
                      <a
                        href="javascript:void()"
                        onClick={() => setOpenMortgage(true)}
                      >
                        {" "}
                        Mortgage Calculator
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void()"
                        onClick={() => setOpenWalkScore(true)}
                      >
                        Walk Score
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void()" onClick={AreaSchool}>
                        Area School
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div class="Music-player-holder">
          <div class="player">
            <img id="button" onClick={togglePlay} src={playbtn} />
            <audio id="track2">
              <source type="audio/mpeg" src={music && music} />
            </audio>
          </div>
          <div class="bar-c">
            <div id="bar-1" class="bar noAnim"></div>
            <div id="bar-2" class="bar noAnim"></div>
            <div id="bar-3" class="bar noAnim"></div>
            <div id="bar-4" class="bar noAnim"></div>
            <div id="bar-5" class="bar noAnim"></div>
            <div id="bar-6" class="bar noAnim"></div>
          </div>
        </div>
      </div>

      <div class="wrapper" id="home">
        <div class="wrapper_inner">
          <div class="content">
            <div class="content_inner">
              <div
                id="carouselExampleIndicators"
                class="carousel slide carousel-fade"
                data-ride="carousel"
              >
                {imageData.length > 0 ? (
                  <OwlCarousel margin={10} {...options2}>
                    {imageData.map((res) => (
                      <div class="carousel-item active">
                        <img src={res.imageurl} />
                        <div class="container">
                          <div class="carousel-caption"></div>
                        </div>
                      </div>
                    ))}
                    {videoData.map((res) => (
                      <div class="carousel-item active">
                        <video
                          src={res.videurl}
                          autoPlay
                          muted
                          // onClick={(e) => e.target.play()}
                        />
                      </div>
                    ))}
                  </OwlCarousel>
                ) : (
                  ""
                )}
              </div>

              <div class="full_width" id="features" ref={features}>
                <div class="full_width_inner">
                  <div class="frontext">
                    <div class="container">
                      <div class="row second_section">
                        <div class="col-md-8 m-auto">
                          <h3>{tourDetailsData.Caption}</h3>
                          <small>
                            {tourData.city}, {statename} {tourData.zipcode}
                          </small>
                          <p>{tourData.description}</p>

                          <a href="#" class="viewflyerbtn">
                            View Flyer
                          </a>
                          <a href="#photos" class="viewflyerbtn white">
                            View All Photos
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="spacer1px" />
                  {!strict && (
                    <div class="property_details" ref={ThreeD}>
                      <div class="property_details_left">
                        <div class="page_title">
                          <h3>Property Details</h3>
                        </div>
                        <div class="row">
                          <div class="col-lg-12 property_details_content">
                            <ul>
                              <li>
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td>
                                      <strong>Price</strong>
                                    </td>
                                    <td>
                                      {" "}
                                      {Object.keys(tourDetailsData).length >
                                        0 && tourDetailsData.Price === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>
                                          {"$ " + tourDetailsData.Price}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <strong>Bed</strong>
                                    </td>
                                    <td>
                                      {" "}
                                      {Object.keys(tourDetailsData).length >
                                        0 && tourDetailsData.Beds === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.Beds}</span>
                                      )}
                                    </td>
                                  </tr>
                                </table>
                              </li>
                              <li>
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td>
                                      <strong>Baths:</strong>
                                    </td>
                                    <td>
                                      {Object.keys(tourDetailsData).length >
                                        0 && tourDetailsData.Baths === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.Baths}</span>
                                      )}
                                    </td>
                                    <td>
                                      <strong>Square Feet :</strong>
                                    </td>
                                    <td>
                                      {Object.keys(tourDetailsData).length >
                                        0 &&
                                      tourDetailsData.InteriorSqFt === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>
                                          {tourDetailsData.InteriorSqFt}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                </table>
                              </li>
                              <li>
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td>
                                      <strong>Garage :</strong>
                                    </td>
                                    <td>
                                      {Object.keys(tourDetailsData).length >
                                        0 && tourDetailsData.Garage === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.Garage}</span>
                                      )}
                                    </td>
                                    <td>
                                      <strong>Year Built :</strong>
                                    </td>
                                    <td>
                                      {" "}
                                      {Object.keys(tourDetailsData).length >
                                        0 &&
                                      tourDetailsData.YearBuilt === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.YearBuilt}</span>
                                      )}
                                    </td>
                                  </tr>
                                </table>
                              </li>
                              <li>
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td>
                                      <strong>Lot Size :</strong>
                                    </td>
                                    <td>
                                      {Object.keys(tourDetailsData).length >
                                        0 &&
                                      tourDetailsData.LotSize === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.LotSize}</span>
                                      )}
                                    </td>
                                    <td>
                                      <strong>School District :</strong>
                                    </td>
                                    <td>
                                      {" "}
                                      {Object.keys(tourDetailsData).length >
                                        0 &&
                                      tourDetailsData.SchoolDistrict ===
                                        null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>
                                          {tourDetailsData.SchoolDistrict}
                                        </span>
                                      )}
                                    </td>
                                  </tr>
                                </table>
                              </li>
                              <li>
                                <table
                                  width="100%"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td>
                                      <strong>MLS# :</strong>
                                    </td>
                                    <td>
                                      {Object.keys(tourDetailsData).length >
                                        0 && tourDetailsData.MLS === null ? (
                                        <span style={{ marginLeft: "10px" }}>
                                          N/A
                                        </span>
                                      ) : (
                                        <span>{tourDetailsData.MLS}</span>
                                      )}
                                    </td>
                                    <td></td>
                                    <td> </td>
                                  </tr>
                                </table>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12 text-center sharethis">
                            <strong>SHARE THIS ON</strong> &nbsp;&nbsp;
                            <FacebookShareButton
                              url={
                                "https://www.virtualtourcafe.com/alpha/tour/theme-template/" +
                                ThemeId +
                                AgnetID
                              }
                            >
                              <i class="fab fa-facebook-f"></i>
                            </FacebookShareButton>
                            <LinkedinShareButton
                              url={
                                "https://www.virtualtourcafe.com/alpha/tour/theme-template/" +
                                ThemeId +
                                AgnetID
                              }
                            >
                              <i class="fab fa-linkedin-in"></i>
                            </LinkedinShareButton>
                            <WhatsappShareButton
                              url={
                                "https://www.virtualtourcafe.com/alpha/tour/theme-template/" +
                                ThemeId +
                                AgnetID
                              }
                            >
                              <i
                                style={{ backgroundColor: "rgb(37, 211, 102)" }}
                                class="fab fa-whatsapp"
                              ></i>
                            </WhatsappShareButton>
                            <TwitterShareButton
                              url={
                                "https://www.virtualtourcafe.com/alpha/tour/theme-template/" +
                                ThemeId +
                                AgnetID
                              }
                            >
                              <i class="fab fa-twitter"></i>
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                      {threeDs?.code1 || threeDs?.code1 ? (
                        <div
                          class="property_details_right"
                          dangerouslySetInnerHTML={{
                            __html: threeDs?.code1
                              ? threeDs?.code1
                              : threeDs?.code2,
                          }}
                        ></div>
                      ) : (
                        <div class="property_details_right">
                          <img
                            src={imageData[0]?.imageurl}
                            alt="first pict"
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {documents && documents.length > 0 ? (
                    <div class="property_location bg-bg">
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title">
                              <h3 class="bg-color">Documents</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          {documents &&
                            documents.length > 0 &&
                            documents.map((res) => (
                              <div class="col-md-4 m-auto">
                                <div class="callbacks_container">
                                  <li>
                                    <div class="gallerybox">
                                      <div class="image-holder video-holder">
                                        <img
                                          src="https://virtualtourcafe.com/images/documents.png?1590647111"
                                          style={{
                                            marginTop: "-18px",
                                            height: "100%",
                                          }}
                                        />

                                        <span class="gallery_title">Doc</span>
                                        <div class="overlay">
                                          <div class="button">
                                            <a
                                              onClick={() =>
                                                downloadDoc(
                                                  res.doc_link,
                                                  res.doc_name
                                                )
                                              }
                                              data-title={res.doc_name}
                                            >
                                              <p>Doc</p>
                                              <img src={zoomIcon} alt="" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer1px" />
                  {/* <!--============= Photo Gallery ================--> */}
                  {imageData.length > 0 ? (
                    <div
                      class="photogallery bg-bg"
                      id="photos"
                      ref={photos}
                      style={{
                        backgroundImage: "url(" + patternbg1 + ")",
                      }}
                    >
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title2">
                              <h3 class="bg-color">Photo Gallery</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <OwlCarousel
                              margin={10}
                              {...options}
                              class="gallery-design1 owl-carousel"
                            >
                              {Object.keys(imageData).length > 0
                                ? imageData.map((res) => (
                                    <li
                                      data-src={res.imageurl}
                                      data-sub-html="<p>trafficreport</p>"
                                    >
                                      <div class="gallerybox">
                                        <div
                                          class="image-holder"
                                          style={{ height: "300px" }}
                                        >
                                          <a href={res.imageurl}>
                                            <img
                                              alt="img1"
                                              src={res.imageurl}
                                            />
                                          </a>
                                          <div
                                            class="overlay"
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <div class="button">
                                              <p>{res.caption}</p>
                                              <a
                                                onClick={() =>
                                                  ImageModal(res.imageurl)
                                                }
                                              >
                                                <img src={zoom} alt="" />
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  ))
                                : ""}
                            </OwlCarousel>
                            <div class="without_slider_gallery">
                              <ul
                                class="photo-lightgallery"
                                id="lightgallery"
                                style={{ marginTop: "20px" }}
                              >
                                <LightGallery
                                  elementClassNames="custom-wrapper-class"
                                  onBeforeSlide={onBeforeSlide}
                                  plugins={[lgZoom, lgVideo]}
                                >
                                  {Object.keys(imageData).length > 0
                                    ? imageData.map((res) => (
                                        <li
                                          data-src={res.imageurl}
                                          data-sub-html="<p>trafficreport</p>"
                                        >
                                          <div class="gallerybox">
                                            <div
                                              class="image-holder"
                                              style={{ height: "250px" }}
                                            >
                                              <a href={res.imageurl}>
                                                <img
                                                  alt="img1"
                                                  src={res.imageurl}
                                                />
                                              </a>
                                              <div class="overlay">
                                                <div class="button">
                                                  <p>{res.caption}</p>
                                                  <a
                                                    onClick={() =>
                                                      ImageModal(res.imageurl)
                                                    }
                                                  >
                                                    <img src={zoom} alt="" />
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </LightGallery>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer1px" />
                  {/* <!--============= Floor Plans Gallery ================--> */}
                  {floorPlanData.length > 0 ? (
                    <div class="photogallery" id="photos" style={{}}>
                      <div class="container" ref={floorPlans}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title2">
                              <h3>Floor Plans</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="floor-pl">
                              <OwlCarousel
                                margin={10}
                                {...options3}
                                class="gallery-design1 owl-carousel"
                              >
                                {Object.keys(floorPlanData).length > 0
                                  ? floorPlanData.map((res) => (
                                      <li
                                        data-src={res.imageurl}
                                        data-sub-html="<p>trafficreport</p>"
                                      >
                                        <div class="gallerybox">
                                          <div
                                            class="image-holder"
                                            style={{ height: "300px" }}
                                          >
                                            <a href={res.imageurl}>
                                              <img
                                                alt="img1"
                                                src={res.imageurl}
                                              />
                                            </a>
                                            <div
                                              class="overlay"
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                              }}
                                            >
                                              <div class="button">
                                                <p>{res.caption}</p>
                                                <a
                                                  onClick={() =>
                                                    ImageModal(res.imageurl)
                                                  }
                                                >
                                                  <img src={zoom} alt="" />
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))
                                  : ""}
                              </OwlCarousel>
                            </div>
                            <div class="without_slider_gallery">
                              <ul
                                class="photo-lightgallery"
                                id="lightgallery"
                                style={{ marginTop: "20px" }}
                              >
                                <LightGallery
                                  elementClassNames="custom-wrapper-class"
                                  onBeforeSlide={onBeforeSlide}
                                  plugins={[lgZoom, lgVideo]}
                                >
                                  {Object.keys(floorPlanData).length > 0
                                    ? floorPlanData.map((res) => (
                                        <li
                                          data-src={res.imageurl}
                                          data-sub-html="<p>trafficreport</p>"
                                        >
                                          <div class="gallerybox">
                                            <div
                                              class="image-holder"
                                              style={{ height: "250px" }}
                                            >
                                              <a href={res.imageurl}>
                                                <img
                                                  alt="img1"
                                                  src={res.imageurl}
                                                />
                                              </a>
                                              <div class="overlay">
                                                <div class="button">
                                                  <a
                                                    onClick={() =>
                                                      ImageModal(res.imageurl)
                                                    }
                                                  >
                                                    <img src={zoom} alt="" />
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))
                                    : ""}
                                </LightGallery>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <!--============= Floor Plans Gallery ================--> */}
                  {videoData.length > 0 ? (
                    <div class="property_location bg-bg" ref={videos}>
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title">
                              <h3 class="bg-color">Video Gallery</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          {videoData.map((res) => (
                            <div class="col-md-6 m-auto">
                              <div class="callbacks_container">
                                <li>
                                  <div class="gallerybox">
                                    <div class="image-holder video-holder">
                                      <img src={res.thumbnail} alt="" />

                                      <span class="gallery_title">Video</span>
                                      <div class="overlay">
                                        <div class="button">
                                          <a onClick={() => setVideoModal(res)}>
                                            <img src={playicon} alt="" />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <hr class="spacer1px" />
                  <div class="photogallery Panorama-gal" style={{}}>
                    {panoromaData.length > 0 ? (
                      <div class="container" ref={panorama}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title2">
                              <h3 class="bg-color">Panorama Gallery</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          {panoromaData.map((res) => (
                            <div class="col-md-6 mb-3">
                              <div class="callbacks_container">
                                <li
                                  data-src={res.panurl}
                                  data-sub-html="<p>trafficreport</p>"
                                >
                                  <div class="gallerybox">
                                    <div class="image-holder">
                                      <a href={res.panurl}>
                                        <img alt="img1" src={res.panurl} />
                                      </a>
                                      <div class="overlay">
                                        <div
                                          class="button"
                                          onClick={() =>
                                            setPanoModal(res.panurl)
                                          }
                                        >
                                          <a>
                                            <img src={zoom} alt="" />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <hr class="spacer1px" />

                  {/* <!--============= Property Location ================--> */}

                  {!strict && (
                    <div class="property_location" id="location" ref={location}>
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="page_title">
                              <h3>Property Location</h3>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="googlemapframe">
                              <div class="google-maps">
                                <iframe
                                  src="https://maps.google.com/maps?q=California&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                  width="100%"
                                  height="450"
                                  style={{ border: "0" }}
                                  allowfullscreen=""
                                  loading="lazy"
                                  referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <hr class="spacer1px" />
                  {/* <!--============= Presented By ================--> */}
                  {!mls && !strict && (
                    <div
                      class="presentedby_main"
                      id="Presented"
                      ref={presentedBy}
                    >
                      <div class="presentedby">
                        <div class="presentedby_left">
                          <div class="page_title2">
                            <h3>Presented by</h3>
                          </div>

                          <div class="row">
                            <div class="col-sm-4 agent_img">
                              {Object.keys(agentProfile).length > 0 && tourData.useAgentPic == 1 ? (
                                <img
                                  src={agentProfile.agent_profile.profile_img}
                                  alt=""
                                  title=""
                                />
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={250}
                                  height={70}
                                />
                              )}
                            </div>
                            <div class="col-sm-8 agent_sectionbody">
                              {Object.keys(agentProfile).length > 0 ? (
                                <h5>{agentProfile.agent_profile.name}</h5>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}
                              <hr class=" spacer20px" />
                              {Object.keys(agentProfile).length > 0 ? (
                                <h6>{agentProfile.company_details.company}</h6>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}
                              <hr class="spacer1px" />

                              {Object.keys(agentProfile).length > 0 ? (
                                <small>
                                  <i class="fas fa-phone-alt"></i>&nbsp;&nbsp;{" "}
                                  {agentProfile.mobile}
                                </small>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}

                              {Object.keys(agentProfile).length > 0 ? (
                                <small>
                                  <i class="fa fa-id-card"></i>&nbsp;&nbsp;{" "}
                                  {agentProfile.email}
                                </small>
                              ) : (
                                <Skeleton
                                  variant="text"
                                  width={150}
                                  height={20}
                                  style={{ background: "#bbbbbb" }}
                                />
                              )}
                              {tourData.announcements && Object.keys(tourData.announcements).length > 0 && <div className="ttwo pull-left">
                                <i class="fas fa-volume-up"></i>
                                <a
                                  href="javascript:void(0);"
                                  onClick={() =>
                                    setOpenHouseModal(!openHouseModal)
                                  }
                                >
                                  Open House Announcement
                                </a>
                              </div>}
                              <hr class=" spacer20px" />
                            </div>
                          </div>
                          {Object.keys(coAgentData).length > 0 && (
                            <div class="row">
                              <div class="col-sm-4 agent_img">
                                {Object.keys(coAgentData).length > 0 ? (
                                  <img
                                    src={coAgentData.profile_img}
                                    alt=""
                                    title=""
                                  />
                                ) : (
                                  <Skeleton
                                    variant="text"
                                    width={250}
                                    height={70}
                                  />
                                )}
                              </div>
                              <div class="col-sm-8 agent_sectionbody">
                                {Object.keys(coAgentData).length > 0 ? (
                                  <h5>{coAgentData.name}</h5>
                                ) : (
                                  <Skeleton
                                    variant="text"
                                    width={150}
                                    height={20}
                                    style={{ background: "#bbbbbb" }}
                                  />
                                )}
                                <hr class=" spacer20px" />
                                {Object.keys(coAgentData).length > 0 ? (
                                  <h6>{coAgentData.company}</h6>
                                ) : (
                                  <Skeleton
                                    variant="text"
                                    width={150}
                                    height={20}
                                    style={{ background: "#bbbbbb" }}
                                  />
                                )}
                                <hr class="spacer1px" />

                                {Object.keys(coAgentData).length > 0 ? (
                                  <small>
                                    <i class="fas fa-phone-alt"></i>&nbsp;&nbsp;{" "}
                                    {coAgentData.mobile}
                                  </small>
                                ) : (
                                  <Skeleton
                                    variant="text"
                                    width={150}
                                    height={20}
                                    style={{ background: "#bbbbbb" }}
                                  />
                                )}

                                {Object.keys(coAgentData).length > 0 ? (
                                  <small>
                                    <i class="fa fa-id-card"></i>&nbsp;&nbsp;{" "}
                                    {coAgentData.email}
                                  </small>
                                ) : (
                                  <Skeleton
                                    variant="text"
                                    width={150}
                                    height={20}
                                    style={{ background: "#bbbbbb" }}
                                  />
                                )}
                                <hr class=" spacer20px" />
                              </div>
                            </div>
                          )}

                          <hr class="spacer20px" />

                          <div class="row">
                            <div class="col-sm-12">
                              <a
                                href={"mailto:" + coAgentData.email}
                                class="agentbtn"
                              >
                                <i class="far fa-envelope"></i> Email Me
                              </a>
                              <a
                                href="javascript:void()"
                                style={{ marginLeft: "10px" }}
                                onClick={handleWebsite}
                                class="agentbtn"
                              >
                                <i class="far fa-globe"></i> My Website
                              </a>
                            </div>
                          </div>
                        </div>

                        {tourData.showleadcapture == 1 && (
                          <div
                            class="presentedby_right"
                            style={{
                              backgroundImage: "url(" + banner1 + ")",
                              backgroundPosition: "fixed",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                          >
                            <div class="presentedby_right2">
                              <h3>
                                Send Me Details and Market Information for this
                                Home
                              </h3>
                              <hr class="spacer20px" />
                              <hr class="spacer10px" />

                              <div class="row">
                                <div class="col-sm-8 presentedby_right_form">
                                  <form
                                    onSubmit={(event) => {
                                      event.preventDefault();
                                      sendMailAgent();
                                    }}
                                  >
                                    <ul>
                                      <li>
                                        <input
                                          type="text"
                                          placeholder="First Name *"
                                          name="first_name"
                                          value={sendMail.first_name}
                                          class="presentedby_right_inputbox"
                                          onChange={handleInputMailChange}
                                        />
                                      </li>
                                      <li>
                                        <input
                                          type="text"
                                          placeholder="Last Name *"
                                          name="last_name"
                                          value={sendMail.last_name}
                                          class="presentedby_right_inputbox"
                                          onChange={handleInputMailChange}
                                        />
                                      </li>
                                      <li>
                                        <input
                                          type="text"
                                          placeholder="Email *"
                                          name="contact_email"
                                          value={sendMail.contact_email}
                                          class="presentedby_right_inputbox"
                                          onChange={handleInputMailChange}
                                        />
                                      </li>
                                      <li>
                                        <input
                                          type="tel"
                                          placeholder="Phone"
                                          name="phone"
                                          value={sendMail.phone}
                                          class="presentedby_right_inputbox"
                                          onChange={handleInputMailChange}
                                        />{" "}
                                      </li>
                                      <li>
                                        <textarea
                                          cols=""
                                          rows=""
                                          placeholder="Comments"
                                          name="comments"
                                          value={sendMail.comments}
                                          class="presentedby_right_inputbox"
                                          onChange={handleInputMailChange}
                                        ></textarea>
                                      </li>
                                      <li>
                                        <input
                                          name=""
                                          type="submit"
                                          value="Send"
                                          class="sendbtn"
                                        />
                                      </li>
                                    </ul>
                                  </form>
                                </div>
                                <div class="col-sm-4 presentedby_right_img">
                                  {tourData.useCompanyPic == 1 && (
                                    <img
                                      src={
                                        agentProfile.company_details.companylogo
                                      }
                                      alt=""
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <hr class="spacer1px" />

                  {/* <!--============= Footer ================--> */}

                  <div class="bodycontent_footerbtm">
                    <div class="container">
                      <div class="row">
                        <div class="col-sm-6 footerbtm_left">
                          <img src="images/footer-icon1.png" alt="" />{" "}
                          <img src="images/footer-icon2.png" alt="" />
                          <br />
                          Information deemed reliable but not guaranteed
                          <br />
                          &copy; 2018{" "}
                          <a href="http://virtualtourcafe.com/" target="_blank">
                            VirtualTourCafe
                          </a>
                          <br />
                        </div>

                        <div class="col-sm-6 footerbtm_right">
                          <span>Powered by</span>{" "}
                          <img src="images/VTC-logo_top.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="back-to-top" style={{ display: "none" }}>
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPanoromaModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional Panoroma Model
          <CancelIcon
            onClick={() => setOpenPanoromaModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div
            class="container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactPannellum
              id="1"
              sceneId="firstScene"
              imageSource={panoUrl}
              config={config}
              autoLoad
            ></ReactPannellum>
            {/* <img src={panoUrl}/> */}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAgentinfo}
      >
        <DialogTitle id="customized-dialog-title">
          Agent Info
          <CancelIcon
            onClick={() => setopenAgentInfo(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Personal Information</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          {Object.keys(agentProfile).length > 0 ? (
                            <img
                              src={agentProfile.agent_profile.profile_img}
                              alt=""
                              title=""
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <Skeleton variant="text" width={250} height={70} />
                          )}
                        </div>
                      </div>
                      <div class="col-lg-8 col-md-8">
                        <p style={{ marginLeft: "10px" }}>
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.agent_profile.name
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.company_details.company
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Mobile-:{" "}
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.mobile
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Email:
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.email
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Office:{" "}
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.company_details.officephone
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                        <p style={{ marginLeft: "10px" }}>
                          Website:{" "}
                          {Object.keys(agentProfile).length > 0 ? (
                            agentProfile.company_details.website
                          ) : (
                            <Skeleton
                              variant="text"
                              width={150}
                              height={20}
                              style={{ background: "#bbbbbb" }}
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div class="browse_img_head">
                                        <h5>Profile</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-12 col-md-12">
                                                <p style={{ textAlign: "justify" }}>In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo. In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo. In the Tours/Advanced/Co-Listing Agent section that co-listing agents photo is being distorted. Please take a look and correct his so that the co-listing agent photo is properly proportional the same as the listing agent photo.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
                                        <h5>Credentials</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-12 col-md-12">
                                                <p>N/A</p>
                                            </div>
                                        </div>
                                    </div> */}
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPropertyInformation}
      >
        <DialogTitle id="customized-dialog-title">
          Property Information
          <CancelIcon
            onClick={() => setOpenProertyInfromation(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="browse_img_head">
                    <h5>Features</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Bedroom:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Beds === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.Beds}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Square footage:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.InteriorSqFt === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.InteriorSqFt}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>MLS #:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.MLS === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.MLS}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Sub Division:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourData).length > 0 &&
                              tourData.subdivision === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourData.subdivision}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Bathrooms:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Baths === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.Baths}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Year Built:</p>
                            </div>
                            <div class="col-lg-6">
                              {/* {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.YearBuilt === "") ? (
                                                                <span>N/A</span>
                                                            ) : (
                                                                <span>{tourDetailsData.YearBuilt}</span>
                                                            )} */}
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.YearBuilt === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.YearBuilt}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Property Type:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Garage === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.Garage}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                School District:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.SchoolDistrict === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.SchoolDistrict}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Lots Size:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.LotSize === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.LotSize}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>
                                Parking Space:
                              </p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourData).length > 0 &&
                              tourData.parkingspaces === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourData.parkingspaces}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>garage Size:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 &&
                              tourDetailsData.Garage === null ? (
                                <spna>N/A</spna>
                              ) : (
                                <span>{tourDetailsData.Garage}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <div class="app_preview">
                          <div class="row">
                            <div class="col-lg-6">
                              <p style={{ marginLeft: "10px" }}>Status:</p>
                            </div>
                            <div class="col-lg-6">
                              {Object.keys(tourDetailsData).length > 0 ? (
                                <span>{category}</span>
                              ) : (
                                "N/A"
                              )}
                            </div>
                          </div>
                          {/* {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.Status === "") ? (
                                                        "n/a"
                                                    ) : (
                                                        <span>{tourDetailsData.Status}</span>
                                                    )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="browse_img_head">
                    <h5>Description</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(tourData).length > 0 ? (
                        <p style={{ marginLeft: "15px" }}>
                          {tourData.description}
                        </p>
                      ) : (
                        ""
                      )}
                      {/* {(Object.keys(tourDetailsData).length > 0 && tourDetailsData.Garage === "") ? (
                                                <spna>N/A</spna>
                                            ) : (
                                                <span>{tourDetailsData.Garage}</span>
                                            )} */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={largeWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAppointment}
      >
        <DialogTitle id="customized-dialog-title">
          Schedule an Appointment
          <CancelIcon
            onClick={() => setopenAppointment(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                scheduleAppointment();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">First Name *</div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              name="firstname"
                              value={amenityData.firstname}
                              onChange={amenityHandleChange}
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Email *</div>
                          <div class="col-md-8">
                            <input
                              type="email"
                              name="contactemail"
                              value={amenityData.contactemail}
                              class="form-control"
                              onChange={amenityHandleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Last Name *</div>
                          <div class="col-md-8">
                            <input
                              type="text"
                              name="lastname"
                              value={amenityData.lastname}
                              class="form-control"
                              required
                              onChange={amenityHandleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Phone</div>
                          <div class="col-md-8">
                            <input
                              type="tel"
                              name="txtPhone"
                              value={amenityData.txtPhone}
                              class="form-control"
                              onChange={amenityHandleChange}
                              minlength="10"
                              maxlength="12"
                            />
                          </div>
                          {/* pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" */}
                        </div>
                      </div>
                      <div class="col-md-6">
                        <p>Desired Date and Time for Appointment *</p>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Date</div>
                          <div class="col-md-8">
                            <input
                              type="date"
                              name="date"
                              value={amenityData.date}
                              class="form-control"
                              onChange={amenityHandleDateChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Time</div>
                          <div class="col-md-8">
                            <input
                              type="time"
                              name="time"
                              value={amenityData.time}
                              class="form-control"
                              onChange={amenityHandleTImeChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <input
                          type="checkbox"
                          id="chkNotify"
                          name="chkNotify"
                          value={amenityData.chkNotify}
                          style={{ marginBottom: "20px" }}
                        />
                        <span style={{ marginLeft: "10px" }}>
                          Notify me when there is an open house for this house.
                        </span>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-4">Best time to reach you</div>
                          <div class="col-md-8">
                            <select
                              class="form-control"
                              name="selMettingTime"
                              onChange={amenityHandleChange}
                              id="selMettingTime"
                            >
                              <option value="0">Select</option>
                              <option value="Morning">Morning </option>
                              <option value="AfterNoon">AfterNoon</option>
                              <option value="Evening">Evening</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row" ref={contact}>
                          <div class="col-md-4">Contact me by</div>
                          <div class="col-md-8">
                            <select
                              class="form-control"
                              name="selContactType"
                              onChange={amenityHandleChange}
                              id="selContactType"
                            >
                              <option value="0">Select</option>
                              <option value="Phone">Phone </option>
                              <option value="Email">Email</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mar_top row">
                      <div class="col-md-2">
                        <p>Comments</p>
                      </div>
                      <div class="col-md-10">
                        <textarea
                          type="text"
                          name="txaComment"
                          value={amenityData.txaComment}
                          class="form-control"
                          onChange={amenityHandleChange}
                          style={{ minHeight: "100px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div class="browse_img_head">
                    <button type="submit" class="agentbtn">
                      Save
                    </button>
                  </div>
                  <p>* Required Fields</p>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openVideoModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional Video Model
          <CancelIcon
            onClick={() => setOpenVideoModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div
            class="container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              style={{ height: "460px" }}
              src={videoUrl.videurl}
              width="100%"
              autoPlay
              muted={videoUrl.video_music_type == 1 ? false : true}
              controls={videoUrl.video_music_type == 1 ? true : false}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAmenties}
      >
        <DialogTitle id="customized-dialog-title">
          Amenities
          <CancelIcon
            onClick={() => setOpenAmenties(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div class="agent_pop_main">
                {Object.keys(amenities).length > 0 &&
                  amenities.appliances.length > 0 && (
                    <div class="">
                      <div class="browse_img_head">
                        <h5>Appliances</h5>
                      </div>
                      <div class="menu_opt_sec">
                        <div class="mar_top row">
                          {Object.keys(amenities).length > 0 &&
                            amenities.appliances.length > 0 &&
                            amenities.appliances.map((res) => (
                              <div class="col-lg-4 col-md-4">
                                <div class="app_preview">
                                  <p style={{ marginLeft: "10px" }}>
                                    {res.amenityname}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {Object.keys(amenities).length > 0 &&
                  amenities.community.length > 0 && (
                    <div class="">
                      <div class="browse_img_head">
                        <h5>Community</h5>
                      </div>
                      <div class="menu_opt_sec">
                        <div class="mar_top row">
                          {Object.keys(amenities).length > 0 &&
                            amenities.community.length > 0 &&
                            amenities.community.map((res) => (
                              <div class="col-lg-4 col-md-4">
                                <div class="app_preview">
                                  <p style={{ marginLeft: "10px" }}>
                                    {res.amenityname}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {Object.keys(amenities).length > 0 &&
                  amenities.exterior.length > 0 && (
                    <div class="">
                      <div class="browse_img_head">
                        <h5>Exterior</h5>
                      </div>
                      <div class="menu_opt_sec">
                        <div class="mar_top row">
                          {Object.keys(amenities).length > 0 &&
                            amenities.exterior.length > 0 &&
                            amenities.exterior.map((res) => (
                              <div class="col-lg-4 col-md-4">
                                <div class="app_preview">
                                  <p style={{ marginLeft: "10px" }}>
                                    {res.amenityname}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {Object.keys(amenities).length > 0 &&
                  amenities.interior.length > 0 && (
                    <div class="">
                      <div class="browse_img_head">
                        <h5>Interior</h5>
                      </div>
                      <div class="menu_opt_sec">
                        <div class="mar_top row">
                          {Object.keys(amenities).length > 0 &&
                            amenities.interior.length > 0 &&
                            amenities.interior.map((res) => (
                              <div class="col-lg-4 col-md-4">
                                <div class="app_preview">
                                  <p style={{ marginLeft: "10px" }}>
                                    {res.amenityname}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={largeWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openMortagage}
      >
        <DialogTitle id="customized-dialog-title">
          Mortgage Calculator
          <CancelIcon
            onClick={() => setOpenMortgage(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                MortgageCalclulator();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="browse_img_head">
                        <h5>Mortgage Information</h5>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Mortgage Length(years)</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="length"
                            value={mortgageData.length}
                            class="form-control"
                            onChange={inputHandleChange}
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Interest Rate(%) *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="rate"
                            onChange={inputHandleChange}
                            value={mortgageData.rate}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">House Price *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="price"
                            onChange={inputHandleChange}
                            value={mortgageData.price}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Down Payment *</div>
                        <div class="col-md-7">
                          <input
                            type="text"
                            name="downpayment"
                            onChange={inputHandleChange}
                            value={mortgageData.downpayment}
                            class="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="browse_img_head">
                        <h5>Results</h5>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Mortgage Principal:</div>
                        <div class="col-md-07">{mortgageResult.principal}</div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Total Payment:</div>
                        <div class="col-md-07">
                          {mortgageResult.totalpayment}
                        </div>
                      </div>
                      <div
                        class="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      >
                        <div class="col-md-5">Monthly Payments:</div>
                        <div class="col-md-07">
                          {mortgageResult.monthlypayment}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <button
                      style={{ margin: "10px", width: "auto", height: "40px" }}
                      type="submit"
                      class="agentbtn"
                    >
                      Calculate
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      style={{ margin: "10px", width: "auto", height: "40px" }}
                      onClick={() => {
                        setMortgageData(initialMorgageData);
                        setResultData({});
                      }}
                      class="agentbtn"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <p>* Required Fields</p>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openWalkScore}
      >
        <DialogTitle id="customized-dialog-title">
          Walk Score
          <CancelIcon
            onClick={() => setOpenWalkScore(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="container">
            <div>
              <div>
                <div>
                  <div>
                    <a
                      rel="nofollow"
                      href="https://www.walkscore.com/score/-Grapevine--TX-76051?utm_source=badge&utm_medium=responsive&utm_campaign=badge"
                    >
                      <img
                        src="//pp.walk.sc/badge/walk/usa.svg"
                        alt="Walk Score of this location"
                      />
                      <img
                        src="//pp.walk.sc/badge/bike/usa.svg"
                        alt="Bike Score of this location"
                      />
                    </a>
                  </div>
                  <p>
                    <a
                      rel="nofollow"
                      target="_blank"
                      href="https://www.redfin.com/city/30866/TX/Grapevine?src=walkscore_badge"
                    >
                      {" "}
                      Learn more about Grapevine{" "}
                    </a>
                    <img src="https://www.redfin.com/rift?ev=external_web&p=walkscore&s=score_badge&a=impression" />
                  </p>
                </div>
              </div>
            </div>
            {/* <form
                            onSubmit={event => {
                                event.preventDefault();
                            }}>
                            <div class="agent_pop_main">
                                <div class="">
                                    <div>
                                        dfds
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <a onClick={() => handleSvgLink()}><img src={svg1} /></a>
                                            <p>Car-Dependent</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>The Walk Score here is 43 out of 100 based on these categories. View a map of what's nearby.</p>
                                    </div>
                                </div>
                            </div>
                        </form> */}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openHouseModal}
      >
        <DialogTitle id="customized-dialog-title">
          Open House Announcements
          <CancelIcon
            onClick={() => setOpenHouseModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div class="popup-inner">
            <div class="box-wrap">
              <h4>Open House Announcement</h4>
              <div class="row">
                <div class="col-lg-12 col-sm-12 col-xs-12">
                <p>{`${tourData?.announcements?.announcedate},${tourData?.announcements?.fromtime},${tourData?.announcements?.fromampm},${tourData?.announcements?.totime},${tourData?.announcements?.toampm}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </DialogContent>
      </Dialog>
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        Transition
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openImageModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional Image Model
          <CancelIcon
            onClick={() => setOpenImageModal(false)}
            style={{ float: "right", cursor: "pointer" }}
          />
        </DialogTitle>
        <DialogContent dividers>
          <div
            class="container"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactImageZoom {...propsimg} img={imageUrl} />
          </div>
        </DialogContent>
      </Dialog>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
// =======================responsive navbar===============================
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
// ===================--------------------end-----------==============
