import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.userService.getOne(id);
  }

  @Patch(":id")
  updateOne(@Param("id", ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.patchOne(id, updateUserDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.userService.deleteOne(id);
  }
}
