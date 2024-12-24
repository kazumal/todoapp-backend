import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'username',
    unique: true,
    type: 'varchar',
    comment: 'ユーザー名',
  })
  username: string;

  @Column({ name: 'password', type: 'varchar', comment: 'パスワード' })
  password: string;

  @Column({ name: 'email', type: 'varchar', comment: 'メールアドレス' })
  email: string;
}
