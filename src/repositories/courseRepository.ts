import {EntityRepository, Like, Repository} from "typeorm";
import {Course} from "../models/Course";

@EntityRepository(Course)
export default class CourseRepository extends Repository<Course>{

  public async findByName(param: string): Promise<Course[]> {
    return this.find({
      name: Like(`%${ param }%`)
    });
  }
}
