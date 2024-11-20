import User from "../../Models/UserModel.js";
import Booking from "../../Models/BookingModel.js";
import Room from "../../Models/RoomModel.js";
import { generateToken } from "../../utills/generateToken.js";
import { otpGenerate } from "../../utills/otpGenerate.js";
import Otp from "../../Models/OtpModel.js";
import { sendEmail } from "../../utills/emailService.js";
// import Report from "../../Models/report.js";


// Registration Handler
export const Register = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    3;
    // Check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate OTP and save it in the Otp collection
    const otp = otpGenerate();
    const existingOtp = await Otp.findOne({ email: lowerCaseEmail });
    if (existingOtp) {
      await Otp.deleteOne({ email: lowerCaseEmail });
    }
    const newOtp = new Otp({ email: lowerCaseEmail, otp });
    await newOtp.save();

    // Send OTP via email
    const emailData = {
      email: lowerCaseEmail,
      subject: "OTP Verification",
      text: `Thank you ${name} for registering on our platform, Your OTP is ${otp} for verify Your Email.`,
    };
    await sendEmail(emailData);
    // Inform user that OTP was sent
    return res.status(200).json({
      message: "OTP sent to email. Please verify your OTP.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { name, email, password, gender, otp } = req.body;

    // Check if the OTP is valid and belongs to the user
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Create user and save with verification
    const user = new User({
      name,
      email,
      password,
      gender,
      isVerified: true,
    });
    await user.save();
    // Optionally, delete OTP after successful verification
    await Otp.deleteOne({ email });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "User is not verified." });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const availableRooms = async (req, res) => {
//   try {
//     const { date } = req.body;
//     if (!date) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const rooms = await Room.find();
//     const bookings = await Booking.find({ date });
//     const availableRooms = rooms.filter((room) => {
//       return !bookings.some(
//         (booking) => booking.room.toString() === room._id.toString()
//       );
//     });
//     res.status(200).json({ availableRooms });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const bookRoom = async (req, res) => {
//   try {
//     const { semester, branch, subject, room, date, timeSlot, professorId } =
//       req.body;

//     if (
//       !semester ||
//       !branch ||
//       !subject ||
//       !room ||
//       !date ||
//       !timeSlot ||
//       !professorId
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const roomExists = await Room.findById(room);
//     if (!roomExists) {
//       return res.status(400).json({ error: "Room does not exist" });
//     }

//     const bookingExists = await Booking.findOne({ room, date, timeSlot });
//     if (bookingExists) {
//       return res.status(400).json({ error: "Room is already booked" });
//     }

//     const professor = await User.findById(professorId);
//     if (!professor) {
//       return res.status(400).json({ error: "Professor does not exist" });
//     }

//     const professorAvailable = await Booking.findOne({
//       date,
//       timeSlot,
//       professor: {
//         $elemMatch: {
//           professorId: professorId,
//         },
//       },
//     });
//     if (professorAvailable) {
//       return res
//         .status(400)
//         .json({ error: "Professor is already booked for this time slot" });
//     }

//     const newBooking = new Booking({
//       semester,
//       branch,
//       subject,
//       room,
//       date,
//       timeSlot,
//       professor: [
//         {
//           professorId: professor._id,
//           professorName: professor.name,
//         },
//       ],
//     });

//     await newBooking.save();
//     res.status(200).json({ message: "Room booked successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const bookRoom = async (req, res) => {
  try {
    const { semester, branch, subject, room, date, seats, slot, professorId } =
      req.body;

    // Validate required fields
    if (
      !semester ||
      !branch ||
      !subject ||
      !room ||
      !date ||
      !seats ||
      !slot ||
      !professorId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate the slot
    const validSlots = ["1", "2"]; // Define valid slots (e.g., Slot 1 and Slot 2)
    if (!validSlots.includes(slot)) {
      return res.status(400).json({ error: "Invalid slot provided" });
    }

    // Check if the room exists
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return res.status(400).json({ error: "Room does not exist" });
    }

    // Check if the professor exists
    const professor = await User.findById(professorId);
    if (!professor) {
      return res.status(400).json({ error: "Professor does not exist" });
    }

    // Check if the professor is available for the date and slot
    const professorAvailable = await Booking.findOne({
      date,
      slot,
      professor: {
        $elemMatch: {
          professorId: professorId,
        },
      },
    });
    if (professorAvailable) {
      return res.status(400).json({
        error: `Professor is already booked for Slot ${slot} on this date`,
      });
    }

    // Check room seat availability for the given date and slot
    const existingBookingForSlot = roomExists.bookedSeats.find(
      (booking) =>
        booking.slot === slot &&
        new Date(booking.date).toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0]
    );

    const alreadyBookedSeats = existingBookingForSlot
      ? existingBookingForSlot.seats
      : 0;
    const availableSeats = roomExists.totalSeats - alreadyBookedSeats;

    if (seats > availableSeats) {
      return res.status(400).json({
        error: `Only ${availableSeats} seats are available for Slot ${slot} on this date`,
      });
    }

    // Update the room's booking details for the slot
    if (existingBookingForSlot) {
      existingBookingForSlot.seats += seats;
    } else {
      roomExists.bookedSeats.push({ date, slot, seats });
    }

    await roomExists.save();

    // Create a new booking entry for the date and slot
    const newBooking = new Booking({
      semester,
      branch,
      subject,
      room,
      date,
      seats,
      slot,
      professor: [
        {
          professorId: professor._id,
          professorName: professor.name,
        },
      ],
    });

    await newBooking.save();

    res
      .status(200)
      .json({ message: `Room booked successfully for Slot ${slot}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProfessor = async (req, res) => {
  try {
    const { professorEmail, bookingId } = req.body;

    const professor = await User.findOne({ email: professorEmail });
    if (!professor) {
      return res.status(400).json({ error: "Professor does not exist" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(400).json({ error: "Booking not found" });
    }

    if (booking.professor.length >= 2) {
      return res
        .status(400)
        .json({ error: "Only 2 professors are allowed per booking" });
    }

    const professorAvailable = await Booking.findOne({
      "professor.professorId": professor._id,
      date: booking.date,
      timeSlot: booking.timeSlot,
    });
    if (professorAvailable) {
      return res
        .status(400)
        .json({ error: "Professor is already booked for this time slot" });
    }

    booking.professor.push({
      professorId: professor._id,
      professorName: professor.name,
    });

    await booking.save();
    res.status(200).json({ message: "Professor added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeProfessor = async (req, res) => {
  try {
    const { professorEmail, bookingId } = req.body;

    const professor = await User.findOne({ email: professorEmail });
    if (!professor) {
      return res.status(400).json({ error: "Professor does not exist" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(400).json({ error: "Booking not found" });
    }

    const professorExists = booking.professor.find(
      (p) => p.professorId.toString() === professor._id.toString()
    );

    if (!professorExists) {
      return res
        .status(400)
        .json({ error: "Professor not part of this booking" });
    }

    booking.professor = booking.professor.filter(
      (p) => p.professorId.toString() !== professor._id.toString()
    );

    if (booking.professor.length === 0) {
      await Booking.deleteOne({ _id: bookingId });
      return res
        .status(200)
        .json({ message: "Booking deleted as no professors remain" });
    }

    await booking.save();
    res.status(200).json({ message: "Professor removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getAvailableRoomsByDate = async (req, res) => {
//   try {
//     const { date } = req.params;

//     // Validate date input
//     if (!date) {
//       return res.status(400).json({ error: "Date is required" });
//     }

//     // Convert the date string into a proper local date object
//     const [year, month, day] = date.split("-");
//     const bookingDate = new Date(Date.UTC(year, month - 1, day)); // Ensure it's treated as UTC to avoid timezone shift

//     // Fetch all rooms
//     const allRooms = await Room.find();

//     // Fetch booked rooms for Slot 1 on the specified date
//     const bookedSlot1 = await Booking.find({
//       date: bookingDate,
//       timeSlot: "1",
//     }).select("room");

//     // Fetch booked rooms for Slot 2 on the specified date
//     const bookedSlot2 = await Booking.find({
//       date: bookingDate,
//       timeSlot: "2",
//     }).select("room");

//     // Extract booked room IDs for each slot
//     const bookedRoomIdsSlot1 = bookedSlot1.map((booking) =>
//       booking.room.toString()
//     );
//     const bookedRoomIdsSlot2 = bookedSlot2.map((booking) =>
//       booking.room.toString()
//     );

//     // Filter available rooms for each slot
//     const availableRoomsSlot1 = allRooms
//       .filter((room) => !bookedRoomIdsSlot1.includes(room._id.toString()))
//       .map((room) => ({
//         room: room,
//         slot: 1,
//       }));

//     const availableRoomsSlot2 = allRooms
//       .filter((room) => !bookedRoomIdsSlot2.includes(room._id.toString()))
//       .map((room) => ({
//         room: room,
//         slot: 2,
//       }));

//     // Combine available rooms and slots into a single array
//     const availableRooms = [...availableRoomsSlot1, ...availableRoomsSlot2];

//     // Response with available rooms with slot information
//     res.status(200).json({
//       date: bookingDate.toISOString().split("T")[0], // Return date without time info
//       availableRooms: availableRooms,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAvailableRoomsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // Validate date input
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    // Convert the date string into a proper local date object
    const [year, month, day] = date.split("-");
    const bookingDate = new Date(Date.UTC(year, month - 1, day)); // Ensure it's treated as UTC to avoid timezone shift

    // Fetch all rooms
    const allRooms = await Room.find();

    // Calculate available seats per slot
    const availableRooms = [];

    allRooms.forEach((room) => {
      // Prepare an object for slots availability
      const slots = ["1", "2"].map((slot) => {
        const existingBooking = room.bookedSeats.find(
          (booking) =>
            new Date(booking.date).toISOString().split("T")[0] ===
              bookingDate.toISOString().split("T")[0] && booking.slot === slot
        );

        const alreadyBookedSeats = existingBooking ? existingBooking.seats : 0;
        const availableSeats = room.totalSeats - alreadyBookedSeats;

        return { slot, availableSeats };
      });

      // Add each slot to the response
      slots.forEach((slotInfo) => {
        availableRooms.push({
          room: room.number,
          totalSeats: room.totalSeats,
          slot: slotInfo.slot,
          availableSeats: slotInfo.availableSeats,
        });
      });
    });

    // Respond with the data
    res.status(200).json({
      date: bookingDate.toISOString().split("T")[0], // Return date without time info
      availableRooms,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const BookedSlots = async (req, res) => {
  try {
    const { branch, semester } = req.query;
    if (!branch || !semester) {
      return res
        .status(400)
        .json({ error: "Branch and semester are required" });
    }
    const bookedSlots = await Booking.find({ branch, semester });
    res.status(200).json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const bookingByProfessor = async (req, res) => {
  try {
    const { professorId } = req.body;

    if (!professorId) {
      return res.status(400).json({ error: "Professor ID is required" });
    }

    const bookings = await Booking.find({
      "professor.professorId": professorId,
    });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const reportFeedback = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newReport = new Report({
      name,
      email,
      comment,
    });
    await newReport.save();
    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
