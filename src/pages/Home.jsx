import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Doctors from "../components/Doctors";
import { doctorData } from "../helpers/data";
import AddModal from "../components/AddModal";
import AppointmentList from "../components/AppointmentList";
import Swal from "sweetalert2";

const Home = () => {
  const [show, setShow] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [consultedAppointments, setConsultedAppointments] = useState({});

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (storedAppointments) {
      setAppointments(storedAppointments);
    }

    const storedConsultedAppointments = JSON.parse(
      localStorage.getItem("consultedAppointments")
    );
    if (storedConsultedAppointments) {
      setConsultedAppointments(storedConsultedAppointments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(
      "consultedAppointments",
      JSON.stringify(consultedAppointments)
    );
  }, [consultedAppointments]);

  console.log(appointments);
  const handleShowModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Container className="text-center">
      <Container>
        <Navbar expand="lg" className="banner my-2">
          <Container className="d-flex justify-content-between">
            <Navbar.Brand className="hosName ms-3" href="#">
              SELCUK HOSPITAL
            </Navbar.Brand>
            <Nav className="me-3">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#appointments">Appointments</Nav.Link>
            <Nav.Link href="#hours">Hours</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      </Container>
      <h2>OUR DOCTORS</h2>
      <Row
        className=" gap-1 justify-content-center"
        xs={1}
        sm={2}
        md={3}
        lg={4}
        xl={5}
      >
        {doctorData.map((doctor) => (
          <Doctors key={doctor.id} doctor={doctor} show={handleShowModal} />
        ))}
      </Row>

      <AddModal
        show={show}
        handleClose={handleCloseModal}
        {...selectedDoctor}
        setAppointments={setAppointments}
        appointments={appointments}
      />
      <AppointmentList
        appointments={appointments}
        setAppointments={setAppointments}
        consultedAppointments={consultedAppointments}
        setConsultedAppointments={setConsultedAppointments}
      />
    </Container>
  );
};

export default Home;
