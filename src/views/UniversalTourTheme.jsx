import React, { useEffect } from "react";
import { APIURL } from "../CommonMethods/Fetch";
import { postRecord } from "../CommonMethods/Save";
import { useState } from "react";
import Themetemplate from "./ThemeTemplate";
import ThemeTemplate5 from "./ThemeTemplate5";
import Themetemplate1 from "./ThemeTemplate1";
import Themetemplate2 from "./ThemeTemplate2";
import Themetemplate4 from "./ThemeTemplate4";
import ThemeTemplate3 from "./ThemeTemplate3";
const APIGetTourDetails = APIURL() + "tour-details";

function UniversalTourTheme(props) {
  const tourid = props.match.params.tourid;
  const mls = props.mls;
  const strict = props.strict;
  const [allImages, setAllImages] = useState({});
  const [threeDs, setThreeDs] = useState({});
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeId, setThemeId] = useState("");
  const [is_premium_theme, setIs_premium_theme] = useState(null);
  const [agentId, setAgentId] = useState("");
  const [agentProfile, setAgentProfile] = useState("");
  const [amenities, setAmenities] = useState({});
  const [music, setMusic] = useState("");
  const [tourData, setTourData] = useState({});
  const [category, setCategory] = useState("");
  const [panoSetting, setPanoSetting] = useState({});
  const [slideSetting, setSlideSetting] = useState({});
  const [statename, setstatename] = useState(false);
  const [coAgentData, setCoAgentData] = useState([]);

  useEffect(() => {
    const objusr = {
      authenticate_key: "abcd123XYZ",
      tourid: tourid,
    };
    postRecord(APIGetTourDetails, objusr).then((res) => {
      if (res.data[0].response.status === "success") {
        setAgentProfile(res.data[0].response.agentDetails);
        setCoAgentData(res.data[0].response.coAgentData);
        setAmenities(res.data[0].response.amenities);
        setMusic(res.data[0].response.music);
        setTourData(res.data[0].response.tourdetails);
        setIs_premium_theme(res.data[0].response.tourdetails.is_premium_theme);
        setstatename(res.data[0].response.state);
        setCategory(res.data[0].response.category);
        setPanoSetting(res.data[0].response.panorama);
        setSlideSetting(res.data[0].response.slideshow);
        setThemeId(res.data[0].response.tourdetails.themeid);
        setAgentId(res.data[0].response.tourdetails.userid);
        setAllImages(res.data[0].response.dataProvider);
        setDocuments(res.data[0].response.document);
        setThreeDs(res.data[0].response.threeD)
        setLoading(false);
      }
    });
  }, [tourid]);
  const TourTheme = () => {
    if (is_premium_theme == 1) {
      if (tourData.premium_tour_theme == 1) {
        return (
          <Themetemplate
            themeId={tourData.premium_tour_theme}
            AgentId={agentId}
            agentProfile={agentProfile}
            amenities={amenities}
            music={music}
            tourData={tourData}
            category={category}
            panoSetting={panoSetting}
            slideSetting={slideSetting}
            statename={statename}
            coAgentData={coAgentData}
            tourid={tourid}
            mls={mls}
            strict={strict}
            threeDs={threeDs}
            documents={documents}
          />
        );
      } else if (tourData.premium_tour_theme == 2) {
        return (
          <Themetemplate1
            themeId={tourData.premium_tour_theme}
            AgentId={agentId}
            agentProfile={agentProfile}
            amenities={amenities}
            music={music}
            tourData={tourData}
            category={category}
            panoSetting={panoSetting}
            slideSetting={slideSetting}
            statename={statename}
            coAgentData={coAgentData}
            tourid={tourid}
            mls={mls}
            strict={strict}
            documents={documents}
            threeDs={threeDs}

          />
        );
      } else if (tourData.premium_tour_theme == 3) {
        return (
          <Themetemplate2
            themeId={tourData.premium_tour_theme}
            AgentId={agentId}
            agentProfile={agentProfile}
            amenities={amenities}
            music={music}
            tourData={tourData}
            category={category}
            panoSetting={panoSetting}
            slideSetting={slideSetting}
            statename={statename}
            coAgentData={coAgentData}
            tourid={tourid}
            mls={mls}
            strict={strict}
            documents={documents}
            threeDs={threeDs}


          />
        );
      } else if (tourData.premium_tour_theme == 4) {
        return (
          <ThemeTemplate3
            themeId={tourData.premium_tour_theme}
            AgentId={agentId}
            agentProfile={agentProfile}
            amenities={amenities}
            music={music}
            tourData={tourData}
            category={category}
            panoSetting={panoSetting}
            slideSetting={slideSetting}
            statename={statename}
            coAgentData={coAgentData}
            tourid={tourid}
            mls={mls}
            strict={strict}
            threeDs={threeDs}
            documents={documents}
          />
        );
      } else {
        return (
          <Themetemplate4
            themeId={tourData.premium_tour_theme}
            agentId={agentId}
            agentProfile={agentProfile}
            amenities={amenities}
            music={music}
            tourData={tourData}
            category={category}
            panoSetting={panoSetting}
            slideSetting={slideSetting}
            statename={statename}
            coAgentData={coAgentData}
            tourid={tourid}
            mls={mls}
            strict={strict}
            documents={documents}
            threeDs={threeDs}


          />
        );
      }
    } else {
      return (
        <ThemeTemplate5
          themeId={themeId}
          agentId={agentId}
          agentProfile={agentProfile}
          amenities={amenities}
          music={music}
          tourData={tourData}
          category={category}
          panoSetting={panoSetting}
          slideSetting={slideSetting}
          statename={statename}
          coAgentData={coAgentData}
          tourid={tourid}
          setAgentProfile={setAgentProfile}
          mls={mls}
          strict={strict}
          allImages={allImages}
          documents={documents}
          threeDs={threeDs}


        />
      );
    }
  };
  return (
    <>
      {themeId && is_premium_theme != null && themeId != "" && !loading ? (
        <TourTheme />
      ) : (
        <div className="showcase">
          <span class="loader"></span>
        </div>
      )}
    </>
  );
}

export default UniversalTourTheme;
