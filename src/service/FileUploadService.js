import http from "../http-common";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/uploadFile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};




const getFiles = () => {
  return http.get("/getAll");
};

export default {
  upload,
  getFiles,

  
};