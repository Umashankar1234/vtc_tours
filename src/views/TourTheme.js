import React, { useState, useEffect, useContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Link, useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import { AuthContext } from "../CommonMethods/Authentication";
const APIGetTourDetails = APIURL() + "tour-details";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const options2 = {
    lazyLoad: true,
    loop: true,
    margin: 20,
    responsiveClass: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: false,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    smartSpeed: 2500,
    nav: false,
    dots: true,
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 2
        },

        1024: {
            items: 3
        },

        1366: {
            items: 1
        }
    }
};
export default function TourTheme(props) {
    //const flyerId = props.match.params.flyerid;
    const themeid = props.match.params.themeid;
    const agentId = props.match.params.id;
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    let history = useHistory();
    const [sync, setSync] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [tourData, setTourData] = useState({});
    const [agentData, setAgentData] = useState({});
    const [allImages, setAllImages] = useState({});
    const [allVideos, setAllVideos] = useState({});
    const [panoramaData, setPanoramaData] = useState({});
    const [floorPlanData, setFloorPlanData] = useState({});
    const [amenities, setAmenities] = useState({});
    const [styles, setStyles] = useState({});
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    useEffect(() => {
        const objusr = { authenticate_key: "abcd123XYZ", tourid: themeid, agentId: agentId };
        console.log(objusr)
        postRecord(APIGetTourDetails, objusr)
            .then(res => {
                // console.log(res.data[0].response);
                if (res.data[0].response.status === "success") {
                    setTourData(res.data[0].response.tourdetails);
                    setAgentData(res.data[0].response.agentDetails);
                    setAllImages(res.data[0].response.dataProvider);
                    setAllVideos(res.data[0].response.dataProvider2[0]);
                    setPanoramaData(res.data[0].response.dataProvider3);
                    setFloorPlanData(res.data[0].response.dataProvider4);
                    setAmenities(res.data[0].response.amenities);
                    setStyles(res.data[0].response.Style);
                }
            })
    }, [sync, agentId, themeid]);
    // console.log(allVideos);
    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 p-0">
                        {Object.keys(agentData).length > 0 ? (
                            <img src={agentData.company_details.companybanner} alt="" style={{ width: "100%", backgroundSize: "cover", height: "200px", paddingLeft: "15px", paddingRight: "15px", paddingBottom: "20px" }} />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div class="wrapper theme4 theme5" id="home">
                    <div id="sticky">
                        <header class="blacknew" style={{ backgroundColor: styles.backgroundColor }}>
                            <div class="header_inner clearfix">
                                <div class="header_bottom clearfix">
                                    <div class="container">
                                        <div class="header-boxfull">
                                            <div class="topmenu">
                                                <nav id="cssmenu" class="head_btm_menu">
                                                    <ul>
                                                        <li><a href="#"><i class="far fa-home"></i><br />VIRTUAL TOUR</a>
                                                            <ul>
                                                                <li><a href="#">Click Here to see Virtual Tour</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fas fa-images"></i><br />GALLERY</a>
                                                            <ul>
                                                                <li><a href="#">Click Here to see Theater</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fas fa-copy"></i><br />DETAILS</a>
                                                            <ul>
                                                                <li><a href="#">Property Information</a></li>
                                                                <li><a href="#">Amenities</a></li>
                                                                <li><a href="#">Printable Flyer</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fas fa-id-badge"></i><br />CONTACT</a>
                                                            <ul>
                                                                <li><a href="#">Agent Info</a></li>
                                                                <li><a href="#">Contact Agent</a></li>
                                                                <li><a href="#">Schedule Appointment</a></li>
                                                                <li><a href="#">My Listings</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fas fa-tools"></i><br />TOOLS</a>
                                                            <ul>
                                                                <li><a href="#">Map View</a></li>
                                                                <li><a href="#">Aerial View</a></li>
                                                                <li><a href="#">Mortgage Calculator</a></li>
                                                                <li><a href="#">Walk Score</a></li>
                                                                <li><a href="#">Area Schools</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#"><i class="fas fa-share-alt"></i><br />SHARE</a>
                                                            <ul>
                                                                <li><a href="#">Send to a Friend</a></li>
                                                                <li><a href="#">Save Tour to Desktop</a></li>
                                                                <li><a href="#">Service Links</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <iframe width="100%" height="440" autoplay src={allVideos.videurl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    {/* <div id="myCarousel" class="carousel slide kb_elastic animate_text kb_wrapper" data-ride="carousel">
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">

                            {allImages.length > 0 ? (
                                <OwlCarousel margin={10} {...options2}  >
                                    {allImages.map(res => (
                                        <div class="carousel-item active">
                                            <img src={res.imageurl} />
                                            <div class="container">
                                                <div class="carousel-caption">
                                                    <h1>{res.caption}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </OwlCarousel>
                            ) : (
                                ""
                            )}
                        </div>
                    </div> */}
                    <div class="bodycontent pt-0">
                        <div class="containerextra">
                            <div class="body-mid-work">
                                <div class="row">
                                    <div class="col-lg-4"><div class="profile-blue-main">
                                        <div class="profile-blue" style={{ backgroundColor: styles.backgroundColor }}>
                                            <div class="profile-blue-left">
                                                {Object.keys(agentData).length > 0 ? (
                                                    <img src={agentData.agent_profile.profile_img} alt="" />
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div class="profile-blue-right">
                                                {Object.keys(agentData).length > 0 ? (
                                                    <>
                                                        <h3>{agentData.agent_profile.name}</h3>
                                                        <p>{agentData.company_details.company}</p>
                                                        <span style={{ lineBreak: "anywhere" }}>{agentData.email}</span>
                                                    </>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div class="profile-greybg">
                                            <ul>
                                                {Object.keys(agentData).length > 0 ? (
                                                    <>
                                                        <li><label>Mobile</label>{agentData.mobile}</li>
                                                        <li><label>Office</label>{agentData.company_details.officephone}</li>
                                                        <li><label>Agent Lic#</label> {agentData.licenceno} </li>
                                                    </>
                                                ) : (
                                                    ""
                                                )}

                                            </ul>
                                        </div>
                                        <div class="profile-propertyinfo">Property Info</div>
                                        <div class="profile-greybg">
                                            <h6>Price :  $ {Object.keys(tourData).length > 0 ? (
                                                tourData.price
                                            ) : (
                                                ""
                                            )}</h6>
                                        </div>
                                    </div></div>
                                    <div class="col-lg-8">
                                        <div class="social-media" style={{ backgroundColor: styles.backgroundColor }}>
                                            <a href="#"><i class="fab fa-twitter"></i></a>
                                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                                            <a href="#"><i class="fab fa-instagram"></i></a>
                                        </div>
                                        <div class="theme5  googlemap">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.1964453307073!2d85.81233871487285!3d20.250686019259202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a70f034c758d%3A0xda434edd567b3553!2sBiju%20Patnaik%20International%20Airport!5e0!3m2!1sen!2sin!4v1649231212106!5m2!1sen!2sin" width="100%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="spacer30px" />
                            <div class="footer-grey">
                                <div class="row align-items-center">
                                    <div class="col-md-6"><img src="images/footer-logo.png" alt="" /></div>
                                    <div class="col-md-6 text-right"> Copyrights Reserved 2021</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={openError} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
