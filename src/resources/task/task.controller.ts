import { Task } from "./task.model";
import { validate as uuidValidate } from "uuid";
import { createTasks } from "./utils";
import { Request, Response, NextFunction } from "express";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { number } = req.query;
    const requiredTasks = Number(number);

    if (isNaN(requiredTasks)) {
      return res.status(422).send();
    }

    const tasksAvailable = await Task.find({}, null, { limit: requiredTasks }).exec();
    const tasksNeeded = requiredTasks - tasksAvailable.length;

    if (tasksNeeded > 0) {
      await createTasks(tasksNeeded);
      const tasks = await Task.find({}, null, { limit: requiredTasks }).exec();
      res.status(200).json({ data: tasks });
    } else {
      res.status(200).json({ data: tasksAvailable });
    }
  } catch (error) {
    next(error);
  }
};

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(422).send();
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { completed: true }, { new: true }).exec();

    if (!updatedTask) {
      return res.status(404).send();
    }

    res.status(201).json({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};
