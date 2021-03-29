import axios from "axios";

class ApiError extends Error {}

export const serverRequest = async ({
  url,
  requestType,
  dataToOperate,
  dataToOperateId
}) => {
  switch (requestType) {
    case "GET": {
      const res = await axios.get(url);
      if (res.status === 200) {
        return { response: res };
      } else {
        throw new ApiError("Failed to get products");
      }
    }
    case "POST": {
      const res = await axios.post(url, dataToOperate);
      if (res.status === 201) {
        return { response: res };
      } else {
        throw new ApiError("Failed to save");
      }
    }
    case "PUT": {
      const res = await axios.put(`${url}/${dataToOperateId}`, dataToOperate);
      if (res.status === 200) {
        return { response: res, errorFlag: false };
      } else {
        throw new ApiError("Failed to update");
      }
    }

    default:
      return null;
  }
};
