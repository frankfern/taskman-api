import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  slug!: string;

  @Column({ type: 'varchar', length: 155 })
  title!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @Column({ type: 'simple-array' })
  tags?: string[];

  @Column({ type: 'boolean', default: false })
  completed!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
