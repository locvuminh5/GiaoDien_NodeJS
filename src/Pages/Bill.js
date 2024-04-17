import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import MovieTicket from "../Components/TicketComponent";
import Loading from "../Components/Loading";
import { Modal } from "antd";
import { CheckCircleOutlined  } from '@ant-design/icons';

const BillPanel = ({ }) => {
    const [movie, setMovie] = useState();
    const [XuatChieu, setXuatChieu] = useState();
    const [selectedSeats, setSelectedSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // const {_id, name, image, imdbPoint, timeLength, year, category} = location.state.record;
    var xc_id = location.state.xc_id;
    var movieId = location.state.movieId;
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch movies from API
        getMoviesDetail();
        // getUser();
        // console.log(selectedSeats);
        // console.log(global.myvar)
        // console.log(location.state)
    }, []);

    //Apis call


    const getMoviesDetail = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3030/api/v1/movies/' + movieId,
                headers: {}
            };

            await axios.request(config)
                .then((response) => {
                    setMovie(response.data);
                    getXuatChieu();
                    // console.log(movie.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }

    }

    const getXuatChieu = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3030/api/v1/xuatChieu/detail/' + xc_id,
                headers: {}
            };

            await axios.request(config)
                .then((response) => {
                    setXuatChieu(response.data);
                    // console.log(movie)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }

    }


    const handleSeatChange = (e) => {
        setSelectedSeats(parseInt(e.target.value));
        // console.log(selectedSeats);
    };

    const handleBooking = async () => {
        setLoading(true);
        // Handle booking logic

        let data = JSON.stringify({
            "userId": global.myvar,
            "xuatChieuId": xc_id,
            "seat": selectedSeats
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3030/api/v1/bill',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                Modal.confirm({
                    title: "Đặt vé thành công!!!",
                    icon: <CheckCircleOutlined style={{ color: '#52c41a' }}  />,
                    // okText: "OK",
                    okType: "danger",
                    cancelButtonProps: { // Set to null to remove cancel button
                        style: { display: 'none' }, // Hide the cancel button
                    },
                    onOk: async () => {
                        setLoading(false)
                        navigate('/bills');
                    },
                    // centered: true,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //Functions
    // if (movie && XuatChieu) {
    if (!loading && movie && XuatChieu) {
        return (
            <div>
                <h1 className="text-center" style={{ marginTop: "48px" }}>Đặt ghế</h1>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.data.name}</h5>
                                            <p className="card-text">Thời lượng: {movie.data.timeLength} </p>
                                            <p className="card-text">Năm ra mắt: {movie.data.year}</p>
                                            <p className="card-text">Điểm: {movie.data.imdbPoint}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Thông tin vé</h5>
                                            <p className="card-text">Ngày chiếu: {XuatChieu.data.date}</p>
                                            <p className="card-text">Giờ chiếu: {XuatChieu.data.time}</p>
                                            <p className="card-text">Số ghế còn: {XuatChieu.data.seat}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Số ghế muốn đặt</h5>
                                    <select className="form-select mb-3" value={selectedSeats} onChange={handleSeatChange}>
                                        {[...Array(10)].map((_, index) => (
                                            <option key={index} value={index + 1}>{index + 1}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-primary" onClick={handleBooking}>Đặt vé</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            // <h1>alo</h1>
            <div style={{
                display: "flex",
                justifyContent: "center", /* Horizontal centering */
                alignItems: "center", /* Vertical centering */
                height: "90vh"
            }}>
                <Loading />
            </div >
        )
    }

};

export default BillPanel;
