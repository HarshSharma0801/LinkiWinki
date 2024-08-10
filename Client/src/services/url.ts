import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

interface link {
  username: string;
  original_url: string;
}

interface updatedLink {
  link: string;
  shortId: string;
}

export const GetUrls = async (username: string) => {
  try {
    const { data } = await axios.get("/api/getUrls", {
      params: {
        username: username,
      },
    });
    if (data.valid) {
      return data.UrlData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createURL = async (Urldata: link) => {
  try {
    const { data } = await axios.post("/api/createUrl", Urldata);
    if (data.valid) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateURL = async (Urldata: updatedLink) => {
  try {
    const { data } = await axios.post("/api/updateUrl", Urldata);
    if (data.valid) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const GetQR = async (shortId: string) => {
  try {
    const { data } = await axios.get("/api/getQR", {
      params: {
        shortId: shortId,
      },
    });
    if (data.valid) {
      return data.QRImage;
    }
  } catch (error) {
    console.log(error);
  }
};
