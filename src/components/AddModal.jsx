import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2'

function AddModal({ show, handleClose, name, setAppointments, appointments }) {
  const [appointment, setAppointment] = useState({
    patientName: "",
    date: ""
  });

  const handlePatientName = (e) => {
    setAppointment({ ...appointment, patientName: e.target.value });
  };

  const handleDate = (e) => {
    setAppointment({ ...appointment, date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAppointments((prevAppointments) => [...prevAppointments,{...appointment, doctorName: name}]);
    handleClose();
    addedBasketPopup()
  };

  const addedBasketPopup = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Appointment Saved",
    });
  };
  
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="doctorName">
          Appointment for <span className="text-info">{name}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="patientName">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              // value={appointment.patientName}
              onChange={handlePatientName}
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Day & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              required
              // value={appointment.date}
              onChange={handleDate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
