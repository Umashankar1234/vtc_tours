import React, { useState, useEffect, useContext, useRef } from "react";
import { APIURL, APIPath } from "../CommonMethods/Fetch";
import ReactAudioPlayer from "react-audio-player";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { postRecord } from "../CommonMethods/Save";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../CommonMethods/Authentication";
import ReactPannellum, { getConfig } from "react-pannellum";
import GoogleMapReact from "google-map-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import Snackbar from "@material-ui/core/Snackbar";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import mission_bg from "../images/mission-img2.jpg";
import { Button } from "@material-ui/core";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import realpics3 from "../images/realpics3.jpg";
import playbtn from "../images/playbtn-parallax.png";
import BetterWorld from "../images/Better_World_full_mix.mp3";
import zoomIcon from "../images/zoomicon.png";
import about1 from "../images/about1.jpg";
import videobg from "../images/videobg.jpg";
import playicon from "../images/playicon.png";
import profileImg from "../images/profilephoto.jpg";
import vtcLogoTop from "../images/VTC-logo_top.png";
import vtclogo from "../images/VTC-logo.png";
import footericon1 from "../images/footer-icon1.png";
import footericon2 from "../images/footer-icon2.png";
import Contactbg from "../images/contact_bg.jpg";
import Parllel from "../images/pause-btn-parallax.png";
import photo from "../images/photos.jpg";
import svg1 from "../images/43.svg";
import zoom from "../images/zoom1.png";
import ReactImageZoom from "react-image-zoom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
const APIGetUserData = APIURL() + "user-details";
const APIGetTourDetails = APIURL() + "tour-details";
const APIGetSiteSetting = APIURL() + "sitesetting";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
const APIGetTourInfo = APIURL() + "get-Tourinfo";
const APIGetMortgageCalculator = APIURL() + "get-Mortgage-Calculator";
const APIGetContactAgent = APIURL() + "get-Contact-Agent";
const APIGetScheduleAppointment = APIURL() + "get-scheduleMail";
const APIGetFloorList = APIURL() + "edit-floor-Plans";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  lightbox: {
    position: "absolute",
    //textAlign: "center",
    "& h2::after": {
      // backgroundImage: "url(" + ftr_head + ")",
      content: '""',
      height: "4px",
      width: "50px",
      position: "absolute",
      textAlign: "center",
      right: "0",
      left: "0",
      bottom: "-20px",
      margin: "0 auto",
    },
  },
  have_need_sec_left_img: {
    position: "relative",
    textAlign: "center",
    margin: "0 auto",
    // minHeight: "100px",
    "& ::after": {
      content: '""',
      position: "absolute",
      right: 0,
      left: 0,
      margin: "0 auto",
      textAlign: "center",
      //background: "url(" + pic_bg + ")",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      width: "170px",
      height: "115px",
      zIndex: "-1",
      top: "-97px",
    },
  },
  our_partners_head: {
    position: "relative",
    textAlign: "center",
    "& h2::after": {
      //backgroundImage: "url(" + ftr_head + ")",
      content: '""',
      height: "4px",
      width: "50px",
      position: "absolute",
      textAlign: "center",
      right: "0",
      left: "0",
      bottom: "-20px",
      margin: "0 auto",
    },
  },
}));
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Themetemplate(props) {
  const features = useRef(null);
  const photos = useRef(null);
  const videos = useRef(null);
  const panorama = useRef(null);
  const location = useRef(null);
  const presentedBy = useRef(null);
  const floorPlans = useRef(null);
  const propertyRef = useRef(null);
  const contact = useRef(null);
  const documents = props.documents;
  const AgnetID = props.AgentId;
  const ThemeId = props.ThemeId;
  const threeDs = props.threeDs;
  const tourid = props.tourid;
  const agentProfile = props.agentProfile;
  const amenities = props.amenities;
  const music = props.music;
  const tourData = props.tourData;
  const statename = props.statename;
  const category = props.category;
  const panoSetting = props.panoSetting;
  const slideSetting = props.slideSetting;
  const mls = props.mls;
  const strict = props.strict;
  const coAgentData = props.coAgentData;
  

  // ===============important=============/
  // const AgnetID = props.match.params.id;
  // const ThemeId = props.match.params.themeid;
  // ===============important=============/
  // const AgnetID = 7686;
  // const ThemeId = 4388002;
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
  const initialMorgageData = {
    length: "",
    rate: "",
    price: "",
    downpayment: "",
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 500,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);

  let history = useHistory();
  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  // const [statename, setstatename] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [data, setData] = useState({});
  const [iconData, setIconData] = useState({});
  const [tourInfo, setTourInfo] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [tourDetailsData, setTourDetailsData] = useState({});
  const [largeWidth, setLargeWidth] = React.useState("lg");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [openAgentinfo, setopenAgentInfo] = useState(false);
  const [openContactinfo, setopenContactInfo] = useState(false);
  const [openAppointment, setopenAppointment] = useState(false);
  const [openMortagage, setOpenMortgage] = useState(false);
  const [amenityData, setAmenityData] = useState({});
  const [openAmenties, setOpenAmenties] = useState(false);
  const [mortgageData, setMortgageData] = useState(initialMorgageData);
  const [mortgageResult, setMortgageResult] = useState({});
  const [openPropertyInformation, setOpenProertyInfromation] = useState(false);
  const [panoromaData, setPanromaData] = useState([]);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [openWalkScore, setOpenWalkScore] = useState(false);
  const [openPanoromaModal, setOpenPanoromaModal] = useState(false);
  const [openHouseModal, setOpenHouseModal] = useState(false);
  const [panoUrl, setPanoUrl] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [TwitterLink, setTwitterLink] = useState("");
  const [youTubeLink, setYoutubeLink] = useState("");
  const [sendMail, setSendMail] = useState({});
  const [open, setOpen] = useState(false);
  const [floorPlanData, setFloorPlansData] = useState({});

  const scrollToElement = (e, elementRef) => {
    e.preventDefault();
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // const [agentProfile, setAgentProfile] = useState("");
  // const [amenities, setAmenities] = useState({});
  // const [music, setMusic] = useState("");
  // const [tourData, setTourData] = useState({});
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
  useEffect(() => {
    window.scroll(0, 0);
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSiteSetting, obj).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setData(res.data[0].response.data);
      }
    });
  }, []);
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
  //       setTourData(res.data[0].response.tourdetails);
  //       setstatename(res.data[0].response.state);
  //       setCategory(res.data[0].response.category);
  //       setPanoSetting(res.data[0].response.panorama);
  //       setSlideSetting(res.data[0].response.slideshow);
  //     }
  //   });
  // }, [AgnetID, ThemeId]);
  useEffect(() => {
    const obj = { authenticate_key: "abcd123XYZ" };
    postRecord(APIGetSocialIconLink, obj).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setIconData(res.data[0].response);
        setFacebookLink(res.data[0].response.data[2].link);
        setTwitterLink(res.data[0].response.data[0].link);
        setYoutubeLink(res.data[0].response.data[1].link);
      }
    });
  }, []);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgnetID,
      tourid: tourid,
    };
    postRecord(APIGetTourInfo, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setImageData(res.data[0].response.dataDetails.dataProvider);
        setVideoData(res.data[0].response.dataDetails.dataProvider2);
        setTourDetailsData(res.data[0].response.dataDetails.tourdetails);
        setPanromaData(res.data[0].response.dataDetails.dataProvider3);
        setFloorPlansData(res.data[0].response.dataDetails.dataProvider4);
      }
    });
  }, [AgnetID, ThemeId]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  // useEffect(() => {
  //     if (music) {
  //         console.log(music);
  //         var source = music;
  //         var audio = new Audio();
  //         audio.addEventListener("load", function () {
  //             audio.play();
  //         }, true);
  //         audio.src = source;
  //         audio.autoplay = true;
  //         document.getElementById("button").src = Parllel
  //         document.querySelectorAll('.bar-c .bar').forEach(n => n.classList.remove('noAnim'));
  //     }
  // }, [music]);

  function togglePlay() {
    var track = document.getElementById("track1");
    if (track.paused) {
      track.muted = false;
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
    window.open(
      "https://www.virtualtourcafe.com/alpha/site/flyer/" + tourid,
      "_blank"
    );
    // history.push(APIPath() + "agent-view-flyer-active/" + ThemeId + APIPath() + AgnetID);
  };
  const ListingPage = () => {
    window.open(
      APIPath() + "agent-my-listing/" + AgnetID + "/" + tourid,
      "_blank"
    );
    // history.push(APIPath() + "agent-my-listing/" + AgnetID);
  };
  const setVideoModal = (video) => {
    setOpenVideoModal(true);
    setVideoUrl(video);
  };
  const AreaSchool = () => {
    window.open(
      "https://nces.ed.gov/globallocator/index.asp?search=1&State=BC&zipcode=&School=1&PrivSchool=1&miles=10&CS=240931FB",
      "_blank"
    );
  };
  const handleSvgLink = () => {
    window.open(
      "https://www.walkscore.com/score/dfds?utm_source=walkscore.com&utm_medium=score-badge&utm_campaign=ws_score_widget",
      "_blank"
    );
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
  const setPanoModal = (pano) => {
    setOpenPanoromaModal(true);
    setPanoUrl(pano);
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  // const getMapBounds = (map, maps, places) => {
  //     const bounds = new maps.LatLngBounds();

  //     places.forEach((place) => {
  //       bounds.extend(new maps.LatLng(
  //         place.geometry.location.lat,
  //         place.geometry.location.lng,
  //       ));
  //     });
  //     return bounds;
  //   };
  //   const bindResizeListener = (map, maps, bounds) => {
  //     maps.event.addDomListenerOnce(map, 'idle', () => {
  //       maps.event.addDomListener(window, 'resize', () => {
  //         map.fitBounds(bounds);
  //       });
  //     });
  //   };
  //   const handleApiLoaded = (map, maps, places) => {
  //     // Get bounds by our places
  //     const bounds = getMapBounds(map, maps, places);
  //     // Fit map to bounds
  //     map.fitBounds(bounds);
  //     // Bind the resize listener
  //     bindResizeListener(map, maps, bounds);
  //   };

  // }
  const handleInputMailChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setSendMail({ ...sendMail, [name]: value });
  };
  const sendMailAgent = () => {
    setOpen(true);
    sendMail.authenticate_key = "abcd123XYZ";
    sendMail.tourId = tourid;
    sendMail.agentId = AgnetID;
    postRecord(APIGetContactAgent, sendMail)
      .then((res) => {
        if (res.data[0].response.status === "success") {
          setOpen(false);
          setMessage(res.data[0].response.message);
          setOpenSuccess(true);
          setSync(false);
          setSendMail({});
        } else {
          setOpen(false);
          setMessage(res.data[0].response.message);
          setOpenError(true);
          setSync(false);
        }
        setSync(true);
      })
      .catch((error) => {
        setOpen(false);
        setMessage("Error Occured !!");
        setOpenError(true);
      });
  };
  const amenityHandleDateChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const amenityHandleTImeChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setAmenityData({ ...amenityData, [name]: value });
  };
  const scheduleAppointment = () => {
    amenityData.authenticate_key = "abcd123XYZ";
    amenityData.tourId = tourid;
    setOpen(true);
    postRecord(APIGetScheduleAppointment, amenityData).then((res) => {
      if (res.data[0].response.status === "success") {
        setOpen(false);
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(false);
        setAmenityData({});
      } else {
        setMessage(res.data[0].response.message);
        setOpenError(true);
        setSync(false);
      }
      setSync(true);
    });
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

  return (
    <React.Fragment>
      <div class="wrapper theme1" id="home">
        <div class="wrapper_inner">
          <div class="header-box1">
            <div class="container">
              <div class="row">
                <div class="col-lg-12">
                  <div class="header-boxfull">
                    <div class="company-name">{tourDetailsData.Caption}</div>
                    <div class="topmenu">
                      <nav
                        id="cssmenu"
                        className={`head_btm_menu ${mobileClass}`}
                      >
                        <div
                          id="menu-button"
                          onClick={() => setShow(!show)}
                        ></div>
                        <ul style={{ display: show ? "block" : "" }}>
                          <li>
                            <a href="#home">Home</a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => scrollToElement(e, features)}
                            >
                              Features
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => scrollToElement(e, photos)}
                            >
                              Photos
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => scrollToElement(e, panorama)}
                            >
                              Panorama
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => scrollToElement(e, videos)}
                            >
                              Videos
                            </a>
                          </li>
                          {!strict && (
                            <li>
                              <a
                                href="#"
                                onClick={(e) => scrollToElement(e, location)}
                              >
                                Location
                              </a>
                            </li>
                          )}
                          <li>
                            <a
                              href="#"
                              onClick={(e) => scrollToElement(e, floorPlans)}
                            >
                              Floor Plans
                            </a>
                          </li>
                          {!strict && !mls && (
                            <li>
                              <a
                                href="#"
                                onClick={(e) => scrollToElement(e, presentedBy)}
                              >
                                Presented By
                              </a>
                            </li>
                          )}
                          {!mls && !strict && (
                            <>
                              <li>
                                <a href="#">Details</a>
                                <ul>
                                  <li>
                                    <a
                                      href="javascript:void()"
                                      onClick={() =>
                                        setOpenProertyInfromation(true)
                                      }
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
                                    <a
                                      href="javascript:void()"
                                      onClick={viewFlyer}
                                    >
                                      Printable Flyer
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={(e) => scrollToElement(e, contact)}
                                >
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
                                    <a
                                      href="javascript:void()"
                                      onClick={ListingPage}
                                    >
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
                                  {/* <li><a href="#map">Map View</a></li>
                                                            <li><a href="javascript:void()" >Arial View</a></li> */}
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
                                    <a
                                      href="javascript:void()"
                                      onClick={AreaSchool}
                                    >
                                      Area School
                                    </a>
                                  </li>
                                </ul>
                              </li>
                            </>
                          )}
                        </ul>
                      </nav>
                    </div>
                    {/* <ReactAudioPlayer
                                            src={music && music}
                                            autoPlay={true}
                                            controls
                                        /> */}
                    <div class="Music-player-holder">
                      <div class="player">
                        <img id="button" onClick={togglePlay} src={playbtn} />
                        {/* <iframe src="https://olafwempe.com/mp3/silence/silence.mp3" type="audio/mp3" allow="autoplay" id="audio" style={{ display: "none" }}></iframe> */}
                        {music && (
                          <audio autoplay id="track1">
                            <source type="audio/ogg" src={music} />
                            <source type="audio/mpeg" src={music} />
                          </audio>
                        )}
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
                </div>
              </div>
            </div>
          </div>

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
            </OwlCarousel>
          ) : (
            ""
          )}
          {/* <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
                        <div class="carousel-inner" role="listbox">
                            <div class="carousel-item active" style={{ backgroundImage: "url(" + banner1 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            </div>
                            <div class="carousel-item" style={{ backgroundImage: "url(" + banner2 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            </div>
                            <div class="carousel-item" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                            </div>
                            
                        </div>
                    </div> */}
          <div class="content">
            <div class="content_inner">
              <div class="full_width">
                <div class="full_width_inner">
                  <div class="bodycontent">
                    <div class="container">
                      <div class="row second_section">
                        <div class="col-sm-12">
                          <h3>{tourDetailsData.Caption}</h3>
                          <small>
                            {tourData.city}, {statename} {tourData.zipcode}
                          </small>
                          <p>{tourData.description} </p>
                        </div>
                      </div>
                      <div
                        class="row second_section third_section"
                        id="feature"
                        ref={features}
                      >
                        {!strict && (
                          <div class="col-md-6 m-auto" ref={propertyRef}>
                            <h4>Property Details</h4>
                            <hr class="spacer30px"></hr>
                            <ul>
                              <li>
                                <strong>Price: </strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.Price === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{"$ " + tourDetailsData.Price}</span>
                                )}
                              </li>
                              <li>
                                <strong>Bed:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.Beds === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.Beds}</span>
                                )}
                              </li>
                              <li>
                                <strong>Baths:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.Baths === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.Baths}</span>
                                )}
                              </li>
                              <li>
                                <strong>Square Feet:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.InteriorSqFt === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.InteriorSqFt}</span>
                                )}
                              </li>
                              <li>
                                <strong>Garage:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.Garage === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.Garage}</span>
                                )}
                              </li>
                              <li>
                                <strong>Year Built:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.YearBuilt === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.YearBuilt}</span>
                                )}
                              </li>
                              <li>
                                <strong>Lot Size:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.LotSize === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.LotSize}</span>
                                )}
                              </li>
                              <li>
                                <strong>School District:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.SchoolDistrict === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.SchoolDistrict}</span>
                                )}
                              </li>
                              <li>
                                <strong>MLS#:</strong>
                                {Object.keys(tourDetailsData).length > 0 &&
                                tourDetailsData.MLS === null ? (
                                  <span style={{ marginLeft: "10px" }}>
                                    N/A
                                  </span>
                                ) : (
                                  <span>{tourDetailsData.MLS}</span>
                                )}
                              </li>
                            </ul>
                          </div>
                        )}
                        <hr class="spacer30px" />
                        <hr class="spacer30px" />

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
                          {/* <a href={facebookLink} target="_blank"><i class="fab fa-facebook-f"></i></a>
                                                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                                                    <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                                    <a href={TwitterLink} target="_blank"><i class="fab fa-twitter"></i></a>
                                                    <a href="#"><i class="fab fa-google-plus-g"></i></a> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {documents && documents.length > 0 ? (
                    <div class="bodycontent_gallery_centerbox" id="videos">
                      <h4>Documents</h4>
                      <hr class="spacer30px"></hr>
                      <ul>
                        {documents &&
                          documents.length > 0 &&
                          documents.map((res) => (
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
                                      <p>{res.doc_name}</p>
                                      <a
                                        onClick={() =>
                                          downloadDoc(
                                            res.doc_link,
                                            res.doc_name
                                          )
                                        }
                                        data-title={res.doc_name}
                                      >
                                        <img src={zoomIcon} alt="" />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                      <hr class="spacer1px" />
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer30px"></hr>
                  {imageData.length > 0 ? (
                    <div class="bodycontent_gallery" id="photos" ref={photos}>
                      <h4>Photo Gallery</h4>
                      <hr class="spacer30px"></hr>
                      <ul>
                        {Object.keys(imageData).length > 0
                          ? imageData.map((res) => (
                              <li>
                                <div class="gallerybox">
                                  <div class="image-holder">
                                    <div class="gallery_bgimage">
                                      &nbsp;
                                      <img
                                        src={res.imageurl}
                                        style={{
                                          marginTop: "-18px",
                                          height: "220px",
                                        }}
                                      />
                                    </div>
                                    <div class="overlay">
                                      <div class="button">
                                        <p>{res.caption}</p>
                                        <a
                                          class="example-image-link"
                                          href={res.imageurl}
                                          data-lightbox="example-1"
                                          data-title={res.caption}
                                        >
                                          <img src={zoomIcon} alt="" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          : ""}
                        {/* <li>
                                                        <div class="gallerybox">
                                                            <div class="image-holder">
                                                                <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >&nbsp;
                                                                </div>
                                                                <span class="gallery_title">Image</span>
                                                                <div class="overlay">
                                                                    <div class="button">
                                                                        <p>Title Goes Here</p><a class="example-image-link"
                                                                            href={about1} data-lightbox="example-1"
                                                                            data-title="Title Goes Here">
                                                                            <img src={zoomIcon}
                                                                                alt="" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li> */}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer30px" />
                  {panoromaData.length > 0 ? (
                    <div
                      class="bodycontent_gallery bodycontent_gallery_panaroma"
                      id="panaroma"
                      ref={panorama}
                    >
                      <h4>Panorama Gallery</h4>
                      <hr class="spacer30px"></hr>
                      <ul>
                        {Object.keys(panoromaData).length > 0
                          ? panoromaData.map((res) => (
                              <li>
                                <div class="gallerybox">
                                  <div class="image-holder">
                                    <div class="gallery_bgimage">
                                      &nbsp;
                                      <img
                                        src={res.panurl}
                                        style={{
                                          marginTop: "-18px",
                                          height: "220px",
                                        }}
                                      />
                                    </div>
                                    <div class="overlay">
                                      <div class="button">
                                        <p>{res.caption}</p>
                                        <a
                                          class="example-image-link"
                                          href={res.panurl}
                                          data-lightbox="example-1"
                                          data-title={res.caption}
                                        >
                                          <img src={zoomIcon} alt="" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          : ""}
                        {/* <li>
                                                        <div class="gallerybox">
                                                            <div class="image-holder">
                                                                <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >&nbsp;
                                                                </div>
                                                                <span class="gallery_title">Image</span>
                                                                <div class="overlay">
                                                                    <div class="button">
                                                                        <p>Title Goes Here</p><a class="example-image-link"
                                                                            href={about1} data-lightbox="example-1"
                                                                            data-title="Title Goes Here">
                                                                            <img src={zoomIcon}
                                                                                alt="" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li> */}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer30px"></hr>

                  {videoData.length > 0 ? (
                    <div
                      class="bodycontent_gallery_centerbox"
                      id="videos"
                      ref={videos}
                    >
                      <h4>Video Gallery</h4>
                      <hr class="spacer30px"></hr>

                      <ul>
                        {videoData.map((res) => (
                          <li>
                            <div class="gallerybox">
                              <div class="image-holder video-holder">
                                <img src={res.thumbnail} alt="" />

                                <span class="gallery_title">Video</span>
                                <div class="overlay">
                                  <div class="button">
                                    <p>{res.caption}</p>
                                    <a
                                      onClick={() => setVideoModal(res)}
                                      data-title={res.caption}
                                    >
                                      <img src={playicon} alt="" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <hr class="spacer1px" />
                    </div>
                  ) : (
                    ""
                  )}
                  {threeDs?.code1 || threeDs?.code2 ? (
                    <div
                      class="bodycontent_gallery_centerbox"
                      id="videos"
                      // ref={threeD}
                    >
                      <h4>3D WalkThrough</h4>
                      <hr class="spacer30px"></hr>

                      <div
                        class="threeDContainer"
                        dangerouslySetInnerHTML={{
                          __html: threeDs?.code1
                            ? threeDs?.code1
                            : threeDs?.code2,
                        }}
                      ></div>
                      <hr class="spacer1px" />
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer30px" />

                  {floorPlanData.length > 0 ? (
                    <div
                      class="bodycontent_gallery bodycontent_gallery_floor"
                      id="photos"
                      ref={floorPlans}
                    >
                      <h4>Floor Plans</h4>
                      <hr class="spacer30px"></hr>

                      <ul>
                        {Object.keys(floorPlanData).length > 0
                          ? floorPlanData.map((res) => (
                              <li>
                                <div class="gallerybox">
                                  <div class="image-holder">
                                    <div class="gallery_bgimage">
                                      &nbsp;
                                      <img
                                        src={res.imageurl}
                                        style={{
                                          marginTop: "-18px",
                                          height: "220px",
                                        }}
                                      />
                                    </div>
                                    <div class="overlay">
                                      <div class="button">
                                        <p>{res.caption}</p>
                                        <a
                                          class="example-image-link"
                                          href={res.imageurl}
                                          data-lightbox="example-1"
                                          data-title={res.caption}
                                        >
                                          <img src={zoomIcon} alt="" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          : ""}
                        {/* <li>
                                                        <div class="gallerybox">
                                                            <div class="image-holder">
                                                                <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >&nbsp;
                                                                </div>
                                                                <span class="gallery_title">Image</span>
                                                                <div class="overlay">
                                                                    <div class="button">
                                                                        <p>Title Goes Here</p><a class="example-image-link"
                                                                            href={about1} data-lightbox="example-1"
                                                                            data-title="Title Goes Here">
                                                                            <img src={zoomIcon}
                                                                                alt="" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li> */}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  <hr class="spacer30px" />

                  {!strict && (
                    <div
                      class="bodycontent_location"
                      id="location"
                      ref={location}
                    >
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <h4>Property Location</h4>
                            <hr class="spacer30px"></hr>
                          </div>
                        </div>
                      </div>

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
                  )}
                  <hr class="spacer1px" />
                  {!mls && !strict && (
                    <div
                      class="bodycontent_agent"
                      id="presented"
                      ref={presentedBy}
                    >
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <h4>Agent/Branding</h4>
                          </div>
                        </div>
                        <hr class="spacer20px" />

                        <div class="row">
                          <div class="col-sm-4">
                            <div class="profile-photo">
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
                            <hr class=" spacer20px" />
                            <a
                              href={"mailto:" + agentProfile.email}
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
                            {tourData.announcements && Object.keys(tourData.announcements).length > 0 && (
                              <div className="pull-left">
                                <i class="fas fa-volume-up"></i>
                                <a
                                  href="javascript:void(0);"
                                  onClick={() =>
                                    setOpenHouseModal(!openHouseModal)
                                  }
                                >
                                  Open House Announcement
                                </a>
                              </div>
                            )}
                            <hr class=" spacer20px" />
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged.{" "}
                            </p>
                          </div>
                        </div>
                        {Object.keys(coAgentData).length > 0 && (
                          <div class="row">
                            <div class="col-sm-4">
                              <div class="profile-photo">
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
                              <hr class=" spacer20px" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <hr class="spacer1px" />
                  {!mls && !strict && tourData.showleadcapture == 1 && (
                    <div
                      class="bodycontent_contact"
                      id="contact"
                      ref={contact}
                      style={{
                        backgroundImage: "url(" + mission_bg + ")",
                        backgroundPosition: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div class="container">
                        <div class="row">
                          <div class="col-sm-12">
                            <h4>Contact</h4>
                            <hr class="spacer30px"></hr>
                          </div>
                        </div>
                        <hr class="spacer20px" />

                        <div class="row">
                          <div class="col-lg-12 m-auto">
                            <div class="bgwhite-btmpanel">
                              <div class="row">
                                <div class="col-md-4">
                                  <div class="contact_left">
                                    {tourData.useCompanyPic == 1 && (
                                      <img
                                        src={
                                          agentProfile.company_details
                                            .companylogo
                                        }
                                        alt=""
                                      />
                                    )}

                                    <h5>VirtualTourCafe, LLC</h5>
                                    <p>
                                      {Object.keys(data).length > 0 ? (
                                        <a href="tel:">
                                          <i class="fas fa-phone-alt"></i>
                                          {data.phone_number}
                                        </a>
                                      ) : (
                                        <Skeleton
                                          variant="text"
                                          width={150}
                                          height={50}
                                          style={{ background: "#bbbbbb" }}
                                        />
                                      )}
                                      <br />
                                      {Object.keys(data).length > 0 ? (
                                        <a href="mailto:">
                                          <i class="fa fa-envelope"></i>
                                          {data.site_email}
                                        </a>
                                      ) : (
                                        <Skeleton
                                          variant="text"
                                          width={150}
                                          height={50}
                                          style={{ background: "#bbbbbb" }}
                                        />
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div class="col-md-8">
                                  <div class="contact_right">
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
                                            class="inputbox"
                                            name="first_name"
                                            value={sendMail.first_name}
                                            onChange={handleInputMailChange}
                                          />
                                        </li>
                                        <li>
                                          <input
                                            name="last_name"
                                            type="text"
                                            placeholder="Last Name *"
                                            class="inputbox"
                                            value={sendMail.last_name}
                                            onChange={handleInputMailChange}
                                          />
                                        </li>
                                        <li>
                                          <input
                                            name="contact_email"
                                            type="email"
                                            placeholder="Your Email *"
                                            class="inputbox"
                                            value={sendMail.contact_email}
                                            onChange={handleInputMailChange}
                                          />
                                        </li>
                                        <li>
                                          <textarea
                                            name="comments"
                                            cols=""
                                            rows=""
                                            value={sendMail.comments}
                                            placeholder="Message"
                                            class="inputbox"
                                            onChange={handleInputMailChange}
                                          ></textarea>
                                        </li>
                                        <li>
                                          <button
                                            type="submit"
                                            class="agentbtn"
                                          >
                                            Submit
                                            <i
                                              class="fas fa-paper-plane"
                                              style={{ marginLeft: "10px" }}
                                            ></i>
                                          </button>
                                        </li>
                                      </ul>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div class="bodycontent_footerbtm">
                    <div class="container">
                      <div class="row">
                        <div class="col-md-6 footerbtm_left">
                          <img src={footericon1} alt="" />{" "}
                          <img src={footericon2} alt="" />
                          <br />
                          Information deemed reliable but not guaranteed
                          <br />
                          &copy; 2018{" "}
                          <a href="http://virtualtourcafe.com/" target="_blank">
                            VirtualTourCafe
                          </a>
                          <br />
                        </div>
                        <div class="col-md-6 footerbtm_right">
                          <span>Powered by</span>{" "}
                          <img src={vtcLogoTop} alt="" />
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
                        <div class="row">
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
                      onClick={() => setMortgageData(initialMorgageData)}
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
              src={videoUrl.videurl}
              width="100%"
              style={{ height: "460px" }}
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
                //saveCompanyBanner();
              }}
            >
              <div class="agent_pop_main">
                <div class="">
                  <div>dfds</div>
                  <div class="row">
                    <div
                      class="col-md-6"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <a onClick={() => handleSvgLink()}>
                        <img src={svg1} />
                      </a>
                      <p>Car-Dependent</p>
                    </div>
                    {/* <div class="col-md-6" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <a onClick={() => handleSvgLink()}> <img src={svg2} /></a>
                                            <p>Somewhat Bikeable</p>
                                        </div> */}
                  </div>
                  <div>
                    <p>
                      The Walk Score here is 43 out of 100 based on these
                      categories. View a map of what's nearby.
                    </p>
                  </div>
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
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
