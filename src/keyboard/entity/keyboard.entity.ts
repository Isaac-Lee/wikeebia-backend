import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('KEYBOARD')
export class Keyboard {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  @OneToMany(() => Keyboard, (keyboard) => keyboard.id)
  id: number;

  @Column({ type: 'varchar', length: '45', name: 'NAME' })
  name: string;

  @Column({ type: 'int', name: 'ANGLE' })
  angle?: number;

  @Column({ type: 'double', name: 'FRONT_HEIGHT' })
  front_height?: number;

  @Column({ type: 'double', name: 'WEIGHT' })
  weight?: number;
}
