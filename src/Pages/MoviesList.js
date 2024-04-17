import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const MoviesList = ({ }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch movies from API
        getMovies();
    }, []);

    //Apis call
    const getMovies = async () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3030/api/v1/movies',
            headers: {}
        };

        await axios.request(config)
            .then((response) => {
                // console.log(response.data.data);
                setMovies(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    //Functions

    return (
        <div>
            <div className="row">
                {movies.map(movie => (
                    <div
                        key={movie._id}
                        className="col-md-4 mb-4">
                        <div className="card" style={{
                            background: "#212529",
                            color: "white",
                            borderRadius: "20px",
                            cursor: "pointer"
                        }}
                            onClick={() => {
                                navigate('/details',
                                    {
                                        state: { id: movie._id }
                                    });
                            }}>
                            {/* <Link to={`/details/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                            <img src={movie.image} style={{
                                width: "100%",
                                height: "250px",
                                resizeMode: "fill",
                                borderRadius: "20px"
                            }} className="card-img-top" alt={movie.name} />
                            <div className="card-body" >
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">IMDb Point: {movie.imdbPoint}</p>
                                <p className="card-text">Year: {movie.year}</p>
                                <p className="card-text">Time Length: {movie.timeLength}</p>
                            </div>
                            {/* </Link> */}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesList;
