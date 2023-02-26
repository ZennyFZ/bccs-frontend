import "./Booking.css";
import ReactTimeslotCalendar from "react-timeslot-calendar";
export default function App() {
    return (
        <div className="Booking_Main">
            <ReactTimeslotCalendar
                let
                timeslots={[
                    ["1", "2"],
                    ["2", "3"],
                    ["4", "5"],
                    ["6", "7"]
                ]}
            />
        </div>
    );
}
