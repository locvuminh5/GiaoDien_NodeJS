import React from 'react';
// import '../../CSS/MovieTicket.scss';

// const MovieTicket = ({ movieName, name, seat, time }) => {
//   return (
//     <div className="cardWrap">
//       <div className="card cardLeft">
//         <h1>Startup <span>Cinema</span></h1>
//         <div className="title">
//           <h2>{movieName}</h2>
//           <span>movie</span>
//         </div>
//         <div className="name">
//           <h2>{name}</h2>
//           <span>name</span>
//         </div>
//         <div className="seat">
//           <h2>{seat}</h2>
//           <span>seat</span>
//         </div>
//         <div className="time">
//           <h2>{time}</h2>
//           <span>time</span>
//         </div>
//       </div>
//       <div className="card cardRight">
//         <div className="eye"></div>
//         <div className="number">
//           <h3>{seat}</h3>
//           <span>seat</span>
//         </div>
//         <div className="barcode"></div>
//       </div>
//     </div>
//   );
// };

const MovieTicket = ({ movieName, date, seat, time, id, onClick }) => {
  return (
    <div className="container mt-5"
    onClick={onClick}
    style={{
      cursor: "pointer"
    }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <h1 className="card-title">Lộc Hùng Phát <span className="text-white">Cinema</span></h1>
              <div className="title">
                <span>movie</span>
                <h2>{movieName}</h2>
              </div>
              <div className="name">
                <span>seat</span>
                <h2>{seat}</h2>
              </div>
              <div className="seat">
                <span>date</span>
                <h2>{date}</h2>
              </div>
              <div className="time">
                <span>time</span>
                <h2>{time}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default MovieTicket;
