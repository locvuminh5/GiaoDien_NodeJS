import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesList from "./MoviesList";
import DetailsPanel from "./Details";
import BillPanel from "./Bill";
import AccountInfo from "./AccountInfo";
import BillsDetailsPanel from "./BillsList";
import ResetPasswordForm from "./ResetPassword";

const UserRoute = ({ }) => {

    //Apies
    const getMoviesDetail = () => {

    }

    return (
        <Routes>
            <Route path="/" element={<MoviesList />}></Route>
            <Route path="/movies" element={<MoviesList />}></Route>
            <Route path="/details" element={<DetailsPanel />}></Route>
            <Route path="/bill" element={<BillPanel />}></Route>
            <Route path="/account-info" element={<AccountInfo />}></Route>
            <Route path="/bills" element={<BillsDetailsPanel />}></Route>
            <Route path="/reset-password" element={<ResetPasswordForm />}></Route>
        </Routes>
    );
}
export default UserRoute;
