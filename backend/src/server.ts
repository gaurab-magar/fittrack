
import express from "express";
import { prisma } from "./lib/prisma.js";
const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3002",
  ];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "FitTrack backend is running",
  });
});
app.post("/api/workouts", async (req, res) => {
  const { name, exerciseType, durationMinutes, date } = req.body;

  const validTypes = [
    "Running",
    "StrengthTraining",
    "Cycling",
    "Walking",
    "Swimming",
    "Other",
  ];

  if (
    typeof name !== "string" ||
    !name.trim() ||
    !validTypes.includes(exerciseType) ||
    !Number.isInteger(durationMinutes) ||
    durationMinutes <= 0 ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      error: "Invalid workout data",
    });
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        name: name.trim(),
        exerciseType,
        durationMinutes,
        date: new Date(`${date}T00:00:00Z`),
      },
    });

    return res.status(201).json(workout);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to save workout",
    });
  }
});
app.get("/api/workouts", async (_req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch workouts" });
  }
});
app.patch("/api/workouts/:id", async (req, res) => {
  const { name, exerciseType, durationMinutes, date } = req.body;

  const validTypes = [
    "Running",
    "StrengthTraining",
    "Cycling",
    "Walking",
    "Swimming",
    "Other",
  ];

  if (
    typeof name !== "string" ||
    !name.trim() ||
    !validTypes.includes(exerciseType) ||
    !Number.isInteger(durationMinutes) ||
    durationMinutes <= 0 ||
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({ error: "Invalid workout data" });
  }

  try {
    const workout = await prisma.workout.update({
      where: { id: req.params.id },
      data: {
        name: name.trim(),
        exerciseType,
        durationMinutes,
        date: new Date(`${date}T00:00:00Z`),
      },
    });

    return res.json(workout);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Workout not found" });
  }
});
app.delete("/api/workouts/:id", async (req, res) => {
  try {
    await prisma.workout.delete({
      where: { id: req.params.id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      error: "Workout not found",
    });
  }
});
app.listen(PORT, () => {
  console.log(`FitTrack API running at http://localhost:${PORT}`);
});
