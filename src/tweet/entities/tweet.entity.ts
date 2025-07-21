import { Hashtag } from "src/hashtag/entities/hashtag.entity";
import { User } from "src/users/entities/user.entitiy";
import { text } from "stream/consumers";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tweet {
    @PrimaryGeneratedColumn()
    id:number;


    @Column({
        type:"text"
    })
    text : string;


    @Column({
        type:"text",
        nullable:true
    })
    image? : string; 


    @CreateDateColumn({
        type:"timestamp"
    })
    createdAt : Date;

    
    @UpdateDateColumn()
    updatedAt : Date;

    @ManyToOne(()=>User , (user)=>user.tweets)
    user : User;

    @ManyToMany(()=>Hashtag)
    @JoinTable()
    hashtags : Hashtag[] 
}
