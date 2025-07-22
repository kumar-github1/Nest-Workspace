import { Profile } from 'src/profile/entities/profile.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 24,
  })
  username: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;
  @OneToOne(() => Profile, {
    cascade: ['insert'],
    // eager:true
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Tweet, (tweets) => tweets.user)
  tweets: Tweet;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
