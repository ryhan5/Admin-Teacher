const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/teachers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Teacher schema and model
const teacherSchema = new mongoose.Schema({
  name: String,
  joiningDate: String,
  password: String,
  birthDate: String,
  streams: [String],
  subjects: [String],
  registerNumber: String,
  // mcaTeacher: [Boolean, false]
  "mcaTeacher": {type: String, default: false}
});

const Teacher = mongoose.model("Teacher", teacherSchema);

// Helper function to generate register number
const generateRegisterNumber = async (joiningYear, streamCode) => {
  const count = (await Teacher.countDocuments({})) + 1;
  const countStr = count.toString().padStart(4, "0");
  return `${joiningYear}${streamCode}${countStr}`;
};

// Endpoint to register a teacher
app.post("/api/register-teacher", async (req, res) => {
  const { name, joiningDate, password, birthDate, streams, subjects } =
    req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assuming the first selected stream is used for register number generation
    const joiningYear = joiningDate.slice(0, 4);
    const stream = streams[0];
    const streamCodes = {
      BTech: "42",
      MCA: "74",
      MBA: "46",
      BArch: "58",
      BA: "06",
      MTech: "22",
    };
    const streamCode = streamCodes[stream] || "00";
    const registerNumber = await generateRegisterNumber(
      joiningYear,
      streamCode
    );

    const newTeacher = new Teacher({
      name,
      joiningDate,
      password: hashedPassword, // Store the hashed password
      birthDate,
      streams,
      subjects,
      registerNumber,
    });

    await newTeacher.save();
    res
      .status(201)
      .json({ message: "Teacher registered successfully", registerNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering teacher" });
  }
});

// Endpoint to sign in a teacher
app.post('/api/signin-teacher', async (req, res) => {
  const { registerNumber, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ registerNumber });
    if (!teacher) {
      return res.status(400).json({ success: false, message: 'Invalid registration number or password.' });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid registration number or password.' });
    }

    res.status(200).json({ success: true, message: 'Sign-in successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// Endpoint to fetch teacher data by registration number
app.get("/api/teacher/:registerNumber", async (req, res) => {
  const { registerNumber } = req.params;

  try {
    const teacher = await Teacher.findOne({ registerNumber });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching teacher data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
