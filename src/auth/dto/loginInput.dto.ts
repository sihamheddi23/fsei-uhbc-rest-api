import { IsNotEmpty } from "class-validator";


export class LoginInputDto {

    @IsNotEmpty()
    usernameOrEmail: string;

    @IsNotEmpty()
    password: string;

}
