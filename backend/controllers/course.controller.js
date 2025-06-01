import { mongoClient, redisClient } from "../libs/db.js";

export const getCourses = async (_req, res) => {
  const cacheKey = "api:courses";
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return res.status(200).json({
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  const db = mongoClient.db("chaicode");
  const collection = db.collection("courses");
  const courses = await collection.find().toArray();

  await redisClient.set(cacheKey, JSON.stringify(courses), { EX: 60 });

  return res.status(200).json({
    source: "db",
    data: courses,
  });
};
