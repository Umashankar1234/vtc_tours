import React, { useState, useEffect, useContext } from "react";
import { APIURL, APIPath } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import ReactImageZoom from "react-image-zoom";
import ReactPannellum, { getConfig } from "react-pannellum";
import playbtn from "../images/playbtn-parallax.png";
import { AuthContext } from "../CommonMethods/Authentication";
import Parllel from "../images/pause-btn-parallax.png";
import Skeleton from "@material-ui/lab/Skeleton";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import verticalBanner from "../images/vertical-banner1.jpg";
import banner1 from "../images/banner1.jpg";
import banner2 from "../images/banner2.jpg";
import banner3 from "../images/banner3.jpg";
import darkAudio from "../images/playbtn-parallax-dark.png";
import ParllelDarkAudio from "../images/pause-btn-parallax-dark.png";
import floorplans from "../images/floorplans.jpg";
import floorplans2 from "../images/floorplans2.jpg";
import floorplans3 from "../images/floorplans3.jpg";
import playIcon from "../images/playicon.png";
import imageIcons from "../images/imageIcons.png";
import map1 from "../images/map1.jpg";
import profilePhoto from "../images/profilephoto.jpg";
import captcha from "../images/captcha.gif";
import bg4 from "../images/bg4.jpg";
import vtcLogo from "../images/VTC-logo.png";
import footerIcon1 from "../images/footer-icon1.png";
import footerIcon2 from "../images/footer-icon2.png";
import vtcLogoTop from "../images/VTC-logo_top.png";
import photo from "../images/photos.jpg";
import svg1 from "../images/43.svg";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import Slide from "@material-ui/core/Slide";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const APIGetUserData = APIURL() + "user-details";
const APIGetTourDetails = APIURL() + "tour-details";
const APIGetTourInfo = APIURL() + "get-Tourinfo";
const APIGetMortgageCalculator = APIURL() + "get-Mortgage-Calculator";
const APIGetSocialIconLink = APIURL() + "getsocialicons";
const APIGetContactAgent = APIURL() + "get-Contact-Agent";
const APIGetScheduleAppointment = APIURL() + "get-scheduleMail";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ThemeTemplate4(props) {
  const initialMorgageData = {
    length: "",
    rate: "",
    price: "",
    downpayment: "",
  };
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 500,
      color: "#fff",
    },
  }));
  const AgnetID = props.match.params.id;
  const ThemeId = props.match.params.themeid;
  const { dispatch } = useContext(AuthContext);
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [statename, setstatename] = useState(false);
  let history = useHistory();
  const [sync, setSync] = useState(true);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [openAppointment, setopenAppointment] = useState(false);
  const [openMortagage, setOpenMortgage] = useState(false);
  const [amenityData, setAmenityData] = useState({});
  const [openAmenties, setOpenAmenties] = useState(false);
  const [mortgageData, setMortgageData] = useState({ initialMorgageData });
  const [openPropertyInformation, setOpenProertyInfromation] = useState(false);
  const [largeWidth, setLargeWidth] = React.useState("lg");
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [imageData, setImageData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [tourDetailsData, setTourDetailsData] = useState({});
  const [openAgentinfo, setopenAgentInfo] = useState(false);
  const [openWalkScore, setOpenWalkScore] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [panoromaData, setPanromaData] = useState([]);
  const [openPanoromaModal, setOpenPanoromaModal] = useState(false);
  const [panoUrl, setPanoUrl] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [TwitterLink, setTwitterLink] = useState("");
  const [youTubeLink, setYoutubeLink] = useState("");
  const [sendMail, setSendMail] = useState({});
  const [open, setOpen] = useState(false);
  const [floorPlanData, setFloorPlandata] = useState([]);
  const [agentProfile, setAgentProfile] = useState("");
  const [music, setMusic] = useState("");
  const [tourData, setTourData] = useState({});
  const [mortgageResult, setMortgageResult] = useState({});
  const [amenities, setAmenities] = useState({});
  const [category, setCategory] = useState("");
  const [panoSetting, setPanoSetting] = useState({});
  const [slideSetting, setSlideSetting] = useState({});
  const [coAgentData, setCoAgentData] = useState([]);

  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agent_id: AgnetID,
    };
    postRecord(APIGetUserData, objusr).then((res) => {
      // console.log(res);
      if (res.data[0].response.status === "success") {
        setCurrentUser(res.data[0].response.data.agent_profile);
      }
    });
  }, [AgnetID]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgnetID,
      tourid: ThemeId,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      console.log(res.data[0].response);
      if (res.data[0].response.status === "success") {
        setAgentProfile(res.data[0].response.agentDetails);
        setCoAgentData(res.data[0].response.coAgentData);
        setAmenities(res.data[0].response.amenities);
        setMusic(res.data[0].response.music);
        setstatename(res.data[0].response.state);
        setTourData(res.data[0].response.tourdetails);
        setCategory(res.data[0].response.category);
        setPanoSetting(res.data[0].response.panorama);
        setSlideSetting(res.data[0].response.slideshow);
      }
    });
  }, [AgnetID, ThemeId]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgnetID,
      tourid: ThemeId,
    };
    postRecord(APIGetTourInfo, objusr).then((res) => {
      if (res.data[0].response === "success") {
        // console.log(res.data[0].response)
      }
    });
  }, [AgnetID, ThemeId]);
  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      agentId: AgnetID,
      tourid: ThemeId,
    };
    postRecord(APIGetTourInfo, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        console.log("Hiii");
        //setTourInfo(res.data[0].response.dataDetails.dataProvider)
        setImageData(res.data[0].response.dataDetails.dataProvider);
        setVideoData(res.data[0].response.dataDetails.dataProvider2);
        setTourDetailsData(res.data[0].response.dataDetails.tourdetails);
        setPanromaData(res.data[0].response.dataDetails.dataProvider3);
        setFloorPlandata(res.data[0].response.dataDetails.dataProvider4);
      }
    });
  }, [AgnetID, ThemeId, floorPlanData]);
  // console.log(floorPlanData);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
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
    mortgageData.tourId = ThemeId;
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
    window.open(
      APIPath() + "agent-view-flyer-active/" + ThemeId + "/" + AgnetID,
      "_blank"
    );
  };
  const ListingPage = () => {
    window.open(APIPath() + "agent-my-listing/" + AgnetID, "_blank");
  };
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
  function onChange(value) {
    console.log("Captcha value:", value);
    setCaptcha(true);
  }
  const ImageModal = (image) => {
    setOpenImageModal(true);
    setImageUrl(image);
  };
  const setVideoModal = (video) => {
    setOpenVideoModal(true);
    setVideoUrl(video);
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
        items: 2,
      },

      1024: {
        items: 3,
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
  const propsimg = {
    width: 500,
    height: 450,
    zoomPosition: "original",
    zoomWidth: 500,
    zoomStyle: "z-index:9999;",
  };
  const handleInputMailChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setSendMail({ ...sendMail, [name]: value });
  };
  const sendMailAgent = () => {
    setOpen(true);
    sendMail.authenticate_key = "abcd123XYZ";
    sendMail.tourId = ThemeId;
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
    amenityData.tourId = ThemeId;
    setOpen(true);
    postRecord(APIGetScheduleAppointment, amenityData).then((res) => {
      console.log(res);
      if (res.data[0].response.status === "success") {
        setOpen(false);
        setMessage(res.data[0].response.message);
        setOpenSuccess(true);
        setSync(false);
        setopenAppointment(false);
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
  // const listItems1 = floorPlanData.map((number) => <li><img src={number.imageurl}></img></li>);
  const listitems1 = (
    <ul class="rslides" id="slider4">
      {floorPlanData.map((number) => (
        <li>
          <img src={number.imageurl}></img>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <div class="wrapper theme4" id="home">
        <div
          id="kb"
          class="carousel slide kb_elastic animate_text kb_wrapper"
          data-ride="carousel"
        >
          {/* <!--======= Wrapper for Slides =======--> */}
          {/* {imageData.length > 0 ? (
                        <OwlCarousel margin={10} {...options2}  >
                            {imageData.map(res => (
                                <div class="carousel-item active verticalimage">
                                    <img src={res.imageurl} />
                                    <div class="container">
                                        <div class="carousel-caption kb_caption kb_caption_center">
                                            <h1 data-animation="animated flipInX">{res.caption}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    ) : (
                        ""
                    )} */}
          <div class="carousel-inner">
            {imageData.map(
              (res, index) =>
                index === 0 ? (
                  <div class="carousel-item active verticalimage">
                    <img src={res.imageurl} />
                    <div class="carousel-caption kb_caption kb_caption_center">
                      <h1 data-animation="animated flipInX">{res.caption}</h1>
                    </div>
                  </div>
                ) : (
                  <div class="carousel-item verticalimage">
                    <img src={res.imageurl} />
                    <div class="carousel-caption kb_caption kb_caption_center">
                      <h1 data-animation="animated flipInX">{res.caption}</h1>
                    </div>
                  </div>
                )
              // <div class="carousel-item active verticalimage">
              //     <img src={res.imageurl} />
              //     <div class="container">
              //         <div class="carousel-caption kb_caption kb_caption_center">
              //             <h1 data-animation="animated flipInX">{res.caption}</h1>
              //         </div>
              //     </div>
              // </div>
            )}

            {/* <div class="carousel-item">
                            <img src={verticalBanner} alt="slider 01" />
                            <div class="carousel-caption kb_caption kb_caption_center">
                                <h1 data-animation="animated flipInX">Title Goes Here</h1>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={verticalBanner} alt="slider 01" />
                            <div class="carousel-caption kb_caption kb_caption_center">
                                <h1 data-animation="animated flipInX">Title Goes Here</h1>
                            </div>
                        </div> */}
          </div>
          {/* <div class="my-bottom-img">
                        <div id="main-title">

                            <h1 class="intro">
                                <span class="inner">
                                    <span class="agent">Executive Home with Bay View</span>
                                    <hr />
                                    <span class="subtitle">Exceptional Stonebrae Country Club Home</span>
                                    <span class="address-price">6 Sonas Place&nbsp; $1,450,000</span>
                                </span>

                            </h1>
                        </div>
                    </div> */}
        </div>
        {/* <!--=========================== Menu ===========================--> */}
        <div id="sticky" class="sticky">
          <header class="blacknew">
            <div class="header_inner clearfix">
              <div class="header_bottom clearfix">
                <div class="container">
                  <div class="header-boxfull">
                    <div class="company-name">{tourDetailsData.Caption}</div>
                    <div class="topmenu">
                      <nav id="cssmenu" class="head_btm_menu">
                        <ul>
                          <li>
                            <a href="#home">Home</a>
                          </li>
                          <li>
                            <a href="#features">Features</a>
                          </li>
                          <li>
                            <a href="#photos">Photos</a>
                          </li>
                          <li>
                            <a href="#">Location</a>
                          </li>
                          <li>
                            <a href="#PresentedBy">Presented By</a>
                          </li>
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
                                <a href="javascript:void()" onClick={viewFlyer}>
                                  Printable Flyer
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">Contact</a>
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
                        </ul>
                      </nav>
                    </div>
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
                </div>
              </div>
            </div>
          </header>
        </div>
        {/* <!--=========================== Bodywork TOp ===========================--> */}
        <div class="bodycontent">
          <div class="container">
            <div class="row second_section">
              <div class="col-sm-12">
                <h3>{tourDetailsData.Caption}</h3>
                <small>
                  {tourData.city}, {statename} {tourData.zipcode}
                </small>
                <p>{tourData.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="property_details" id="features">
          <div class="property_details_left">
            <div class="page_title">
              <h4>Property Details</h4>
            </div>

            <div class="row">
              <div class="col-sm-12 property_details_content">
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
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.Price === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{"$ " + tourDetailsData.Price}</span>
                          )}
                        </td>
                        <td>
                          <strong>Bed</strong>
                        </td>
                        <td>
                          {" "}
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.Beds === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
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
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.Baths === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{tourDetailsData.Baths}</span>
                          )}
                        </td>
                        <td>
                          <strong>Square Feet :</strong>
                        </td>
                        <td>
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.InteriorSqFt === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{tourDetailsData.InteriorSqFt}</span>
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
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.Garage === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{tourDetailsData.Garage}</span>
                          )}
                        </td>
                        <td>
                          <strong>Year Built :</strong>
                        </td>
                        <td>
                          {" "}
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.YearBuilt === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
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
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.LotSize === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{tourDetailsData.LotSize}</span>
                          )}
                        </td>
                        <td>
                          <strong style={{ fontSize: "15px" }}>
                            School District :
                          </strong>
                        </td>
                        <td>
                          {" "}
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.SchoolDistrict === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
                          ) : (
                            <span>{tourDetailsData.SchoolDistrict}</span>
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
                          {Object.keys(tourDetailsData).length > 0 &&
                          tourDetailsData.MLS === null ? (
                            <span style={{ marginLeft: "10px" }}>N/A</span>
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
                <strong style={{ display: "block" }}>Share This On</strong>
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
          <div class="property_details_right">
            <iframe
              src="https://my.matterport.com/show/?m=kLiWaP795E5"
              allowfullscreen=""
              width="100%"
              height="580"
              frameborder="0"
            ></iframe>
          </div>
        </div>

        {/* <!--=========================== Gallery ===========================--> */}
        <div
          class=""
          id="location"
          style={{
            backgroundImage: "url(" + bg4 + ")",
            backgroundPosition: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <div class="page_title">
                  <h4 class="white">Floor Plans</h4>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-10 m-auto">
                  <div class="callbacks_container">
                    <ul class="rslides" id="slider4">
                      {floorPlanData &&
                        floorPlanData.map((res) => (
                          <li>
                            <img src={res.imageurl} alt="" />
                          </li>
                        ))}
                    </ul>
                    {listitems1}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="spacer1px" />
        {imageData.length >0 ?
        <div class="bodycontent_gallery" id="photos">
          <h4>Photo Gallery</h4>
          <ul>
            {imageData.map((res) => (
              <li>
                <div class="gallerybox">
                  <div class="image-holder" style={{ height: "300px" }}>
                    {/* <div class="gallery_bgimage" style={{ backgroundImage: "url(" + res.imageurl + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>&nbsp;</div> */}
                    <img
                      src={res.imageurl}
                      class="gallery_bgimage"
                      style={{
                        backgroundPosition: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    />
                    <span class="gallery_title">Image</span>
                    <div class="overlay">
                      <div class="button">
                        <p>{res.caption}</p>
                        <a
                          class="example-image-link"
                          onClick={() => ImageModal(res.imageurl)}
                          data-title="Title Goes Here"
                        >
                          <img src={imageIcons} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        :''}
        <hr class="spacer1px" />
        {/* <!--=========================== Video Gallery ===========================--> */}
        {videoData.length >0 ?
        <div class="bodycontent_gallery" id="photos">
          <h4>Video Gallery</h4>
          <ul>
            {videoData.map((res) => (
              <li>
                <div class="gallerybox">
                  <div class="image-holder">
                    <div
                      class="gallery_bgimage"
                      style={{
                        backgroundImage: "url(" + banner3 + ")",
                        backgroundPosition: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      &nbsp;
                    </div>
                    <span class="gallery_title">Video</span>
                    <div class="overlay">
                      <div class="button">
                        <p>{res.caption}</p>
                        <a
                          class="example-image-link"
                          href="#"
                          onClick={() => setVideoModal(res.videurl)}
                          data-title={res.caption}
                        >
                          <img src={playIcon} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            {/* <li>
                            <div class="gallerybox">
                                <div class="image-holder">
                                    <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>&nbsp;</div>
                                    <span class="gallery_title">Panoroma</span>
                                    <div class="overlay">
                                        <div class="button">
                                            <p>Title Goes Here</p><a class="example-image-link" href="#"
                                                data-lightbox="example-1" data-title="Title Goes Here"><img
                                                    src={playIcon} alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>



                        <li>
                            <div class="gallerybox">
                                <div class="image-holder">
                                    <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>&nbsp;</div>
                                    <span class="gallery_title">Panoroma</span>
                                    <div class="overlay">
                                        <div class="button">
                                            <p>Title Goes Here</p><a class="example-image-link" href="#"
                                                data-lightbox="example-1" data-title="Title Goes Here"><img
                                                    src={playIcon} alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="gallerybox">
                                <div class="image-holder">
                                    <div class="gallery_bgimage" style={{ backgroundImage: "url(" + banner3 + ")", backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>&nbsp;</div>
                                    <div class="overlay">
                                        <div class="button">
                                            <p>Title Goes Here</p><a class="example-image-link" href="#"
                                                data-lightbox="example-1" data-title="Title Goes Here"><img
                                                    src={playIcon} alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */}
          </ul>
        </div>
        :""}
        <hr class="spacer1px" />
        {panoromaData.length >0 ?
        <div class="bodycontent_gallery" id="photos">
          <h4>Panoroma Gallery</h4>
          <ul>
            {panoromaData.map((res) => (
              <li>
                <div class="gallerybox">
                  <div class="image-holder">
                    <div
                      class="gallery_bgimage"
                      style={{
                        backgroundImage: "url(" + banner3 + ")",
                        backgroundPosition: "fixed",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      &nbsp;
                    </div>
                    <span class="gallery_title">Panoroma</span>
                    <div class="overlay">
                      <div class="button">
                        <p>{res.caption}</p>
                        <a
                          class="example-image-link"
                          onClick={() => setPanoModal(res.panurl)}
                          data-title="Title Goes Here"
                        >
                          <img src={playIcon} alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        :''}
        <hr class="spacer1px" />
        {/* <!--=========================== Direction ===========================--> */}
        <div class="presentedby_map">
          <div class="presentedby_map_left">
            <div class="page_title">
              <h4 class="white">Property Location</h4>
            </div>
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
          <div class="presentedby_map_right presentedby_left">
            <div class="page_title" id="PresentedBy">
              <h4 class="white">Presented By</h4>
            </div>
            <div class="row ">
              <div class="col-sm-4 agent_img">
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
                <hr class=" spacer20px" />
              </div>
            </div>
            <div class="row ">
              <div class="col-sm-4 agent_img">
                {Object.keys(coAgentData).length > 0 ? (
                  <img
                    src={coAgentData.profile_img}
                    alt=""
                    title=""
                    style={{ width: "100%" }}
                  />
                ) : (
                  <Skeleton variant="text" width={250} height={70} />
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
            <hr class=" spacer20px" />
            <div class="row">
              <div class="col-sm-12">
                <a href={"mailto:" + coAgentData.email} class="agentbtn">
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
        </div>
        <hr class="spacer1px" />
        {/* <!--=========================== Contact ===========================--> */}
        <section class="section bg-light" id="contact">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <h4>Send Me Details And Market Information For This Home</h4>
              </div>
            </div>
            <div class="row vertical-content">
              <div class="col-lg-7">
                <div class="mt-3 bg-white contact_form mx-auto rounded">
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMailAgent();
                    }}
                  >
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group mt-2">
                          <input
                            id="name"
                            type="text"
                            class="form-control"
                            placeholder="First Name"
                            required=""
                            name="first_name"
                            value={sendMail.first_name}
                            onChange={handleInputMailChange}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group mt-2">
                          <input
                            id="name"
                            type="text"
                            class="form-control"
                            placeholder="Last Name"
                            required=""
                            name="last_name"
                            value={sendMail.last_name}
                            onChange={handleInputMailChange}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group mt-2">
                          <input
                            id="email"
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            required=""
                            name="contact_email"
                            value={sendMail.contact_email}
                            onChange={handleInputMailChange}
                          />
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group mt-2">
                          <input
                            type="tel"
                            class="form-control"
                            id="subject"
                            placeholder="Phone"
                            name="phone"
                            value={sendMail.phone}
                            onChange={handleInputMailChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group mt-2">
                          <textarea
                            id="comments"
                            rows="4"
                            class="form-control"
                            placeholder="Comments"
                            name="comments"
                            value={sendMail.comments}
                            onChange={handleInputMailChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <hr class="spacer10px" />
                    <div class="row">
                      <div class="col-lg-12 text-left mt-2">
                        <input
                          type="submit"
                          class="btn btn-custom text-uppercase"
                          value="Send "
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="contact_detail mt-3 mx-auto rounded">
                  <img src={vtcLogo} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--=========================== Footer ===========================--> */}
        <div class="bodycontent_footerbtm">
          <div class="container">
            <div class="row">
              <div class="col-sm-6 footerbtm_left">
                <img src={footerIcon1} alt="" />
                <img src={footerIcon2} alt="" />
                <br />
                Information deemed reliable but not guaranteed
                <br />© 2022{" "}
                <a href="http://virtualtourcafe.com/" target="_blank">
                  VirtualTourCafe
                </a>
                <br />
              </div>

              <div class="col-sm-6 footerbtm_right">
                <span>Powered by</span> <img src={vtcLogoTop} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* <!--============================= Scripts =============================--> */}
        <a href="#" class="back-to-top" style={{ display: "none" }}>
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
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
                <div class="">
                  <div class="browse_img_head">
                    <h5>Appliances</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.appliances.length > 0 ? (
                        amenities.appliances.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="alert alert-success">
                            <strong>No!</strong>
                            <a href="#" class="alert-link">
                              {" "}
                              Amenities Found
                            </a>
                            .
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Community</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.community.length > 0 ? (
                        amenities.community.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="alert alert-success">
                            <strong>No!</strong>
                            <a href="#" class="alert-link">
                              {" "}
                              Amenities Found
                            </a>
                            .
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Exterior</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.exterior.length > 0 ? (
                        amenities.exterior.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="alert alert-success">
                            <strong>No!</strong>
                            <a href="#" class="alert-link">
                              {" "}
                              Amenities Found
                            </a>
                            .
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="browse_img_head">
                    <h5>Interior</h5>
                  </div>
                  <div class="menu_opt_sec">
                    <div class="mar_top row">
                      {Object.keys(amenities).length > 0 &&
                      amenities.interior.length > 0 ? (
                        amenities.interior.map((res) => (
                          <div class="col-lg-4 col-md-4">
                            <div class="app_preview">
                              <p style={{ marginLeft: "10px" }}>
                                {res.amenityname}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div class="col-lg-4 col-md-4">
                          <div class="alert alert-success">
                            <strong>No!</strong>
                            <a href="#" class="alert-link">
                              {" "}
                              Amenities Found
                            </a>
                            .
                          </div>
                        </div>
                      )}
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
        Transition
        Component={Transition}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openVideoModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional Video Modal
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
              src={videoUrl}
              width="100%"
              style={{ height: "500px" }}
              autoPlay
            />
          </div>
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
          Additional Image Modal
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
      <Dialog
        maxWidth={maxWidth}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPanoromaModal}
      >
        <DialogTitle id="customized-dialog-title">
          Additional Panoroma Modal
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
          </div>
        </DialogContent>
      </Dialog>
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
