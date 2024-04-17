import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import MovieTicket from "../Components/TicketComponent";

const BillsDetailsPanel = ({ }) => {
    const [movie, setMovie] = useState();
    const [XuatChieu, setXuatChieu] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    var id = global.myvar;


    useEffect(() => {
        // Fetch movies from API
        getMoviesDetail();
        // console.log(id);
    }, []);

    //Apis call
    const getMoviesDetail = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3030/api/v1/bill/' + id._id,
                headers: {}
            };

            await axios.request(config)
                .then((response) => {
                    setXuatChieu(response.data.data);
                    // getXuatChieu();
                    // console.log(movie.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error)
        }

    }

    // const getXuatChieu = async () => {
    //     try {
    //         let config = {
    //             method: 'get',
    //             maxBodyLength: Infinity,
    //             url: 'http://localhost:3030/api/v1/xuatChieu/' + id,
    //             headers: {}
    //         };

    //         await axios.request(config)
    //             .then((response) => {
    //                 setXuatChieu(response.data.data);
    //                 // console.log()
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }


    //Functions
    if (XuatChieu) {
        return (
            <div>
                <h1 className="text-center" style={{ marginTop: "48px", overflow: 'hidden' }}>Lịch sử mua vé</h1>

                {XuatChieu.map(xc => (
                    <MovieTicket
                        movieName={xc.xuatChieuId.movieID.name}
                        date={xc.xuatChieuId.date}
                        time={xc.xuatChieuId.time}
                        seat={xc.seat}
                        id={xc._id}
                        onClick={() => {}}
                    />
                ))}
                <div style={{marginTop: "60px"}}></div>
            </div>
        );
    }

};

export default BillsDetailsPanel;
