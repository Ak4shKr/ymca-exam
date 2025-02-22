import Booking from "../../Models/BookingModel.js";
import Room from "../../Models/RoomModel.js";
import User from "../../Models/UserModel.js";
import mongoose from "mongoose";
// export const bookRoom = async (req, res) => {
//   try {
//     const { semester, branch, subject, rooms, date, slot, professorId } =
//       req.body;

//     // Validate required fields
//     if (!semester || !branch || !subject || !rooms || !date || !professorId) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Validate the slot
//     const validSlots = ["1", "2"];
//     if (!validSlots.includes(slot)) {
//       return res.status(400).json({ error: "Invalid slot provided" });
//     }

//     // Check if the professor exists
//     const professor = await User.findById(professorId);
//     if (!professor) {
//       return res.status(400).json({ error: "Professor does not exist" });
//     }

//     // Check if the professor is already booked for the same date and slot
//     const professorBooked = await Booking.findOne({
//       date,
//       slot,
//       professor: {
//         $elemMatch: {
//           professorId: professorId,
//         },
//       },
//     });
//     if (professorBooked) {
//       return res.status(400).json({
//         error: `Professor is already booked for Slot ${slot} on this date`,
//       });
//     }

//     // Validate rooms and seat availability
//     const roomDetails = [];
//     for (const roomData of rooms) {
//       const room = await Room.findById(roomData.room); // Fetch room by ID
//       if (!room) {
//         return res
//           .status(400)
//           .json({ error: `Room ${roomData.room} does not exist` });
//       }

//       const existingBookingForSlot = room.booking.find(
//         (booking) =>
//           booking.slot === slot &&
//           new Date(booking.date).toISOString().split("T")[0] ===
//             new Date(date).toISOString().split("T")[0]
//       );
//       const alreadyBookedSeats = existingBookingForSlot
//         ? existingBookingForSlot.bookedSeats
//         : 0;
//       const availableSeats = room.totalSeats - alreadyBookedSeats;

//       if (roomData.seats > availableSeats) {
//         return res.status(400).json({
//           error: `Only ${availableSeats} seats are available for Slot ${slot} on this date for room ${room.number}`,
//         });
//       }

//       //update room with new booking
//       if (existingBookingForSlot) {
//         existingBookingForSlot.bookedSeats += roomData.seats;
//       } else {
//         room.booking.push({
//           date,
//           slot,
//           bookedSeats: roomData.seats,
//         });
//       }

//       await room.save();
//       roomDetails.push({
//         room: room._id,
//         roomNumber: room.number,
//         seatsBooked: roomData.seats,
//       });
//     }

//     // Create a new booking entry for the date and slot
//     const newBooking = new Booking({
//       semester,
//       branch,
//       subject,
//       rooms: roomDetails,
//       date,
//       slot,
//       professor: [
//         {
//           professorId: professor._id,
//           professorName: professor.name,
//         },
//       ],
//     });

//     await newBooking.save();

//     res
//       .status(200)
//       .json({ message: `Room(s) booked successfully for Slot ${slot}` });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const bookRoom = async (req, res) => {
  try {
    const { semester, branch, subject, rooms, date, slot, professorId } =
      req.body;

    // Validate required fields
    if (!semester || !branch || !subject || !rooms || !date || !professorId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate the slot
    const validSlots = ["1", "2"];
    if (!validSlots.includes(slot)) {
      return res.status(400).json({ error: "Invalid slot provided" });
    }

    // Check if the professor exists
    const professor = await User.findById(professorId);
    if (!professor) {
      return res.status(400).json({ error: "Professor does not exist" });
    }

    // Check if the professor is already booked for the same date and slot
    const professorBooked = await Booking.findOne({
      date,
      slot,
      professor: { $elemMatch: { professorId: professorId } },
    });
    if (professorBooked) {
      return res.status(400).json({
        error: `Professor is already booked for Slot ${slot} on this date`,
      });
    }

    // Generate a unique bookingId automatically
    const bookingId = new mongoose.Types.ObjectId();

    // Validate rooms and seat availability
    const roomDetails = [];
    for (const roomData of rooms) {
      const room = await Room.findById(roomData.room);
      if (!room) {
        return res
          .status(400)
          .json({ error: `Room ${roomData.room} does not exist` });
      }

      // Sum up already booked seats for the same date and slot
      const totalBookedSeatsForSlot = room.booking
        .filter(
          (b) =>
            b.slot === slot &&
            new Date(b.date).toISOString().split("T")[0] ===
              new Date(date).toISOString().split("T")[0]
        )
        .reduce((sum, b) => sum + b.bookedSeats, 0);

      const availableSeats = room.totalSeats - totalBookedSeatsForSlot;

      if (roomData.seats > availableSeats) {
        return res.status(400).json({
          error: `Only ${availableSeats} seats are available for Slot ${slot} on this date for room ${room.number}`,
        });
      }

      // Update room booking with generated bookingId
      room.booking.push({
        bookingId: bookingId, // Auto-generated bookingId
        date,
        slot,
        bookedSeats: roomData.seats,
      });

      await room.save();

      roomDetails.push({
        room: room._id,
        roomNumber: room.number,
        seatsBooked: roomData.seats,
      });
    }

    // Create a new booking entry with the generated bookingId
    const newBooking = new Booking({
      _id: bookingId, // Use the auto-generated bookingId
      semester,
      branch,
      subject,
      rooms: roomDetails,
      date,
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
      .json({ message: `Room(s) booked successfully for Slot ${slot}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getAvailableRoomsByDate = async (req, res) => {
//   try {
//     const { date, branch, semester } = req.body;

//     if (!date) {
//       return res.status(400).json({ error: "Date is required" });
//     }
//     if (!branch || !semester) {
//       return res
//         .status(400)
//         .json({ error: "Branch and semester are required" });
//     }

//     // Parse the date
//     const [year, month, day] = date.split("-");
//     const bookingDate = new Date(Date.UTC(year, month - 1, day)); // Treat as UTC

//     //find slot1booking & slot2booking if , on particular date, branch and semester
//     const slot1Booking = await Booking.find({
//       date: bookingDate,
//       slot: "1",
//       branch,
//       semester,
//     });

//     const slot2Booking = await Booking.find({
//       date: bookingDate,
//       slot: "2",
//       branch,
//       semester,
//     });

//     if (slot1Booking.length > 0 && slot2Booking.length > 0) {
//       return res
//         .status(400)
//         .json({ error: "Already book for both slots, try for another date" });
//     }

//     // Fetch all rooms
//     const allRooms = await Room.find();

//     const availableRooms = allRooms.map((room) => {
//       const slots = ["1", "2"].map((slot) => {
//         // Find the existing booking for the room, date, and slot
//         const existingBookings = room.booking.filter(
//           (booking) =>
//             new Date(booking.date).toISOString().split("T")[0] ===
//               bookingDate.toISOString().split("T")[0] && booking.slot === slot
//         );

//         // Calculate the total booked seats for the given slot and date
//         const totalBookedSeats = existingBookings.reduce(
//           (acc, booking) => acc + booking.bookedSeats,
//           0
//         );
//         const availableSeats = room.totalSeats - totalBookedSeats;

//         return {
//           slot,
//           availableSeats,
//         };
//       });

//       // Return room details with availability
//       return {
//         id: room.id,
//         room: room.number,
//         totalSeats: room.totalSeats,
//         slots,
//       };
//     });

//     if (slot1Booking.length > 0) {
//       availableRooms.forEach((room) => {
//         room.slots = room.slots.filter((slot) => slot.slot !== "1");
//       });
//     } else if (slot2Booking.length > 0) {
//       availableRooms.forEach((room) => {
//         room.slots = room.slots.filter((slot) => slot.slot !== "2");
//       });
//     }

//     // Responce data
//     res.status(200).json({
//       date: bookingDate.toISOString().split("T")[0],
//       availableRooms,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAvailableRoomsByDate = async (req, res) => {
//   try {
//     const { date, semester, branch } = req.query;

//     // Validate inputs
//     if (!date) {
//       return res.status(400).json({ error: "Date is required" });
//     }
//     if (!semester || !branch) {
//       return res
//         .status(400)
//         .json({ error: "Semester and branch are required" });
//     }

//     // Convert the date string into a proper local date object
//     const [year, month, day] = date.split("-");
//     const bookingDate = new Date(Date.UTC(year, month - 1, day)); // Ensure it's treated as UTC to avoid timezone shift

//     // Fetch all rooms
//     const allRooms = await Room.find();

//     // Calculate available seats per slot
//     const availableRooms = [];

//     allRooms.forEach((room) => {
//       // Prepare an object for slots availability
//       const slots = ["1", "2"].map((slot) => {
//         const existingBooking = room.bookedSeats.find(
//           (booking) =>
//             new Date(booking.date).toISOString().split("T")[0] ===
//               bookingDate.toISOString().split("T")[0] && booking.slot === slot
//         );

//         const isExcluded =
//           existingBooking &&
//           existingBooking.semester === semester &&
//           existingBooking.branch === branch;

//         if (isExcluded) {
//           return null; // Skip if the booking matches the semester and branch
//         }

//         const alreadyBookedSeats = existingBooking ? existingBooking.seats : 0;
//         const availableSeats = room.totalSeats - alreadyBookedSeats;

//         return {
//           slot,
//           availableSeats,
//         };
//       });

//       // Add each slot to the response if it is valid
//       slots
//         .filter((slotInfo) => slotInfo && slotInfo.availableSeats > 0)
//         .forEach((slotInfo) => {
//           availableRooms.push({
//             room: room.number,
//             totalSeats: room.totalSeats,
//             slot: slotInfo.slot,
//             availableSeats: slotInfo.availableSeats,
//           });
//         });
//     });

//     // Respond with the data
//     res.status(200).json({
//       date: bookingDate.toISOString().split("T")[0], // Return date without time info
//       availableRooms,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getAvailableRoomsByDate = async (req, res) => {
  try {
    const { date, branch, semester } = req.body;

    // Validate required inputs
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }
    if (!branch || !semester) {
      return res
        .status(400)
        .json({ error: "Branch and semester are required" });
    }

    // Parse the date
    const [year, month, day] = date.split("-");
    const bookingDate = new Date(Date.UTC(year, month - 1, day)); // Treat as UTC

    // Find bookings for Slot 1 and Slot 2
    const slot1Booking = await Booking.find({
      date: bookingDate,
      slot: "1",
      branch,
      semester,
    });

    const slot2Booking = await Booking.find({
      date: bookingDate,
      slot: "2",
      branch,
      semester,
    });

    if (slot1Booking.length > 0 && slot2Booking.length > 0) {
      return res
        .status(400)
        .json({ error: "Already booked for both slots, try another date" });
    }

    // Fetch all rooms
    const allRooms = await Room.find();

    const availableRooms = allRooms.map((room) => {
      const slots = ["1", "2"].map((slot) => {
        // Filter bookings for this room, date, and slot
        const existingBookings = room.booking.filter(
          (booking) =>
            new Date(booking.date).toISOString().split("T")[0] ===
              bookingDate.toISOString().split("T")[0] && booking.slot === slot
        );

        // Calculate the total booked seats for the slot
        const totalBookedSeats = existingBookings.reduce(
          (acc, booking) => acc + booking.bookedSeats,
          0
        );

        const availableSeats = room.totalSeats - totalBookedSeats;

        return {
          slot,
          availableSeats,
        };
      });

      return {
        id: room._id,
        room: room.number,
        totalSeats: room.totalSeats,
        slots,
      };
    });

    // Filter out slots if already booked in Slot 1 or Slot 2
    if (slot1Booking.length > 0) {
      availableRooms.forEach((room) => {
        room.slots = room.slots.filter((slot) => slot.slot !== "1");
      });
    }

    if (slot2Booking.length > 0) {
      availableRooms.forEach((room) => {
        room.slots = room.slots.filter((slot) => slot.slot !== "2");
      });
    }

    // Response data
    res.status(200).json({
      date: bookingDate.toISOString().split("T")[0],
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

export const bookingByProfessor = async (req, res) => {
  try {
    const { professorId } = req.params;
    const professor = await User.findById(professorId);
    console.log(professor);
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

export const addProfessor = async (req, res) => {
  try {
    const { professorId, bookingId } = req.body;

    const professor = await User.findById(professorId);
    if (!professor) {
      return res.status(400).json({ error: "Professor does not exist" });
    }

    const booking = await Booking.findById(bookingId);
    console.log("booking details", booking);
    if (!booking) {
      return res.status(400).json({ error: "Booking not found" });
    }

    if (booking.professor.length >= 2) {
      return res
        .status(400)
        .json({ error: "Only 2 professors are allowed per booking" });
    }

    const professorBooked = await Booking.findOne({
      "professor.professorId": professor._id,
      date: booking.date,
      slot: booking.slot,
    });
    if (professorBooked) {
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
    const { professorId, bookingId } = req.body;

    const professor = await User.findById(professorId);
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
      for (const roomDetail of booking.rooms) {
        const room = await Room.findById(roomDetail.room);
        if (room) {
          room.booking = room.booking.filter(
            (b) => b.bookingId.toString() !== bookingId
          );
          await room.save();
        }
      }
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
