// import { User } from "src/users/entities/user.entitiy";
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {IsNotEmpty, IsString} from 'class-validator'
import { Tweet } from "src/tweet/entities/tweet.entity";

@Entity()
export class Hashtag {
    @PrimaryGeneratedColumn()
    id  : number;

    @Column({
        type:"text",
        unique:true
    })
    hashtag : string;

    @DeleteDateColumn()
    deletedAt : Date;

    @ManyToMany(()=>Tweet, (tweet)=>tweet.hashtags,{onDelete : 'CASCADE'})
    tweet : Tweet[]
}

