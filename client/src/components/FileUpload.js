

// import { useState } from "react";
// import axios from "axios";
// import './styles/upload.css';
// import document from '../images/document.webp';
// import pinataImage from '../images/pinata.png';
// const FileUpload = ({ account, provider, contract }) => {
// //  const  { account, provider, contract }=useParams();
//  console.log("Account:", account);
//  //console.log("Provider:", provider);
//  console.log("Contract:", contract);
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState("No image selected");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//             pinata_api_key: `6645deef46c6967e3b01`,
//             pinata_secret_api_key: `5eaacc9cf6704e2b281237d927a742374ee843d39802fcbbed9fe61c9d6062e0`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//         // const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//         contract.add(account,ImgHash);
//         console.log(contract);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata");
//       }
//     }
//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };
//   const retrieveFile = (e) => {
//     const data = e.target.files[0]; //files array of files object
//      console.log(data);
//     const reader = new window.FileReader();
//     reader.readAsArrayBuffer(data);
//    reader.onloadend = () => {
//        setFile(e.target.files[0]);
//      };
//      setFileName(e.target.files[0].name);
//      e.preventDefault();
//   };
//   return (
//       <div className="file-upload-container">
        
//   <div className="external-links">
//           <a href="https://pinata.cloud/" target="_blank" rel="noopener noreferrer">
//              <img src={pinataImage} alt="Pinata" />
//            </a>
           
//             <div className="content-container">
//                        <h1 className="blockchain-heading heading-center">PINATA IPFS</h1>
                        
                          
//  <p className="blockchain-description">
//  Pinata IPFS (InterPlanetary File System) is a popular and user-friendly service that provides developers with an easy way to interact with IPFS, a distributed and decentralized protocol for storing and sharing data in a peer-to-peer network. IPFS allows data to be distributed across a vast number of nodes rather than being stored in a centralized server, making it highly resilient and censorship-resistant.
//  Pinata serves as a gateway and API service for IPFS, simplifying the process of pinning files to the IPFS network and providing additional features and services. Pinning refers to the act of storing files on the IPFS network so that they are accessible and preserved even if the original uploader goes offline. Pinata acts as a bridge between traditional web applications and the distributed nature of IPFS.
//  </p>
//  </div>
       
//          </div>
//          <div className='chosen'>
//       <form className="form" onSubmit={handleSubmit}>
//         <label htmlFor="file-upload" className="choose">
//           Choose Image
//         </label>
//         <input
//           disabled={!account}
//           type="file"
//           id="file-upload"
//           name="data"
//           onChange={retrieveFile}
//         />
//         <span className="textArea">Image: {fileName}</span>
//         <button type="submit" className="upload" disabled={!file}>
//           Upload File
//         </button>
//       </form>
//     </div>
//     <div className="profile-container">
//        <div className="profile-avatar">
//          <img src={document} alt="Profile Picture" />
//        </div>
//        <div className="profile-info">
      
       
//    <p className='para'>
//    Document storage in blockchain is a revolutionary approach that leverages the decentralized and tamper-resistant nature of blockchain technology to securely store documents and data. Unlike traditional centralized storage systems that are prone to single points of failure and security breaches, blockchain's distributed ledger offers a network of nodes where each holds a copy of the entire chain. This decentralization ensures no central authority controls access to documents, reducing the risk of data loss and unauthorized manipulation. The immutability feature of blockchain ensures that once documents are added to the chain, they cannot be altered or deleted without consensus from the network. This creates a trustworthy and reliable source of information with a transparent record of document changes visible to all participants. The cryptographic techniques employed by blockchain secure the data, making it resistant to unauthorized access. 
//          </p>
        
        
//        </div>
//     </div>
//      </div>   
   
//      );
//      };
     
//      export default FileUpload;

import { useState } from "react";
import axios from "axios";
import JSZip from "jszip";
import './styles/upload.css';
import document from '../images/document.webp';
import pinataImage from '../images/pinata.png';

const FileUpload = ({ account, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();

        if (file.type === "application/zip" || file.type === "application/pdf" || file.type.startsWith("image/")) {
          // Directly append image and PDF files
          formData.append("file", file);
          await uploadToIPFS(formData);
        } else {
          // Create a zip for other types (assuming folder)
          const zip = new JSZip();
          zip.folder(file.name);

          const files = Array.from(file.webkitEntries || []).map((entry) => {
            return new Promise((resolve) => {
              entry.file((file) => resolve({ file, path: entry.fullPath }));
            });
          });

          Promise.all(files).then((files) => {
            files.forEach(({ file, path }) => {
              zip.folder(file.name).file(path, file);
            });
            return zip.generateAsync({ type: "blob" });
          }).then((zipBlob) => {
            formData.append("file", zipBlob, file.name + ".zip");
            uploadToIPFS(formData);
          });
        }
      } catch (error) {
        console.error("Error uploading file to Pinata:", error);
        alert("Unable to upload file to Pinata");
      }
    } else {
      alert("Please select a file to upload");
    }
  };

  const uploadToIPFS = async (formData) => {
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `6645deef46c6967e3b01`,
          pinata_secret_api_key: `5eaacc9cf6704e2b281237d927a742374ee843d39802fcbbed9fe61c9d6062e0`,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileType = file.type.startsWith("image/") ? "image" : (file.type === "application/pdf" ? "pdf" : "folder");
      const fileHash = `ipfs://${resFile.data.IpfsHash}`;
      await contract.addItem(account, fileType, fileHash);

      alert("Successfully uploaded the file to IPFS");
      setFileName("No file selected");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file to Pinata:", error);
      alert("Unable to upload file to Pinata");
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // files array of files object
    setFile(data);
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="file-upload-container">
      <div className="external-links">
        <a href="https://pinata.cloud/" target="_blank" rel="noopener noreferrer">
          <img src={pinataImage} alt="Pinata" />
        </a>
        <div className="content-container">
          <h1 className="blockchain-heading heading-center">PINATA IPFS</h1>
          <p className="blockchain-description">
            Pinata IPFS (InterPlanetary File System) is a popular and user-friendly service that provides developers with an easy way to interact with IPFS, a distributed and decentralized protocol for storing and sharing data in a peer-to-peer network. IPFS allows data to be distributed across a vast number of nodes rather than being stored in a centralized server, making it highly resilient and censorship-resistant. Pinata serves as a gateway and API service for IPFS, simplifying the process of pinning files to the IPFS network and providing additional features and services. Pinning refers to the act of storing files on the IPFS network so that they are accessible and preserved even if the original uploader goes offline. Pinata acts as a bridge between traditional web applications and the distributed nature of IPFS.
          </p>
        </div>
      </div>
      <div className='chosen'>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
          />
          <span className="textArea">File: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload File
          </button>
        </form>
      </div>
      <div className="profile-container">
        <div className="profile-avatar">
          <img src={document} alt="Profile Picture" />
        </div>
        <div className="profile-info">
          
            <p className='para'>
   Document storage in blockchain is a revolutionary approach that leverages the decentralized and tamper-resistant nature of blockchain technology to securely store documents and data. Unlike traditional centralized storage systems that are prone to single points of failure and security breaches, blockchain's distributed ledger offers a network of nodes where each holds a copy of the entire chain. This decentralization ensures no central authority controls access to documents, reducing the risk of data loss and unauthorized manipulation. The immutability feature of blockchain ensures that once documents are added to the chain, they cannot be altered or deleted without consensus from the network. This creates a trustworthy and reliable source of information with a transparent record of document changes visible to all participants. The cryptographic techniques employed by blockchain secure the data, making it resistant to unauthorized access. 
         </p>
        
        
       </div>
    </div>
      </div>   
   
      );
      };
     
     export default FileUpload;

