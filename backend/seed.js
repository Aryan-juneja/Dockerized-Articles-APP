import { mongoClient } from "./libs/db.js";
import dotenv from "dotenv";

dotenv.config();

const courses = [
  {
    title: "DevOps Fundamentals",
    description: "Learn the basics of DevOps engineering and practices",
    instructor: "ChaiCode Team",
    duration: "10 hours",
    topics: ["Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
    price: 499,
    level: "Beginner",
  },
  {
    title: "Full Stack Development",
    description: "Master full stack web development with modern technologies",
    instructor: "ChaiCode Team",
    duration: "20 hours",
    topics: ["React", "Node.js", "MongoDB", "Express", "Redis"],
    price: 799,
    level: "Intermediate",
  },
  {
    title: "System Design",
    description: "Learn to design scalable distributed systems",
    instructor: "ChaiCode Team",
    duration: "15 hours",
    topics: [
      "Architecture Patterns",
      "Scalability",
      "Load Balancing",
      "Caching",
    ],
    price: 999,
    level: "Advanced",
  },
];

async function seedDatabase() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db("chaicode");

    await db.collection("courses").deleteMany({});

    const result = await db.collection("courses").insertMany(courses);
    console.log(`Successfully seeded ${result.insertedCount} courses`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoClient.close();
    process.exit(0);
  }
}

seedDatabase();
