import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/shared/services/db.service";
import { CustomException } from "src/shared/exception/custom.exception";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany();
    return { message: "All users information", data: users };
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new CustomException("User does not exists", 404);

    return { message: "User retreived successfully", data: user };
  }

  async register(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const checkEmail = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (checkEmail) throw new CustomException("User already exists", 409);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: { id: true },
    });

    return { message: "User registered success" };
  }

  async patchOne(id: string, updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;
    const checkEmail = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!checkEmail) throw new CustomException("User does not exists", 404);

    const res = await this.prisma.user.update({ where: { id }, data: { name }, select: { name: true } });

    return { message: `name updated successfully to ${res.name}` };
  }

  async deleteOne(id: string) {
    const exists = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new CustomException("User does not exists", 404);

    await this.prisma.user.delete({ where: { id } });
    return { message: "User deleted success" };
  }
}
