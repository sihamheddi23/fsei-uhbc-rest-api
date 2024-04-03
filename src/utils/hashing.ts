import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    return hashPassword
}

export const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword)
}