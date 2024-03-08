import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import deleteIcon from "../Images/bin.png";
import editIcon from "../Images/pencil.png";
import { useNavigate } from "react-router-dom";
import { APP_URL } from "../Constant/url";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

function ViewUser() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(false);

  const getUserDetails = () => {
    axios
      .get(`${APP_URL}/api/user`, {})
      .then(function (response) {
        setUserList(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteUserDetails = () => {
    axios
      .delete(`${APP_URL}/api/user/${userId}`, {})
      .then(function (response) {
        toast.success("User Delete successfully");
        setModal(false);
        getUserDetails();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteModal = (value) => {
    setUserId(value.id);
    setModal(true);
  };

  const cancelModal = () => {
    setModal(false);
  };

  const updateModal = (value) => {
    navigate(`/adduser/${value.id}`)
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container card p-3">
        <Row className="mt-3">
          <Col>
            <span className="h3 fw-bolder">User List</span>
            <span className="h6">
              {" "}
              ({userList.length > 0 ? userList.length : 0})
            </span>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="bg-warning text-dark w-25"
              onClick={() => navigate("/adduser/add")}
            >
              Add user
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="table-container">
              <Table bordered>
                <thead>
                  <tr>
                    <th>S No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Hobbies</th>
                    <th>Interests</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.length > 0 ? (
                    <>
                      {userList?.map((item, index) => (
                        <tr>
                          <td key={item.id}>{index + 1}</td>
                          <td>{item.firstname}</td>
                          <td>{item.lastname}</td>
                          <td>{item.email}</td>
                          <td>{moment(item.dob).format("YYYY-MM-DD")}</td>
                          <td>{item.gender}</td>
                          <td>{item.hobbies}</td>
                          <td>{item.interests}</td>
                          <td>
                            <div>
                              <img
                                src={editIcon}
                                alt="Edit"
                                width={30}
                                height={30}
                                style={{
                                  cursor: "pointer",
                                  marginRight: "20px",
                                }}
                                onClick={(e) => updateModal(item)}
                              />
                              <img
                                src={deleteIcon}
                                alt="Delete"
                                width={30}
                                height={30}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => deleteModal(item, e)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colSpan={8} className="text-center text-secondary">
                          {" "}
                          No data Found
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={cancelModal}>
          <ModalHeader toggle={cancelModal}>Delete User</ModalHeader>
          <ModalBody className="p-5 text-center" >Do want to delete the user ?</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={deleteUserDetails}>
              Confirm
            </Button>{" "}
            <Button color="danger" onClick={cancelModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ViewUser;
