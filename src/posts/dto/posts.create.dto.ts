import { Prop } from '@nestjs/mongoose';
import { PickType } from '@nestjs/swagger';
import { Post } from '../posts.schema';

export class PostCreateDto extends PickType(Post, [
    'body',
    'tag_list',
] as const) {
    @Prop({
        required: true,
    })
    author_id: string;
}
