import { IsAlphanumeric, IsEmail, IsEnum, IsNotEmpty} from "class-validator";
import { Role } from "src/utils/types";

export class CreateUserDto {
    
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
