import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import MovieTicket from "../Components/TicketComponent";

const DetailsPanel = ({ }) => {
    const [movie, setMovie] = useState();
    const [XuatChieu, setXuatChieu] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    var id = location.state.id;


    useEffect(() => {
        // Fetch movies from API
        getMoviesDetail();
        // console.log(XuatChieu);
    }, []);

    //Apis call
    const getMoviesDetail = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3030/api/v1/movies/' + id,
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
                url: 'http://localhost:3030/api/v1/xuatChieu/' + id,
                headers: {}
            };

            await axios.request(config)
                .then((response) => {
                    setXuatChieu(response.data.data);
                    // console.log()
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }

    }


    //Functions
    if (movie && XuatChieu) {
        return (
            <div>
                <h1 className="text-center" style={{ marginTop: "48px", overflow: 'hidden' }}>Danh sách xuất chiếu</h1>

                {XuatChieu.map(xc => (
                    <MovieTicket
                        movieName={movie.data.name}
                        date={xc.date}
                        time={xc.time}
                        seat={xc.seat}
                        id={xc._id}
                        onClick={() => {
                            // console.log("first")
                            navigate('/bill',
                                {
                                    state: { xc_id: xc._id, movieId: id }
                                });
                        }}
                    />
                ))}
            </div>
        );
    }

};

export default DetailsPanel;
