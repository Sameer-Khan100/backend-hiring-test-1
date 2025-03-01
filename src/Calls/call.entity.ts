import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Calls',
  timestamps: true,
})
export class Call extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number; // ✅ Use "declare" to avoid shadowing

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare from: string; // ✅ Use "declare"

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare to: string; // ✅ Use "declare"

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string; // ✅ Use "declare"

}
