import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { Modal as aModal } from "antd";
import axios from "axios";
import Loading from '../Components/Loading';
import Success from '../Components/Success';
import { WarningOutlined } from '@ant-design/icons';

const AccountInfo = () => {
    // global.myvar = account;
    const [showResetModal, setShowResetModal] = useState(false);
    // const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        // Fetch movies from API
        // getUser();
        // console.log(global.myvar)
        // console.log(oldPassword);
        // console.log(newPassword);
        // console.log(confirmPassword);
    }, []);


    //Functions
    const handleResetPassword = async () => {
        //Add logic to handle resetting password
        if (newPassword.localeCompare(confirmPassword) !== 0) {
            aModal.confirm({
                style: { top: 300 },
                title: "New password and Confirm password don't matchs!",
                icon: <WarningOutlined style={{ color: 'red' }} />,
                // okText: "OK",
                okType: "danger",
                cancelButtonProps: { // Set to null to remove cancel button
                    style: { display: 'none' }, // Hide the cancel button
                },
            })
        } else {
            setLoading(true)

            let data = JSON.stringify({
                "user": global.myvar,
                "password": newPassword
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3030/api/v1/auth/changePassword',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                data: data
            };

            await axios.request(config)
                .then((response) => {
                    setLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 1000);

                    setNewPassword("");
                    setConfirmPassword("");
                    setShowResetModal(false)
                })
                .catch((error) => {
                    setLoading(false);

                    setNewPassword("");
                    setConfirmPassword("");
                    setShowResetModal(false)
                    console.log(error);
                });
        }
    };

    const handleCanclePassword = async () => {
        // setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowResetModal(false)
        // console.log(confirmPassword);
    };

    const OpenResetPasswordModal = async () => {
        setShowResetModal(true);
    };

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center", /* Horizontal centering */
                alignItems: "center", /* Vertical centering */
                height: "90vh"
            }}>
                <Loading />
                {/* <Success /> */}
            </div >
        )
    } else if (success) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center", /* Horizontal centering */
                alignItems: "center", /* Vertical centering */
                height: "90vh"
            }}>
                {/* <Loading /> */}
                <Success />
            </div >
        )
    } else {
        return (
            <>
                <div className="card" style={{ width: '100%', margin: 'auto' }}>
                    <div className="card-body">
                        <h1 className="card-title text-center">Account Information</h1>
                        <div className="card-text" style={{ marginBottom: "20px" }}>
                            <strong style={{ fontSize: "22px" }}>Username: {global.myvar?.username}</strong>
                        </div>
                        <div className="card-text" style={{ marginBottom: "20px" }}>
                            <strong style={{ fontSize: "22px" }}>Email:  {global.myvar?.email}</strong>
                        </div>
                        <Button variant="primary" onClick={OpenResetPasswordModal}>
                            Change Password
                        </Button>
                    </div>
                </div>

                <Modal
                    show={showResetModal}
                    onHide={() => setShowResetModal(false)}
                    style={{ marginTop: "20vh" }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="newPassword">
                                <Form.Label style={{ fontWeight: "bold" }}>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label style={{ fontWeight: "bold" }}>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCanclePassword}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleResetPassword}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal >

            </>
        );
    }
};

export default AccountInfo;
