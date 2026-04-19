import React from "react";

const FileUpload = () => {

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(file){
      alert("File Uploaded: " + file.name);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header">Upload Project File</div>

      <div className="card-body">
        <input type="file" className="form-control" onChange={handleFile} />
      </div>
    </div>
  );
};

export default FileUpload;