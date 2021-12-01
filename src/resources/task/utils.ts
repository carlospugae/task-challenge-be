import { Task } from "./task.model";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const createTasks = async (tasksNeeded: number): Promise<void> => {
  const { data } = await axios.get(`https://lorem-faker.vercel.app/api?quantity=${tasksNeeded}`);
  const newTasks = data.map((task) => ({
    _id: uuidv4(),
    title: task,
  }));
  await Task.create(newTasks);
};
