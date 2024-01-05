import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private repo: ProjectRepository) {}

  create(createProjectDto: CreateProjectDto) {
    // const project = new Project();
    // Object.assign(project, createProjectDto);
    console.log(createProjectDto);
    return this.repo.save({
      ...createProjectDto,
    });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      select: ['id', 'title'],
      where: {
        id,
      },
    });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.repo.update(id, {
      ...updateProjectDto,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
