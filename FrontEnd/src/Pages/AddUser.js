import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { APP_URL } from "../Constant/url";
import axios from "axios";
import moment from "moment";
function AddUser() {
  const { id } = useParams();
  const initialFunction = () => {
    return {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      selectedGender: { value: "", label: "Select" },
      selectedHobbies: { value: "", label: "Select" },
      interests: "",
    };
  };

  const genderList = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];
  const hobbiesList = [
    {
      value: "reading",
      label: "Reading",
    },
    {
      value: "writing",
      label: "Writing",
    },
    {
      value: "cooking",
      label: "Cooking",
    },
    {
      value: "dancing",
      label: "Dancing",
    },
    {
      value: "singing",
      label: "Singing",
    },
    {
      value: "playing",
      label: "Playing",
    },
    {
      value: "gardening",
      label: "Gardening",
    },
  ];

  const navigate = useNavigate();
  const [state, setState] = useState(initialFunction());

  const updateFieldValues = (fieldName, fieldValue) => {
    setState((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const resetForm = () => {
    setState(initialFunction());
  };

  const submit = () => {
    if (id === "add") {
      postUserDetails();
    } else {
      updateUserDetails();
    }
  };
  const postUserDetails = () => {
    axios
      .post(`${APP_URL}/api/user`, {
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
        dob: state.dob,
        gender: state.selectedGender?.value,
        hobbies: state.selectedHobbies?.value,
        interests: state.interests,
      })
      .then(function (response) {
        toast.success("User Created successfully");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setState(initialFunction());
      });
  };

  const updateUserDetails = () => {
    axios
      .put(`${APP_URL}/api/user/${id}`, {
        firstname: state.firstname,
        lastname: state.lastname,
        email: state.email,
        dob: state.dob,
        gender: state.selectedGender?.value,
        hobbies: state.selectedHobbies?.value,
        interests: state.interests,
      })
      .then(function (response) {
        toast.success("User Update successfully");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setState(initialFunction());
      });
  };

  const getUserDetails = () => {
    axios
      .get(`${APP_URL}/api/user/${id}`, {})
      .then(function (response) {
        let selectedGenderObj = {};
        let selectedhobbiesObj = {};
        response.data.forEach((element) => {
          genderList.forEach((item) => {
            if (item.value === element.gender) {
              selectedGenderObj = { value: item.value, label: item.label };
            }
          });
          hobbiesList.forEach((item) => {
            if (item.value === element.hobbies) {
              selectedhobbiesObj = { value: item.value, label: item.label };
            }
          });
        });
        setState((prev) => ({
          ...prev,
          firstname: response.data[0].firstname,
          lastname: response.data[0].lastname,
          email: response.data[0].email,
          dob: moment(response.data[0].dob).format("YYYY-MM-DD"),
          selectedGender: selectedGenderObj,
          selectedHobbies: selectedhobbiesObj,
          interests: response.data[0].interests,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id !== "add") return getUserDetails();
  }, [id]);

  return (
    <div>
      <div className="page-wrapper">
        <div className="container card p-3">
          <Row className="mt-3">
            <Col>
              <span className="h3 fw-bolder">
                {" "}
                {id !== "add" ? " Update User" : " Add User"}{" "}
              </span>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                className="bg-warning text-dark w-25"
                onClick={() => navigate(-1)}
              >
                View user
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <div className="table-container">
              <Form>
                <Row className="mb-1">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                        value={state.firstname}
                        onChange={(e) =>
                          updateFieldValues("firstname", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                        value={state.lastname}
                        onChange={(e) =>
                          updateFieldValues("lastname", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={state.email}
                        onChange={(e) =>
                          updateFieldValues("email", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        name="dob"
                        type="date"
                        value={state.dob}
                        onChange={(e) =>
                          updateFieldValues("dob", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="gender">Gender</Label>
                      <Select
                        options={genderList}
                        value={state.selectedGender}
                        onChange={(selectedOption) =>
                          updateFieldValues("selectedGender", selectedOption)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="hobbies">Hobbies</Label>
                      <Select
                        options={hobbiesList}
                        value={state.selectedHobbies}
                        onChange={(selectedOption) =>
                          updateFieldValues("selectedHobbies", selectedOption)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="interests">Interests</Label>
                      <Input
                        id="interests"
                        name="interests"
                        placeholder="Interests"
                        type="textarea"
                        style={{ height: "140px" }}
                        value={state.interests}
                        onChange={(e) =>
                          updateFieldValues("interests", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button
                    className="bg-danger"
                    style={{ width: "150px" }}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                  <Button
                    className="bg-success mx-3"
                    style={{ width: "150px" }}
                    onClick={() => submit()}
                  >
                    {id !== "add" ? " Update User" : " Create User"}
                  </Button>
                </div>
              </Form>
            </div>
          </Row>
        </div>
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

export default AddUser;
