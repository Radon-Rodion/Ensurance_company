import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Selected {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  proposalId: number;

  @Column()
  addingTime: Date;
}
export default Selected;
