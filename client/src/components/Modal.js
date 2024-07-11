
import { useEffect, useState } from "react";
import "./styles/yourdocs.css";

const Modal = ({ setModalOpen, contract }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [accessList, setAccessList] = useState([]);

  const loadAccessList = async () => {
    try {
      const addressList = await contract.shareAccess();
      setAccessList(addressList);
    } catch (error) {
      console.error("Error loading access list:", error);
    }
  };

  useEffect(() => {
    contract && loadAccessList();
  }, [contract]);

  const sharing = async (isAllow) => {
    if (!selectedUser) return;

    try {
      if (isAllow) {
        await contract.allow(selectedUser);
        alert(`Access granted to ${selectedUser}`);
      } else {
        await contract.disallow(selectedUser);
        alert(`Access revoked for ${selectedUser}`);
      }
      setModalOpen(false);
      loadAccessList(); // Refresh access list after action
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("Failed to update access");
    }
  };

  return (
    <>
      <div className="modalContainer">
        <div className="title">Share with</div>
        <div className="body">
          <input
            type="text"
            className="address"
            placeholder="Enter Ethereum Address"
            onChange={(e) => setSelectedUser(e.target.value)}
          />
        </div>
        <form id="myForm">
          <select id="selectNumber">
            <option className="address">People With Access</option>
            {accessList.map((user, index) => (
              <option key={index}>{user.user}</option>
            ))}
          </select>
        </form>
        <div className="foot">
          <button
            className="clicke"
            onClick={() => setModalOpen(false)}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button className="clk" onClick={() => sharing(true)}>Allow</button>
          <button className="clk" onClick={() => sharing(false)}>Disallow</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
