import { Column, Entity, ObjectType, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 80 })
  public name: string;

  @OneToOne(
    type => Category,
    {
      cascade: ['insert', 'update'],
    }
  )
  @JoinColumn()
  public parent: Category;
}
