import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Voicemails',
  timestamps: true,
})
export class Voicemail extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare from: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare recordingUrl: string;
}
