import axios from "axios";

export const APIURL = () => {
  //  return "https://thingproxy.freeboard.io/fetch/http://139.59.28.82/vtc/api/";
  // return "https://cors-anywhere.herokuapp.com/http://139.59.28.82/vtc/api/";
  return "https://virtualtourcafe.com/admin2/api/";
}
export const HomePageUrl = () => {
  //  return "/";
   return "https://virtualtourcafe.com/alpha/";
}
export const MlsPath = () => {
  //  return "/";
   return "/alpha/mls/";
}
export const StrictPath = () => {
  //  return "/";
   return "/alpha/strict/";
}
export const APIPath = () => {
  //  return "/";
   return "/alpha/tour/";
}
export const fetchAllRecords = (url, ctoken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, ctoken)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        if (axios.isCancel(err)) {
        } else {
          reject(err);
        }
      });
  });
};
export const fetchRecordByID = (url, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + id)
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};
