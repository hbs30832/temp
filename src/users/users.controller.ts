import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    Param,
    Res,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ReadOnlyUserDto } from './dto/users.dto';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ObjectId } from 'mongoose';

@ApiTags('회원')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }


    @Get(':id')
    async findByUserId(@Param('id') id: string) {
        return await this.usersService.findByUserId(id);
    }

    @Post()
    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @ApiResponse({
        status: 200,
        description: '회원가입 성공',
        type: ReadOnlyUserDto,
    })
    @ApiOperation({ summary: '회원가입' })
    async signUp(@Body() body: UserRequestDto) {
        return await this.usersService.signUp(body);
    }

    @ApiOperation({ summary: '로그인' })
    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @Post('login')
    async logIn(
        @Body() data: LoginRequestDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const token = await this.authService.jwtLogin(data);
        if (token) response.cookie('jwt', token, { httpOnly: true });
    }

    @ApiOperation({ summary: '프로필 업로드' })
    @ApiParam({
        name: "images",
        required: true,
        type: "file"
    })
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    async uploadUserImg(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: User,
    ) {
        return await this.usersService.uploadImg(user, file);
    }

    @ApiOperation({ summary: '현재 유저' })
    @ApiResponse({
        status: 401,
        description: 'JWT 토큰 정보 없음',
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentUser(@CurrentUser() user: User) {
        return user.readOnlyData;
    }

    @ApiOperation({ summary: '유저 이름 검색' })
    @ApiResponse({
        status: 200,
        description: '유저 이름 검색 성공',
    })
    @Get('/search')
    async findUsers(@Query('user_name') name: string) {
        return await this.usersService.findByName(name);
    }

    @Get('all')
    @ApiOperation({
        summary: '모든 회원 조회',
    })
    async getAllUser() {
        return this.usersService.getAllUser();
    }

    @Post("logout")
    @ApiOperation({
        summary: "로그아웃"
    })
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie("jwt");
    }
}
