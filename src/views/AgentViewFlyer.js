import React, { useState, useEffect, useContext } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Skeleton from '@material-ui/lab/Skeleton';
import { Link, useHistory } from "react-router-dom";
import { APIURL, APIPath } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import { AuthContext } from "../CommonMethods/Authentication";
const APIGetViewFlyerData = APIURL() + "view-flyer";
const APIGetTourInfo = APIURL() + "get-Tourinfo";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AgentViewFlyerActive(props) {
    //const flyerId = props.match.params.flyerid;
    const themeid = props.match.params.themeid;
    const agentId = props.match.params.id;
    console.log(themeid, agentId)
    console.log(props);
    const { dispatch } = useContext(AuthContext);
    const context = useContext(AuthContext);
    let history = useHistory();
    const [sync, setSync] = useState(true);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [tourData, setTourData] = useState({});
    const [link, setLink] = useState("");
    const [tourDetailsData, setTourDetailsData] = useState({});
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    useEffect(() => {
        const objusr = { authenticate_key: "abcd123XYZ", tourId: themeid, agent_id: agentId };
        console.log(objusr)
        postRecord(APIGetViewFlyerData, objusr)
            .then(res => {
                console.log(res);
                if (res.data[0].response.status === "success") {
                    setTourData(res.data[0].response.tourData)
                    setLink(res.data[0].response.tourData.tourid);
                    console.log(res.data[0].response.tourData);
                }
            })
    }, [sync, agentId, themeid]);
    useEffect(() => {
        const objusr = { authenticate_key: "abcd123XYZ", agentId: agentId, tourid: themeid }
        postRecord(APIGetTourInfo, objusr)
            .then(res => {
                console.log(res);
                if (res.data[0].response.status === "success") {
                    //console.log(res.data[0].response.dataDetails);
                    //setTourInfo(res.data[0].response.dataDetails.dataProvider)
                    //setImageData(res.data[0].response.dataDetails.dataProvider);
                    // setVideoData(res.data[0].response.dataDetails.dataProvider2);
                    setTourDetailsData(res.data[0].response.dataDetails.tourdetails)
                    console.log(res.data[0].response.dataDetails.tourdetails)
                }

            })
    }, [agentId, themeid])
    const handleViewFlyerActiveLink = () => {
        window.location.href = APIPath() + "agent-flyer-tour/" + themeid;
    }
    return (
        <>
            <div class="container" >
                <div class="container-fluid"  >
                    <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", height: "auto" }}>
                        <div class="col-lg-7 col-md-7" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }} >
                            <p style={{ color: "white", textAlign: "center", width: "100%", lineHeight: "80px" }}>
                                TEST<br></br>
                                {Object.keys(tourData).length > 0 ? (
                                    <span style={{ textTransform: "uppercase" }}>{tourData.city} {tourData.countryname}</span>
                                ) : (
                                    <Skeleton variant="text" width={250} height={100} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                )}
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(52, 52, 52)", marginLeft: "10px" }}>
                            <div class="row">
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                                    {/* <img src={photo} width="80px" height="80px" style={{ border: "2px solid white", margin: "5px" }}></img> */}
                                    {/* <img src={logo1} width="80px" height="100px" style={{ border: "2px solid white" }}></img> */}
                                </div>
                                <div style={{ textAlign: "center", width: '100%', color: "white" }}>
                                    <p style={{ color: "white", marginBottom: "0px" }}>
                                        {Object.keys(tourData).length > 0 ? (
                                            <span style={{ textTransform: "capitalize" }}>{tourData.caption} {tourData.countryname}</span>
                                        ) : (
                                            <Skeleton variant="text" width={250} height={60} style={{ background: "#bbbbbb", margin: "0 auto" }} />
                                        )}
                                    </p>
                                    <p style={{ color: "white", marginBottom: "0px" }}>Test New Company
                                    </p >
                                    <p style={{ color: "white" }}>123-111-2232</p>
                                </div>
                                <div style={{ textAlign: "center", width: '100%', color: "white" }}>
                                    <p style={{ color: "white" }}>Lic# MS03212s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", marginTop: "05px" }}>
                        <div class="col-lg-7 col-md-7" style={{ marginLeft: "10px", backgroundImage: "url(" + "" + ")", backgroundSize: "cover", backgroundPosition: "fixed", height: "500px" }} >

                        </div>
                        <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }}>
                            <h5></h5>
                        </div>
                    </div>
                    <div class="row" style={{ display: "flex", justifyContent: "center", alignItem: "center", width: "100%", height: "250px", marginTop: "05px" }}>
                        <div class="col-lg-7 col-md-7" style={{ backgroundColor: "rgb(0, 174, 229)", marginLeft: "10px" }} >
                            <h5>
                                {/* Offered At: c$36,587,648 */}
                            </h5>
                            <h6>Features</h6>
                            <div style={{ display: "flex", justifyContent: "space-around", alignItem: "center", width: "100%" }} >
                                <div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}> BEDROOMS : </p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.Beds === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.Beds}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}>BATHROOMS :</p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.Baths === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.Baths}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}>GARAGE :</p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.Garage === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.Garage}</span>
                                            )}
                                        </div>
                                    </div>


                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}>YEAR BUILT  :</p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.YearBuilt === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.YearBuilt}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}>LOT SIZE  :</p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.LotSize === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.LotSize}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-06">
                                            <p style={{ color: "white" }}>LOT SIZE  :</p>
                                        </div>
                                        <div class="col-lg-06">
                                            {(Object.keys(tourDetailsData).length > 0 || tourDetailsData.InteriorSqFt === "") ? (
                                                <span style={{ color: "whitesmoke" }}>N/A</span>
                                            ) : (
                                                <span>{tourDetailsData.InteriorSqFt}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4" style={{ backgroundColor: "rgb(52, 52, 52)", marginLeft: "10px" }}>
                            <div class="row">
                                <div style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "80px" }}>
                                    {/* <p style={{ color: "white" }}>https://virtualtourcafe.com/tour/4778003</p> */}
                                    <p class="img_set_para">
                                        <a onClick={handleViewFlyerActiveLink} style={{ color: "black" }}><span style={{ color: "", textDecoration: "underline", fontStyle: "italic", marginBottom: "5px" }}>https://virtualtourcafe.com/agent-flyer-tour/{link}</span></a>
                                    </p>
                                    <p style={{ color: "white" }}>All information deemed reliable, but not guaranteed.</p>
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
