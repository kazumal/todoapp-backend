import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', comment: 'タスクのタイトル' })
  title: string;

  @Column({ name: 'description', type: 'text', comment: 'タスクの詳細' })
  description?: string;

  @Column({
    name: 'is_completed',
    type: 'boolean',
    comment: '完了状態',
    default: false,
  })
  isCompleted: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    comment: '作成日時',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    comment: '更新日時',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
