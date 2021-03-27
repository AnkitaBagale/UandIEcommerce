import axios from "axios";

class ApiError extends Error {}

export const serverRequest = async (
  url,
  requestType,
  dataToOperate,
  dataToOperateId
) => {
  switch (requestType) {
    case "GET": {
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          return { response: res, errorFlag: false, loadingFlag: false };
        } else {
          throw new ApiError();
        }
      } catch (error) {
        return { response: error, errorFlag: true, loadingFlag: false };
      }
    }
    case "POST": {
      try {
        const res = await axios.post(url, dataToOperate);
        if (res.status === 201) {
          return { response: res, errorFlag: false, loadingFlag: false };
        } else {
          throw new ApiError();
        }
      } catch (error) {
        return { response: error, errorFlag: true, loadingFlag: false };
      }
    }
    case "PUT": {
      try {
        const res = await axios.put(`${url}/${dataToOperateId}`, dataToOperate);
        if (res.status === 200) {
          return { response: res, errorFlag: false, loadingFlag: false };
        } else {
          throw new ApiError();
        }
      } catch (error) {
        return { response: error, errorFlag: true, loadingFlag: false };
      }
    }
    case "DELETE": {
      try {
        const { status } = await axios.delete(`${url}/${dataToOperateId}`);
        if (status === 204) {
          return { response: "Success", errorFlag: false, loadingFlag: false };
        } else {
          throw new ApiError();
        }
      } catch (error) {
        return { response: error, errorFlag: true, loadingFlag: false };
      }
    }
    default:
      return null;
  }
};
