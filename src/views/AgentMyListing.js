import React, { useState, useEffect, useContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Skeleton from '@material-ui/lab/Skeleton';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CancelIcon from '@material-ui/icons/Cancel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { APIURL, APIPath } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import { AuthContext } from "../CommonMethods/Authentication";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
const APIGetUserData = APIURL() + "user-details";
const APIGetActiveImagesetList = APIURL() + "get-activeimagesetlist";
const APIGetTourDetails = APIURL() + "tour-details";
const APISendContactMail = APIURL() + "get-Contact-Agent";
const APIGetTourInfo = APIURL() + "get-Tourinfo";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentMylisting(props) {
    console.log(props);
    const AgentId = props.match.params.listingId;
    const Tourid = props.match.params.tourid;
    console.log(props);
    const useStyles = makeStyles((theme) => ({
        backdrop: {
            zIndex: theme.zIndex.drawer + 500,
            color: '#fff',
        },
    }));
    const classes = useStyles();
    const [sync, setSync] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [openAgentinfo, setopenAgentInfo] = useState("");
    const [openContactinfo, setopenContactInfo] = useState("");
    const context = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState({});
    const [banner, setBanner] = useState("");
    const [companyInformation, setCompanyInformation] = useState({});
    const [activeImageListData, setActiveImageListData] = useState([]);
    const [themeId, setThemeId] = useState("");
    const [id, setId] = useState("");
    const [contactMail, setContactMail] = useState({});
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
        username: ""
    });
    const [tourDetailsData, setTourDetailsData] = useState({});
    const [orderByData, setOrderByData] = useState({});
    const [captcha, setCaptcha] = useState("");
    const characters = 'abc123';
    useEffect(() => {
        generateString(6);
    }, []);
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCaptcha(result);
        //return result;
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    useEffect(() => {
        const objusr = { authenticate_key: "abcd123XYZ", agent_id: AgentId };
        console.log(objusr)
        postRecord(APIGetUserData, objusr)
            .then(res => {
                console.log(res);
                if (res.data[0].response.status === "success") {
                    setCurrentUser(res.data[0].response.data.agent_profile);
                    console.log(res.data[0].response.data.agent_profile.company_details);
                    setCompanyInformation(res.data[0].response.data.agent_profile.company_details)
                }
            });
    }, [AgentId]);
    useEffect(() => {
        const objusr = { authenticate_key: "abcd123XYZ", agent_id: AgentId };
        postRecord(APIGetActiveImagesetList, objusr)
            .then(res => {
                console.log(res);
                if (res.data[0].response.status === "success") {
                    setBanner(res.data[0].response.bannerurl);
                    setActiveImageListData(res.data[0].response.data);
                    console.log(res.data[0].response.data)
                }
            });

    }, [AgentId])
    useEffect(() => {

        const agent_id = AgentId;
        if (themeId === 1) {
            //window.location.href = "http://localhost:3001/theme-template/" + id + APIPath() + agent_id;
            window.location.href = "http://139.59.28.82/vtc_tours/theme-template/" + id + APIPath() + agent_id;
            setThemeId("");
        } else if (themeId === 2) {
            window.location.href = "http://139.59.28.82/vtc_tours/theme-template1/" + id + APIPath() + agent_id;
            setThemeId("");
        } else if (themeId === 3) {
            window.location.href = "http://139.59.28.82/vtc_tours/theme-template2/" + id + APIPath() + agent_id;
            // window.location.href = "http://localhost:3001/theme-template/" +  id + APIPath() + agent_id;
            setThemeId("");
        } else if (themeId === 4) {
            // window.location.href = "http://localhost:3001/theme-template3/" + id + APIPath() + agent_id;
            window.location.href = "http://139.59.28.82/vtc_tours/theme-template3/" + id + APIPath() + agent_id;
            setThemeId("");
        }
    }
        , [themeId, AgentId, id])


    const selectOrderbyChange = (event) => {
        const { name, value } = event.target;
        setOrderByData({ ...orderByData, [name]: value });
        const objusr = { authenticate_key: "abcd123XYZ", agent_id: AgentId, order: event.target.value };
        console.log(objusr)
        postRecord(APIGetActiveImagesetList, objusr)
            .then(res => {
                //console.log(res);
                if (res.data[0].response.status === "success") {
                    setActiveImageListData(res.data[0].response.data)
                    setMessage(res.data[0].response.status);
                    setOpenSuccess(true);
                    //setSync(false)
                }
                else {
                    setMessage(res.data[0].response.status);
                    setOpenError(true);
                    //setSync(false);
                }
                //setSync(true);
            })

    }

    const RedirectThemePage = (id) => {
        const objusr = { authenticate_key: "abcd123XYZ", agentId: AgentId, tourid: id }
        console.log(objusr);
        postRecord(APIGetTourDetails, objusr)
            .then(res => {
                console.log(res);
                if (res.data[0].response.status === "success") {
                    setThemeId(res.data[0].response.tourdetails.premium_tour_theme);
                }
            })
    }
    //console.log(id)
    //get-Contact-Agent
    const inputHandleChange = (event) => {
        console.log(event.target.value);
        const { name, value } = event.target;
        setContactMail({ ...contactMail, [name]: value });
    }
    const saveContactAgent = () => {
        setOpen(true);
        if (captcha == user.username) {
            contactMail.authenticate_key = "abcd123XYZ";
            contactMail.tourId = Tourid;
            contactMail.agentId = AgentId;
            contactMail.first_name = contactMail.first_name;
            contactMail.last_name = contactMail.last_name;
            contactMail.contact_email = contactMail.contact_email;
            console.log(contactMail);
            postRecord(APISendContactMail, contactMail)
                .then((res) => {
                    if (res.data[0].response.status === "success") {
                        setOpen(false);
                        setOpenSuccess(true);
                        setMessage()
                    } else {
                        setOpenError(true);
                        setMessage();
                    }
                })
        } else if (captcha == "") {
            setOpenError(true);
            // setMessage("You Entered Invalid captcha")
            setMessage("Please Enter Captcha");
        } else {
            setOpenError(true);
            setMessage("Please Enter Captcha");
        }
    }
    const generatenewcode = () => {
        generateString(6);
    }
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        user[name] = value;
        setUser(user);
    }
    return (
        <>
            <section class="container">
                <div class="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div class="col-lg-12">
                        <img src={banner} style={{ backgroundPosition: "fixed", backgroundRepeat: "no-repeat", backgroundSize: "cover", width: "100%", marginTop: "15px", marginBottom: "15px" }}></img>
                    </div>
                    <div class="col-lg-12">
                        <div style={{ background: "#2187a8 ", width: "100%", height: "auto", padding: "15px" }}>
                            <h6 style={{ color: "whitesmoke", margin: "5px", fontSize: "16px" }}>{currentUser.name}</h6>
                            <h6 style={{ color: "whitesmoke", margin: "5px", fontSize: "16px" }}>{companyInformation.company}</h6>
                            <h6 style={{ color: "whitesmoke", margin: "5px", fontSize: "16px" }}>{companyInformation.officephone}</h6>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div style={{ background: "#2187a8 ", width: "100%", height: "auto", marginTop: "15px" }}>
                            <div class="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginRight: "20px", marginLeft: "20px" }}>
                                <div class="row" >
                                    <div class="col-lg-06">
                                        <h2 style={{ width: "100%", fontSize: "15px", marginTop: "15px", marginBottom: "15px", textAlign: "center", marginLeft: "20px", color: "white", cursor: "pointer" }} onClick={() => setopenAgentInfo(true)}> <i class="fas fa-user" style={{ color: "white", fontSize: "30px" }} ></i> profile</h2>
                                    </div>
                                    <div class="col-lg-06">
                                        <h2 style={{ width: "100%", fontSize: "15px", marginTop: "15px", marginBottom: "15px", textAlign: "center", marginLeft: "20px", color: "white", cursor: "pointer" }} onClick={() => setopenContactInfo(true)}> <i class="fas fa-address-card" style={{ color: "white", fontSize: "30px" }}></i> Contact</h2>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-lg-06">
                                        <h2 style={{ width: "100%", fontSize: "15px", marginTop: "15px", marginBottom: "15px", textAlign: "center", marginRight: "20px", color: "white", cursor: "pointer" }}>OrderBy</h2>
                                    </div>
                                    <div class="col-lg-06">
                                        <select style={{ width: "150px", fontSize: "15px", marginTop: "15px", marginBottom: "15px", textAlign: "center", marginRight: "40px", height: "30px" }} name="value_order" value={orderByData.value_order} onChange={selectOrderbyChange}>
                                            <option value="categoryname ASC">Status (asc)</option>
                                            <option value="categoryname DESC">Status (desc)</option>
                                            <option value="categoryname ASC">Creation Date (asc)</option>
                                            <option selected="selected" value="creationdate DESC">Creation Date (desc)</option>
                                            <option value="price ASC">Price (asc)</option>
                                            <option value="price DESC">Price (desc)</option>
                                            <option value="totalbedrooms ASC">Bedroom (asc)</option>
                                            <option value="totalbedrooms DESC">Bedroom (desc)</option>
                                            <option value="categoryname ASC">Bathroom (asc)</option>
                                            <option value="categoryname DESC">Bathroom (desc)</option>
                                        </select>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container" style={{ marginTop: "20px",  justifyContent: "space-between", alignItems: "center" }}>
                <div class="row imagelist">
                    {activeImageListData.map(res => (
                        <div class="col-md-4"
                            onClick={() => {
                                RedirectThemePage(res.id);
                                setId(res.id);
                            }}
                        >
                            <div class="card" style={{ height: "100%" }}>
                                <img class="card-img-top" src={res.filename} alt="Card image cap" style={{ height: "260px", border: "5px solid white" }} />
                                <div class="card-body">
                                    <h5 class="card-title">{res.caption}</h5>
                                    <h5 class="card-title">{res.countryname}</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Tour ID</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.id}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>MLS</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.mls}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Price</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.price}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Status</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.categoryname}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Beds</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.Beds}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <p>Baths</p>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{res.Baths}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Dialog maxWidth={maxWidth} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openAgentinfo}>
                <DialogTitle id="customized-dialog-title" >
                    Amenities
                    <CancelIcon onClick={() => setopenAgentInfo(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                                //saveCompanyBanner();
                            }}>
                            <div class="agent_pop_main">
                                <div class="">
                                    <div class="browse_img_head">
                                        <h5>Personal Information</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-lg-4 col-md-4">
                                                <div class="app_preview">
                                                    {/* <img src={photo} /> */}
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4">
                                                <p style={{ marginLeft: "10px" }}>{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.name
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.company
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Mobile-: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.mobile
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Email:{Object.keys(currentUser).length > 0 ? (
                                                    currentUser.email
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Office: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.officephone
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                                <p style={{ marginLeft: "10px" }}>Website: {Object.keys(currentUser).length > 0 ? (
                                                    currentUser.company_details.website
                                                ) : (
                                                    <Skeleton variant="text" width={150} height={20} style={{ background: "#bbbbbb" }} />
                                                )}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
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
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog maxWidth={maxWidth} fullWidth={true} onClose={handleClose} aria-labelledby="customized-dialog-title" open={openContactinfo}>
                <DialogTitle id="customized-dialog-title" >
                    Contact Agent
                    <CancelIcon onClick={() => setopenContactInfo(false)} style={{ float: "right", cursor: "pointer" }} />
                </DialogTitle>
                <DialogContent dividers>
                    <div class="container">
                        <form
                            onSubmit={event => {
                                event.preventDefault();
                                saveContactAgent();
                            }}>
                            <div class="agent_pop_main">
                                <div class="">
                                    <div class="browse_img_head">
                                        <h5>Personal Information</h5>
                                    </div>
                                    <div class="menu_opt_sec">
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                First Name *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="text" name="first_name" value={contactMail.first_name} onChange={inputHandleChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Last Name *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="text" name="last_name" value={contactMail.last_name} onChange={inputHandleChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Email  *
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="email" name="contact_email" value={contactMail.contact_email} onChange={inputHandleChange} class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Phone
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <input type="tel" name="phone" value={contactMail.phone} onChange={inputHandleChange} class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Comments
                                            </div>
                                            <div class="col-md-8" style={{ marginBottom: "15px" }}>
                                                <textarea type="text" name="comments" value={contactMail.comments} onChange={inputHandleChange} class="form-control" />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-4">
                                                Verify
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha"
                                                    name="username" onChange={handleChange} autocomplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div class="mar_top row">
                                            <div class="col-md-8">
                                                <h3 id="captcha" style={{ margin: "10px" }}>{captcha}</h3>
                                                <button id="succesBTN" onClick={generatenewcode} class="agentbtn">regenerate</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="browse_img_head">
                                        <button type="submit" class="agentbtn" style={{ marginTop: "15px" }}>Send</button>
                                    </div>
                                    <p>* Required Fields</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
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
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </>
    )
}