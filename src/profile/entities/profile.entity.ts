import { User } from "src/users/entities/user.entitiy";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "varchar",
        length: 40,
        nullable: true
    })
    firstname: string | null;
    @Column({
        type: "varchar",
        length: 40,
        nullable: true
    })
    lastname: string | null;
    @Column({
        type: "varchar",
        length: 10,
        nullable: true,
    })
    gender: string | null;
    @Column({
        type: "date",
        nullable: true
    })
    dateOfBirth: Date | null;
    @Column({
        type: "text",
        nullable: true
    })
    bio: string;
    @Column({
        type: "text",
        nullable: true
    })
    profileImage: string | null;
    @OneToOne(()=>User,(user)=>user.profile,{onDelete:"CASCADE"
    },)
    user : User;
}
